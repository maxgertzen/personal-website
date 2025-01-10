export type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  isAgreeingToTerms: boolean;
};

export type FormSubmission = FormValues & {
  recaptchaToken: string;
};
