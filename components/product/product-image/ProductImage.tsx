import Image from 'next/image';
import React, { FC } from 'react';
interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  width: number;
  height: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
  blob?: boolean;
}

export const ProductImage: FC<Props> = ({
  src,
  alt,
  className,
  width,
  height,
  onMouseEnter,
  onMouseLeave,
  style,
  blob = false,
}) => {
  const localSrc = src
    ? src.startsWith('http') || blob
      ? src
      : `/products/${src}`
    : '/imgs/placeholder.png';

  return (
    <Image
      className={className}
      width={width}
      height={height}
      alt={alt}
      src={localSrc}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    />
  );
};
