import { FormSubmission } from '@/types';

const handleSubmit = async (formValues: FormSubmission) => {
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
