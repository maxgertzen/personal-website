const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const target = event.target as typeof event.target & {
    name: { value: string };
    phone: { value: string };
    email: { value: string };
    message: { value: string };
    checkbox: { checked: boolean };
  };

  const formData = {
    name: target.name.value,
    phone: target.phone.value,
    email: target.email.value,
    message: target.message.value,
    isSubscribed: target.checkbox.checked,
  };

  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  console.log(data);
};

export default handleSubmit;
