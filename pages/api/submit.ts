interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  isAgreeingToTerms: boolean;
}

const handleSubmit = async (formValues: FormValues) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export default handleSubmit;
