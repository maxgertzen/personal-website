'use client';

import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Input, Textarea, Button, Checkbox, Link } from '@nextui-org/react';
import submitFormValues from '@/utils/submitForm';
import Script from 'next/script';
import { FormValues } from '@/types';

const ContactForm: React.FC = () => {
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState<'success' | 'error'>(
    'success'
  );
  const {
    control,
    handleSubmit,
    formState: { errors, ...formState },
    reset,
  } = useForm<FormValues>({
    mode: 'all',
    delayError: 1000,
    resetOptions: {
      keepDefaultValues: false,
    },
  });

  const closeAlert = () => {
    setShowAlert(false);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';

    grecaptcha.ready(async () => {
      try {
        const token = await grecaptcha.execute(siteKey, { action: 'submit' });
        const formData = { ...data, recaptchaToken: token };
        await submitFormValues(formData);
        setShowAlert(true);
        setAlertType('success');
        reset(
          {
            email: '',
            isAgreeingToTerms: false,
            message: '',
            name: '',
            phoneNumber: '',
          },
          {
            keepIsSubmitted: false,
            keepDirtyValues: false,
            keepTouched: false,
          }
        );
      } catch (error) {
        console.error('Error:', error);
        setShowAlert(true);
        setAlertType('error');
      } finally {
        reset({});
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    });
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />
      <form
        className="flex flex-col gap-8 border border-gray-800/20 rounded-2xl shadow-lg p-8 relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        {showAlert &&
          (alertType === 'error' ? (
            <div
              className="bg-red-100 border-l-4 border-red-500 rounded-2xl text-red-700 p-4 animate__animated animate__fadeInUp absolute top-0 left-0 right-0 z-40"
              role="alert"
              onClick={closeAlert}
            >
              <p className="font-bold">An error occurred!</p>
              <p>
                Please try again later, or contact directly at{' '}
                <Link href="mailto:maxgertzen@gmail.com">
                  maxgertzen@gmail.com
                </Link>
              </p>
            </div>
          ) : (
            <div
              className="bg-green-100 border-l-4 border-green-500 rounded-2xl text-green-700 p-4 animate__animated animate__fadeInUp absolute top-0 left-0 right-0 z-40"
              role="alert"
              onClick={closeAlert}
            >
              <p className="font-bold">Thank you for your message!</p>
              <p>We will get back to you as soon as possible.</p>
            </div>
          ))}
        <Controller
          name="name"
          control={control}
          rules={{ pattern: /^[a-zA-Z\s]*$/, maxLength: 50 }}
          render={({ field }) => (
            <Input
              {...field}
              id={field.name}
              label="Name"
              variant="bordered"
              isInvalid={!!errors?.name}
              errorMessage={
                errors?.name?.type === 'pattern' &&
                'Please use only letters and spaces'
              }
              maxLength={50}
              autoComplete="name"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
          }}
          render={({ field }) => (
            <Input
              {...field}
              id={field.name}
              type="email"
              label="Email"
              variant="bordered"
              isInvalid={!!errors.email}
              errorMessage={
                errors.email?.type === 'required'
                  ? 'Email is required'
                  : errors.email?.type === 'pattern'
                  ? 'Please enter a valid email'
                  : ''
              }
              isRequired
              autoComplete="email"
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          rules={{ pattern: /^\+?[0-9]*$/, maxLength: 15 }}
          render={({ field: { onChange, ...field } }) => (
            <Input
              {...field}
              id={field.name}
              type="tel"
              label="Phone Number"
              variant="bordered"
              isInvalid={!!errors?.phoneNumber}
              errorMessage={
                errors?.phoneNumber?.type === 'pattern'
                  ? 'Invalid phone number'
                  : errors?.phoneNumber?.type === 'maxLength'
                  ? 'Phone number too long'
                  : ''
              }
              maxLength={15}
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^\+?[0-9]*$/;
                if (regex.test(value) || value === '') {
                  onChange(e);
                }
              }}
              autoComplete="tel"
            />
          )}
        />
        <Controller
          name="message"
          control={control}
          rules={{ required: true, maxLength: 250 }}
          render={({ field: { onChange, ...field } }) => (
            <Textarea
              {...field}
              id={field.name}
              label="Message"
              onValueChange={onChange}
              variant="bordered"
              isInvalid={!!errors?.message}
              errorMessage={
                errors?.message?.type === 'required'
                  ? 'Message is required'
                  : errors?.message?.type === 'maxLength' &&
                    "The message shouldn't exceed 250 characters"
              }
              maxLength={250}
              isRequired
            />
          )}
        />
        <Controller
          name="isAgreeingToTerms"
          control={control}
          rules={{ required: true, value: true }}
          render={({ field: { onChange, value, ...field } }) => (
            <Checkbox
              {...field}
              id={field.name}
              onValueChange={onChange}
              isSelected={value}
              isInvalid={!!errors?.isAgreeingToTerms}
              isRequired
            >
              <p className="text-sm">
                I agree to receive communication by email or phone
              </p>
            </Checkbox>
          )}
        />
        <Button
          id="contact-form-submit-button"
          color="default"
          type="submit"
          disabled={Object.keys(errors).length > 0}
          isLoading={formState.isLoading || formState.isSubmitting}
          className="bg-black text-white hover:bg-white hover:text-black hover:border-black hover:border-2 hover:shadow-lg disabled:bg-gray-300 disabled:text-black disabled:border-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
          fullWidth
        >
          SUBMIT
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
