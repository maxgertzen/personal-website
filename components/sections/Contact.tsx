'use client';

import React from 'react';
import Section from '../common/Section';
import ContactForm from '../forms/ContactForm';
import { Spacer } from '@nextui-org/react';

const Contact: React.FC = () => {
  return (
    <Section id='contact' className='w-[80%] m-auto'>
      <h2>Contact</h2>
      <Spacer y={4} />
      <ContactForm />
      <Spacer y={8} />
    </Section>
  );
};

export default Contact;
