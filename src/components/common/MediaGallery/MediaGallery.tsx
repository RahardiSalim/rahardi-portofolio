import { cn } from '@/lib/utils';
import { MediaImage, type MediaImageFit } from '@/components/common/MediaImage';

export interface MediaGalleryItem {
  src: string;
  alt: string;
  caption?: string;
  fit?: MediaImageFit;
}

interface MediaGalleryProps {
  items: MediaGalleryItem[];
  title?: string;
  className?: string;
}

export function MediaGallery({ items, title = 'Media', className }: MediaGalleryProps) {
  const uniqueItems = items.filter(
    (item, index, all) => item.src && all.findIndex((candidate) => candidate.src === item.src) === index
  );

  if (uniqueItems.length === 0) return null;

  return (
    <section className={cn('border-t border-gray-200 dark:border-gray-700 pt-8 mb-12', className)}>
      <h2 className="text-sm uppercase tracking-widest font-mono mb-6 dark:text-white">{title}</h2>
      <div className={cn('grid gap-4', uniqueItems.length > 1 && 'sm:grid-cols-2')}>
        {uniqueItems.map((item) => (
          <figure key={item.src} className="min-w-0">
            <MediaImage
              src={item.src}
              alt={item.alt}
              fit={item.fit}
              className="aspect-[4/3] border border-black/10 dark:border-white/10"
              imageClassName="transition-transform duration-500 hover:scale-105"
            />
            {item.caption && (
              <figcaption className="mt-2 text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
