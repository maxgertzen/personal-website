import React from 'react';
import Section from '../common/Section';
import Emphasis from '@/components/ui/Emphasis';

const About: React.FC = () => {
  return (
    <Section
      id='about'
      className='m-auto text-center max-w-[80%] sm:max-w-prose'>
      <div className='mt-section-gap' />
      <div className='glass'>
        <div className='glass__effect' />
        <div className='glass__tint' />
        <div className='glass__shine' />
        <div className='glass__content'>
          <h2>About</h2>
          <div className='mt-section-gap' />
          <p className='leading-8 sm:text-2xl sm:leading-10 sm:font-extralight'>
            Hi, I’m Max. I build things: software mostly, but also{' '}
            <Emphasis variant='underline'>music and sculpture</Emphasis>. My day
            work is engineering. I design the foundations teams build on, and
            lately I’ve been <Emphasis variant='highlight'>deep in AI</Emphasis>,
            making apps with LLMs, vision, and agents that actually do something
            useful. I work in React, TypeScript, and Node, run{' '}
            <Emphasis variant='underline'>my own</Emphasis> contracting company
            (Greatwhale Solutions), and move easily between codebases, clients,
            and countries. I’m curious, trilingual (English, Russian, Hebrew),
            and I care as much about{' '}
            <Emphasis variant='highlight'>how a thing feels to use</Emphasis> as
            whether it runs. If you’re making something ambitious, I’d love to
            hear about it.
          </p>
        </div>
      </div>
      <div className='mt-section-gap-lg' />
      <svg className='glass__svg' aria-hidden='true'>
        <filter id='glass-distortion'>
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.008 0.012'
            numOctaves={2}
            seed={92}
            result='noise'
          />
          <feGaussianBlur in='noise' stdDeviation={2} result='blurred' />
          <feDisplacementMap
            in='SourceGraphic'
            in2='blurred'
            scale={55}
            xChannelSelector='R'
            yChannelSelector='G'
          />
        </filter>
      </svg>
    </Section>
  );
};

export default About;
