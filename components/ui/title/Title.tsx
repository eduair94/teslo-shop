import { titleFont } from '@/config/fonts';
import { FC, ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string | ReactNode;
  className?: string;
}

export const Title: FC<Props> = ({ title, subtitle, className }) => {
  return (
    <div className={`mt-3 ${className} mx-3 mx-md-0`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold my-7`}
      >
        {title}
      </h1>
      {subtitle && <h3 className="text-xl mb-5">{subtitle}</h3>}
    </div>
  );
};
