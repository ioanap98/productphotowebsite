'use client';

import { useState, useEffect, type ChangeEvent, type SyntheticEvent } from 'react';
import Image from 'next/image';

type UploadTarget = 'web' | 'mobile';
type ImageDimensions = { width: number; height: number };

export default function UploadForm() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [target, setTarget] = useState<UploadTarget>('web');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [previewDimensions, setPreviewDimensions] = useState<Record<string, ImageDimensions>>({});
  const [inputKey, setInputKey] = useState(0);

  const clearSelectedFiles = () => {
    previews.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
    setPreviews([]);
    setPreviewDimensions({});
    setFiles(null);
    setInputKey((previous) => previous + 1);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    setFiles(selected);
    setError(null);
    setPreviewDimensions({});

    previews.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));

    if (selected) {
      const previewUrls = Array.from(selected).map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
    } else {
      setPreviews([]);
    }
  };

  const handlePreviewLoad = (src: string, event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    const width = image.naturalWidth;
    const height = image.naturalHeight;

    if (!width || !height) return;

    setPreviewDimensions((previous) => {
      const existing = previous[src];
      if (existing?.width === width && existing?.height === height) {
        return previous;
      }

      return {
        ...previous,
        [src]: { width, height },
      };
    });
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      setError('No files selected');
      return;
    }

    setIsUploading(true);
    setError(null);
    setMessage('');

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append('files', file));

      const endpoint = target === 'web' ? '/api/upload/web' : '/api/upload/mobile';
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || 'Upload failed');
      } else {
        const uploadedCount = Array.isArray(data?.files) ? data.files.length : files.length;
        setMessage(data?.message || `Uploaded ${uploadedCount} file${uploadedCount === 1 ? '' : 's'}.`);
        clearSelectedFiles();
      }
    } catch (err) {
      console.error('Upload error', err);
      setError('Network error. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    return () => previews.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
  }, [previews]);

  const fileCount = files?.length ?? 0;
  const previewGridClassName = 'grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2';
  const previewImageClassName =
    target === 'web'
      ? 'mx-auto h-auto max-h-44 w-auto max-w-full object-contain'
      : 'mx-auto h-auto max-h-60 w-auto max-w-full object-contain';

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-3 text-sm font-medium text-gray-700">Destination</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setTarget('web')}
            className={`border px-4 py-2 text-sm font-medium transition-colors ${
              target === 'web'
                ? 'border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white'
                : 'border-white/80 bg-white/70 text-gray-700 hover:bg-white'
            }`}
          >
            Web Images
          </button>
          <button
            type="button"
            onClick={() => setTarget('mobile')}
            className={`border px-4 py-2 text-sm font-medium transition-colors ${
              target === 'mobile'
                ? 'border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white'
                : 'border-white/80 bg-white/70 text-gray-700 hover:bg-white'
            }`}
          >
            Mobile Images
          </button>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Choose image files</p>
        <input
          key={inputKey}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-black"
        />
        <p className="mt-2 text-xs text-gray-500">Selected: {fileCount} file{fileCount === 1 ? '' : 's'}.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading}
          className={`brand-gradient-button border-0 px-5 py-2.5 text-sm font-medium text-white ${
            isUploading ? 'cursor-not-allowed opacity-70' : ''
          }`}
        >
          {isUploading ? 'Uploading...' : 'Upload Files'}
        </button>
        <button
          type="button"
          onClick={clearSelectedFiles}
          disabled={isUploading || previews.length === 0}
          className={`border border-white/80 bg-white/70 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-white ${
            isUploading || previews.length === 0 ? 'cursor-not-allowed opacity-60' : ''
          }`}
        >
          Clear Selection
        </button>
      </div>

      {message && <p className="text-sm text-green-700">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className={previewGridClassName}>
        {previews.map((src, idx) => {
          const dimensions = previewDimensions[src];
          const fallbackDimensions = target === 'web' ? { width: 1600, height: 900 } : { width: 900, height: 1200 };

          return (
            <div key={src} className="border border-white/80 bg-white p-3">
              <div className="flex min-h-[11rem] items-center justify-center overflow-hidden bg-gray-50 p-2">
                <Image
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  width={dimensions?.width ?? fallbackDimensions.width}
                  height={dimensions?.height ?? fallbackDimensions.height}
                  className={previewImageClassName}
                  sizes="(max-width: 1280px) 100vw, 50vw"
                  onLoad={(event) => handlePreviewLoad(src, event)}
                />
              </div>
              {dimensions && (
                <p className="mt-2 text-xs text-gray-500">
                  {dimensions.width} x {dimensions.height}px
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
