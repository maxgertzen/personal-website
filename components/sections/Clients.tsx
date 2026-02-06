'use client';

import React from 'react';
import Section from '../common/Section';
import ClientItem from '../common/ClientItem';
import { clients } from '@/constants/clients';

const Clients: React.FC = () => {
  return (
    <Section id="clients" className="text-center px-16">
      <h2>Clients</h2>
      <div className="mt-section-gap flex flex-wrap justify-center gap-12 sm:gap-16">
        {clients.map((client) => (
          <ClientItem
            key={client.title}
            Icon={client.Icon}
            title={client.title}
            href={client.href}
          />
        ))}
      </div>
      <div className="mt-section-gap-lg" />
    </Section>
  );
};

export default Clients;
