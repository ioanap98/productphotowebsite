'use client';

import { useEffect, useMemo, useState, type SyntheticEvent } from 'react';
import Image from 'next/image';

type ImageBucket = 'web' | 'mobile' | 'portfolio';
type ImageDimensions = { width: number; height: number };

type BucketMeta = {
  title: string;
  description: string;
  fetchEndpoint: string;
  imagePrefix: string;
};

const BUCKET_META: Record<ImageBucket, BucketMeta> = {
  web: {
    title: 'Web Hero Images',
    description: 'Images used for desktop and larger screens in your homepage hero slider.',
    fetchEndpoint: '/api/images/web',
    imagePrefix: '/uploads/web',
  },
  mobile: {
    title: 'Mobile Hero Images',
    description: 'Images used for mobile screens in your homepage hero slider.',
    fetchEndpoint: '/api/images/mobile',
    imagePrefix: '/uploads/mobile',
  },
  portfolio: {
    title: 'Portfolio Images',
    description: 'Images displayed in your website portfolio gallery.',
    fetchEndpoint: '/api/images/portfolio',
    imagePrefix: '/portfolio',
  },
};

export default function ImageManagerClient({ bucket }: { bucket: ImageBucket }) {
  const [images, setImages] = useState<string[]>([]);
  const [imageDimensions, setImageDimensions] = useState<Record<string, ImageDimensions>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [deletingName, setDeletingName] = useState<string | null>(null);

  const meta = useMemo(() => BUCKET_META[bucket], [bucket]);
  const isHeroBucket = bucket === 'web' || bucket === 'mobile';
  const gridClassName = 'grid grid-cols-3 gap-5';

  const loadImages = async () => {
    setLoading(true);
    setError(null);
    setImageDimensions({});

    try {
      const res = await fetch(meta.fetchEndpoint, { credentials: 'same-origin' });
      if (!res.ok) throw new Error(`Status ${res.status}`);

      const data = await res.json();
      if (Array.isArray(data)) {
        const normalized = data.filter((item): item is string => typeof item === 'string');
        setImages(normalized);
      } else {
        throw new Error('Invalid image response');
      }
    } catch (err) {
      console.error('Failed to load images', err);
      setError(err instanceof Error ? err.message : 'Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadImages();
  }, [meta.fetchEndpoint]);

  const handleImageLoad = (filename: string, event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    const width = image.naturalWidth;
    const height = image.naturalHeight;

    if (!width || !height) return;

    setImageDimensions((previous) => {
      const existing = previous[filename];
      if (existing?.width === width && existing?.height === height) {
        return previous;
      }

      return {
        ...previous,
        [filename]: { width, height },
      };
    });
  };

  const handleDelete = async (filename: string) => {
    const confirmed = window.confirm(`Delete ${filename}? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingName(filename);
    setError(null);
    setStatus(null);

    try {
      const res = await fetch('/api/admin/images', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bucket, filename }),
        credentials: 'same-origin',
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || 'Delete failed');
      }

      setImages((previous) => previous.filter((name) => name !== filename));
      setImageDimensions((previous) => {
        const next = { ...previous };
        delete next[filename];
        return next;
      });
      setStatus(`Deleted ${filename}`);
    } catch (err) {
      console.error('Delete failed', err);
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeletingName(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-light">{meta.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">{meta.description}</p>
        </div>
        <button
          type="button"
          onClick={() => void loadImages()}
          disabled={loading}
          className={`border border-white/80 bg-white/75 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-white ${
            loading ? 'cursor-not-allowed opacity-60' : ''
          }`}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {status && <p className="mb-4 text-sm text-green-700">{status}</p>}
      {error && <p className="mb-4 text-sm text-red-600">Error: {error}</p>}

      {loading ? (
        <p className="py-8 text-sm text-gray-600">Loading images...</p>
      ) : images.length === 0 ? (
        <div className="border border-dashed border-white/80 bg-white/60 p-8 text-center text-sm text-gray-600">
          No images found in this folder.
        </div>
      ) : (
        <div className={gridClassName}>
          {images.map((filename) => {
            const src = `${meta.imagePrefix}/${encodeURIComponent(filename)}`;
            const isDeleting = deletingName === filename;
            const dimensions = imageDimensions[filename];
            const fallbackDimensions =
              bucket === 'web'
                ? { width: 1600, height: 900 }
                : bucket === 'mobile'
                  ? { width: 900, height: 1200 }
                  : { width: 1200, height: 1200 };
            const heroImageClassName =
              bucket === 'web'
                ? 'mx-auto h-auto max-h-44 w-auto max-w-full object-contain'
                : 'mx-auto h-auto max-h-60 w-auto max-w-full object-contain';

            return (
              <article key={filename} className="border border-white/80 bg-white/80 p-4">
                {isHeroBucket ? (
                  <div className="flex min-h-[11rem] items-center justify-center overflow-hidden bg-white p-2">
                    <Image
                      src={src}
                      alt={filename}
                      width={dimensions?.width ?? fallbackDimensions.width}
                      height={dimensions?.height ?? fallbackDimensions.height}
                      className={heroImageClassName}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      onLoad={(event) => handleImageLoad(filename, event)}
                    />
                  </div>
                ) : (
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={src}
                      alt={filename}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onLoad={(event) => handleImageLoad(filename, event)}
                    />
                  </div>
                )}
                <div className="mt-3">
                  <p className="truncate text-sm text-gray-700" title={filename}>
                    {filename}
                  </p>
                  {dimensions && (
                    <p className="mt-1 text-xs text-gray-500">
                      {dimensions.width} x {dimensions.height}px
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => void handleDelete(filename)}
                    disabled={isDeleting}
                    className={`mt-3 w-full border px-3 py-2 text-sm font-medium transition-colors ${
                      isDeleting
                        ? 'cursor-not-allowed border-red-200 bg-red-100 text-red-400'
                        : 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100'
                    }`}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete Image'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
