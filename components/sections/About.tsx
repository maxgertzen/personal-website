import React from 'react';
import Section from '../common/Section';

const About: React.FC = () => {
  return (
    <Section
      id='about'
      className='m-auto text-center max-w-[80%] sm:max-w-prose'>
      <div className='mt-section-gap' />
      <h2>About</h2>
      <div className='mt-section-gap' />
      <p className='leading-8 sm:text-2xl sm:leading-10 sm:font-extralight'>
        Hi, I&apos;m Max. I build things - software mostly, but also music,
        sculpture, and the occasional performance that probably shouldn&apos;t
        exist. My day work is engineering: I design the foundations teams build
        on, and lately I&apos;ve been deep in AI, making apps with LLMs, vision,
        and agents that actually do something useful. I work in React,
        TypeScript, and Node, run my own contracting company (Greatwhale), and
        move between codebases, clients, and countries without needing anyone to
        hand me a map. I&apos;m curious by default, trilingual by a good accident
        of life (English, Russian, and Hebrew), and I care as much about how a
        thing feels to use as whether it runs. If you&apos;re making something
        ambitious, I&apos;d love to hear about it.
      </p>
      <div className='mt-section-gap-lg' />
    </Section>
  );
};

export default About;
