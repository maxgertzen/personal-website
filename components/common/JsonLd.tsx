export default function JsonLd() {
  const person = {
    '@type': 'Person',
    name: 'Max Gertzen',
    jobTitle: 'Full-Stack Developer',
    url: 'https://maxgertzen.com',
    sameAs: [
      'https://github.com/maxgertzen',
      'https://www.linkedin.com/in/maxgertzen/',
      'https://www.instagram.com/maxgertzen/',
      'https://soundcloud.com/maxgertzen',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'JavaScript',
      'TypeScript',
      'Node.js',
      'C#',
      '.NET',
      'PHP',
      'MongoDB',
      'Angular',
      'NX Monorepo',
      'Docker',
      'WordPress',
      'Shopify',
      'Wix',
    ],
    worksFor: [
      {
        '@type': 'Organization',
        name: 'ChargeAfter',
        description: 'Consumer financing platform',
      },
      {
        '@type': 'Organization',
        name: 'Greatwhale Solutions Ltd',
        url: 'https://greatwhale.co',
      },
    ],
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: 'Full Stack Developer',
        description:
          'Front-end and back-end development for lender integrations in a consumer financing platform. Led Angular to React migration, introduced NX monorepo and module federation.',
        occupationLocation: { '@type': 'Country', name: 'Thailand' },
        skills:
          'React, NX, Storybook, Material UI, .NET, C#, MongoDB, Azure, GCP, Docker',
      },
      {
        '@type': 'Occupation',
        name: 'Web Developer & Consultant',
        description:
          'Freelance developer delivering tailored web solutions across WordPress, Shopify, and Wix platforms including e-commerce stores and SEO optimisation.',
        skills:
          'PHP, Liquid, JavaScript, WordPress, Shopify, Wix, React, Cloudflare',
      },
      {
        '@type': 'Occupation',
        name: 'Integration Project Manager',
        description:
          'Led implementation of an inventory management system for Israel\'s largest furniture company, translating manual workflows into automated programs.',
        skills: 'Project Management, Automation, Stakeholder Management',
      },
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Reichman University - WeCode Program',
        description: 'Full Stack Bootcamp',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Elevation Bootcamp',
        description: 'Full Stack Bootcamp',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Thelma Yellin School of Arts',
        description: 'Jazz Department',
      },
    ],
    knowsLanguage: ['English', 'Russian', 'Hebrew'],
  };

  const organization = {
    '@type': 'Organization',
    name: 'Greatwhale Solutions Ltd',
    url: 'https://greatwhale.co',
    founder: {
      '@type': 'Person',
      name: 'Max Gertzen',
      url: 'https://maxgertzen.com',
    },
  };

  const website = {
    '@type': 'WebSite',
    name: 'Max Gertzen',
    url: 'https://maxgertzen.com',
    description:
      'Max Gertzen — Full-Stack Developer specializing in React, Next.js, Node.js and .NET. Bridging the gap between ideas and digital reality.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [person, organization, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
