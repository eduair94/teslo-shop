import { titleFont } from '@/config/fonts';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface Params {
  text?: string;
  status?: string;
  returnToLink?: string;
  returnToName?: string;
}

export const PageNotFound: FC<Params> = ({
  text = 'Whoops! Page not working',
  status = '404',
  returnToLink = '/',
  returnToName = 'Home',
}) => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>
          {status}
        </h2>
        <p className="font-semibold text-xl">{text}</p>
        <p className="font-light">
          <span>You can return to </span>
          <Link
            href={returnToLink}
            className="font-normal hover:underline transition-all"
          >
            {returnToName}
          </Link>
        </p>
      </div>
      <div className="px-5 mx-5">
        <Image
          alt="Star Man"
          src="/imgs/starman_750x750.png"
          className="p-5 sm:p-0"
          width={550}
          height={550}
        />
      </div>
    </div>
  );
};
