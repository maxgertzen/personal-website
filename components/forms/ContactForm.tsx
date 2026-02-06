'use client';

import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextInput, TextArea, FormButton, FormCheckbox, Alert } from '@/components/ui';
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
    formState: { errors, isValid, isLoading, isSubmitting },
    reset,
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
      isAgreeingToTerms: false,
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
        className="flex flex-col gap-8 border border-gray-800/20 dark:border-white/20 rounded-2xl shadow-lg p-8 relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        {showAlert && (
          alertType === 'error' ? (
            <Alert variant="error" title="An error occurred!" onClose={closeAlert}>
              <p>
                Please try again later, or contact directly at{' '}
                <a href="mailto:maxgertzen@gmail.com">maxgertzen@gmail.com</a>
              </p>
            </Alert>
          ) : (
            <Alert variant="success" title="Thank you for your message!" onClose={closeAlert}>
              <p>We will get back to you as soon as possible.</p>
            </Alert>
          )
        )}
        <Controller
          name="name"
          control={control}
          rules={{ pattern: /^[a-zA-Z\s]*$/, maxLength: 50 }}
          render={({ field }) => (
            <TextInput
              {...field}
              id={field.name}
              label="Name"
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
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              id={field.name}
              type="email"
              label="Email"
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
          rules={{ pattern: /^\+?[0-9]*$/, minLength: 7, maxLength: 15 }}
          render={({ field: { onChange, ...field } }) => (
            <TextInput
              {...field}
              id={field.name}
              type="tel"
              label="Phone Number"
              isInvalid={!!errors?.phoneNumber}
              errorMessage={
                errors?.phoneNumber?.type === 'pattern'
                  ? 'Invalid phone number'
                  : errors?.phoneNumber?.type === 'minLength'
                  ? 'Phone number too short'
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
            <TextArea
              {...field}
              id={field.name}
              label="Message"
              onChange={onChange}
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
            <FormCheckbox
              {...field}
              id={field.name}
              onChange={onChange}
              isSelected={value}
              isInvalid={!!errors?.isAgreeingToTerms}
              isRequired
            >
              <p className="text-sm">
                I agree to receive communication by email or phone
              </p>
            </FormCheckbox>
          )}
        />
        <FormButton
          id="contact-form-submit-button"
          type="submit"
          isDisabled={!isValid}
          isLoading={isLoading || isSubmitting}
          className="bg-black text-white hover:bg-white hover:text-black hover:border-black hover:border-2 hover:shadow-lg disabled:bg-gray-300 disabled:text-black disabled:border-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
          fullWidth
        >
          SUBMIT
        </FormButton>
      </form>
    </>
  );
};

export default ContactForm;
