import React from "react";

interface SectionProps {
  id: string;
  fullHeight?: boolean;
  className?: string;
}

const Section: React.FC<React.PropsWithChildren<SectionProps>> = ({
  id,
  className,
  fullHeight = false,
  children,
}) => {
  return (
    <section
      id={id}
      style={{ minHeight: fullHeight ? "100vh" : "auto" }}
      className={`flex flex-col gap-2 items-center ${className} scroll-mt-20`}
    >
      {children}
    </section>
  );
};

export default Section;
