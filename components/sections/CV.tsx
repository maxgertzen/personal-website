'use client';

import React from 'react';
import Section from '../common/Section';
import { CV_PATH } from '@/constants/documents';
import OpenIcon from '@/public/assets/cv/open-file.svg';
import DownloadIcon from '@/public/assets/cv/download-file.svg';
import PdfIcon from '@/public/assets/cv/pdf-icon.svg';

const CV: React.FC = () => {
  return (
    <Section id='cv' className='w-[80%] m-auto'>
      <h2>CV</h2>
      <div className='mt-4'>
        <div className='flex gap-4 items-stretch'>
          <PdfIcon className='w-24 h-24' />
          <div className='flex flex-col gap-4 justify-evenly'>
            <a
              href={CV_PATH}
              download='Max_Gertzen_CV.pdf'
              className='flex items-center gap-2 h-6'
              aria-label='Download CV as PDF'
            >
              <DownloadIcon className='w-6 h-6' />
              <span className='mt-2 link-animate'>Download</span>
            </a>
            <a
              href={CV_PATH}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 h-6'
              aria-label='Open CV in new tab'
            >
              <OpenIcon className='w-6 h-6' />
              <span className='mt-2 link-animate'>Open</span>
            </a>
          </div>
        </div>
      </div>
      <div className='mt-section-gap-lg' />
    </Section>
  );
};

export default CV;
