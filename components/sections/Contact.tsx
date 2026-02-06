'use client';

import React from 'react';
import Section from '../common/Section';
import ContactForm from '../forms/ContactForm';

const Contact: React.FC = () => {
  return (
    <Section id='contact' className='w-[80%] m-auto'>
      <h2>Contact</h2>
      <div className='mt-4' />
      <ContactForm />
      <div className='mt-section-gap' />
    </Section>
  );
};

export default Contact;
