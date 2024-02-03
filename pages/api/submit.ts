interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  isAgreeingToTerms: boolean;
}

const handleSubmit = async (formValues: FormValues) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formValues),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  console.log(data);
};

export default handleSubmit;
