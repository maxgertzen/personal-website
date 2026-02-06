'use client';

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
        I&apos;m Max, a Full-Stack Developer bridging the gap between ideas and
        digital reality. My journey in tech is driven by curiosity, a passion
        for problem solving and commitment to excellence. My experience spans
        various aspects of web development and with a background in music
        including production and performance; I thrive on producing intuitive,
        impactful and creative experiences that have the user at their heart. My
        approach is based on collaboration, transparency and clear
        communication. I speak three languages fluently English, Russian and
        Hebrew. Let's connect and transform your vision into a vibrant web
        presence.
      </p>
      <div className='mt-section-gap-lg' />
    </Section>
  );
};

export default About;
