import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type MediaImageFit = 'cover' | 'contain';

interface MediaImageProps {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  fit?: MediaImageFit;
  priority?: boolean;
  sizes?: string;
  fallbackLabel?: string;
  children?: ReactNode;
}

export function MediaImage({
  src,
  alt,
  className,
  imageClassName,
  fit = 'cover',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  fallbackLabel,
  children,
}: MediaImageProps) {
  return (
    <div className={cn('relative overflow-hidden bg-gray-100 dark:bg-gray-800', className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized
          className={cn(fit === 'contain' ? 'object-contain' : 'object-cover', imageClassName)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center opacity-20">
          <span className="text-6xl font-mono">{fallbackLabel || alt.charAt(0) || '?'}</span>
        </div>
      )}
      {children}
    </div>
  );
}
