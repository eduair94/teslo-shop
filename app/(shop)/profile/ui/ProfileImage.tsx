'use client';
import { updateUserImage } from '@/actions';
import { Spinner } from '@/components';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FC, useCallback, useEffect, useState } from 'react';
import { IoReload } from 'react-icons/io5';

interface Props {
  width: number;
  height: number;
  image: string;
  className?: string;
}

export const ProfileImage: FC<Props> = ({
  width,
  height,
  image,
  className = '',
}) => {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);

  const reloadImage = useCallback(
    (firstLoad = false) => {
      if (!session) return;
      if (!firstLoad) setLoading(true);
      updateUserImage(session.user.id).then(async (res) => {
        if (res.image) {
          const updated = await update({ image: res.image });
          console.log('updated', updated);
          if (!firstLoad) setLoading(false);
        }
      });
    },
    [session, update],
  );

  useEffect(() => {
    if (session?.user.image) return;
    reloadImage(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.id]);

  return (
    <div className="relative h-full">
      <Image
        className={clsx(className, {
          'filter blur-sm fade-in': loading,
        })}
        src={session?.user.image || image || '/imgs/default-avatar.jpg'}
        alt="Profile image"
        width={width}
        height={height}
      />
      {loading && (
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center z-2">
          <Spinner size="40px" />
        </div>
      )}
      <button
        onClick={() => reloadImage()}
        className="btn-primary absolute bottom-0 right-0"
      >
        <IoReload size={30} />
      </button>
    </div>
  );
};
