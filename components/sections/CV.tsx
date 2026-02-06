'use client';

import React from "react";
import Section from "../common/Section";
import { CV_PATH } from "@/constants/documents";
import OpenIcon from "@/public/assets/cv/open-file.svg";
import DownloadIcon from "@/public/assets/cv/download-file.svg";
import PdfIcon from "@/public/assets/cv/pdf-icon.svg";
import { Spacer } from "@nextui-org/react";
import Image from "next/image";

const CV: React.FC = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = CV_PATH;
    link.download = "Max_Gertzen_CV.pdf";
    link.click();
  };

  const handleOpen = () => {
    window.open(CV_PATH, "_blank");
  };

  return (
    <Section id="cv" className="w-[80%] m-auto">
      <h2>CV</h2>
      <Spacer y={4} />
      <div className="flex gap-4 items-stretch">
        <PdfIcon className="w-24 h-24" />
        <div className="flex flex-col gap-4 justify-evenly">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 h-6"
          >
            <DownloadIcon className="w-6 h-6" />
            <span className="mt-2 link-animate">Download</span>
          </button>
          <button onClick={handleOpen} className="flex items-center gap-2 h-6">
            <OpenIcon className="w-6 h-6" />
            <span className="mt-2 link-animate">Open</span>
          </button>
        </div>
      </div>
      <Spacer y={16} />
    </Section>
  );
};

export default CV;
