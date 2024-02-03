import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Input, Textarea, Button, Checkbox } from '@nextui-org/react';

interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  isAgreeingToTerms: boolean;
}
const ContactForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, ...formState },
  } = useForm<FormValues>({
    mode: 'all',
    delayError: 1000,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form
      className='flex flex-col gap-8 border border-gray-800/20 rounded-2xl shadow-lg p-8'
      onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='name'
        control={control}
        rules={{ pattern: /^[a-zA-Z\s]*$/, maxLength: 50 }}
        render={({ field }) => (
          <Input
            {...field}
            label='Name'
            variant='bordered'
            isInvalid={!!errors?.name}
            errorMessage={
              errors?.name?.type === 'pattern' &&
              'Please use only letters and spaces'
            }
            maxLength={50}
          />
        )}
      />
      <Controller
        name='email'
        control={control}
        rules={{
          required: true,
          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
        }}
        render={({ field }) => (
          <Input
            {...field}
            type='email'
            label='Email'
            variant='bordered'
            isInvalid={!!errors.email}
            errorMessage={
              errors.email?.type === 'required'
                ? 'Email is required'
                : errors.email?.type === 'pattern' &&
                  'Please enter a valid email'
            }
            isRequired
          />
        )}
      />
      <Controller
        name='phoneNumber'
        control={control}
        rules={{ pattern: /^[0-9]*$/, maxLength: 15 }}
        render={({ field: { onChange, ...field } }) => (
          <Input
            {...field}
            type='tel'
            label='Phone Number'
            variant='bordered'
            isInvalid={!!errors?.phoneNumber}
            errorMessage={
              errors?.phoneNumber?.type === 'pattern' && 'Invalid phone number'
            }
            maxLength={15}
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^[0-9]*$/;
              if (regex.test(value) || value === '') {
                onChange(e);
              }
            }}
          />
        )}
      />
      <Controller
        name='message'
        control={control}
        rules={{ required: true, maxLength: 250 }}
        render={({ field: { onChange, ...field } }) => (
          <Textarea
            {...field}
            label='Message'
            onValueChange={onChange}
            variant='bordered'
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
        name='isAgreeingToTerms'
        control={control}
        rules={{ required: true, value: true }}
        render={({ field: { onChange, value, ...field } }) => (
          <Checkbox
            {...field}
            onValueChange={onChange}
            isSelected={value}
            isInvalid={!!errors?.isAgreeingToTerms}
            isRequired>
            <p className='text-sm'>
              I agree to receive communication by email or phone
            </p>
          </Checkbox>
        )}
      />

      <Button
        color='default'
        type='submit'
        disabled={Object.keys(errors).length > 0}
        isLoading={formState.isLoading || formState.isSubmitting}
        className='bg-black text-white hover:bg-white hover:text-black hover:border-black hover:border-2 hover:shadow-lg disabled:bg-gray-300 disabled:text-black disabled:border-gray-300 disabled:shadow-none disabled:cursor-not-allowed'
        fullWidth>
        SUBMIT
      </Button>
    </form>
  );
};

export default ContactForm;
