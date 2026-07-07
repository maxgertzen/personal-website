export default function JsonLd() {
  const person = {
    '@type': 'Person',
    name: 'Max Gertzen',
    jobTitle: 'Senior Full-Stack Engineer',
    url: 'https://maxgertzen.com',
    sameAs: [
      'https://github.com/maxgertzen',
      'https://www.linkedin.com/in/maxgertzen/',
      'https://www.instagram.com/maxgertzen/',
      'https://soundcloud.com/maxgertzen',
    ],
    knowsAbout: [
      'AI Integration',
      'LLM Integration',
      'OpenAI API',
      'Anthropic API',
      'AI Agents',
      'Prompt Engineering',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'C#',
      '.NET',
      'MongoDB',
      'NX Monorepo',
      'Module Federation',
      'Cloudflare Workers',
      'Docker',
    ],
    worksFor: [
      {
        '@type': 'Organization',
        name: 'ChargeAfter',
        description: 'Multi-lender embedded/POS consumer financing platform',
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
        name: 'Senior Full-Stack Engineer',
        description:
          'Front-end and back-end development for lender integrations on a multi-lender embedded/POS consumer financing platform. Played a key engineering role in an Angular to React migration; set up the NX monorepo and module-federation micro-frontend architecture now used across 30+ lender integrations. Builds LLM and agent systems on the OpenAI and Anthropic APIs.',
        occupationLocation: { '@type': 'Country', name: 'Thailand' },
        skills:
          'React, NX, Module Federation, TypeScript, OpenAI API, Anthropic API, LLM Integration, .NET, C#, MongoDB, Azure, GCP, Docker',
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
          'Led a warehouse/inventory management system rollout for a leading commercial-furniture supplier (hospitality, office, and institutional sectors), translating manual workflows into automated programs.',
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
      'Max Gertzen - senior full-stack engineer building AI-integrated products: LLM apps, agent systems, and edge infrastructure in TypeScript, Node, and .NET.',
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
