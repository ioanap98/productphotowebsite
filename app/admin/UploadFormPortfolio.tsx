'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import Image from 'next/image';

export default function UploadFormPortfolio() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [inputKey, setInputKey] = useState(0);

  const clearSelectedFiles = () => {
    previews.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
    setPreviews([]);
    setFiles(null);
    setInputKey((previous) => previous + 1);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    setFiles(selected);
    setError(null);

    previews.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));

    if (selected) {
      const previewUrls = Array.from(selected).map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
    } else {
      setPreviews([]);
    }
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

      const res = await fetch('/api/portfolio', {
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

  return (
    <div className="space-y-5">
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

      <div className="grid grid-cols-2 gap-4 pt-1 md:grid-cols-3">
        {previews.map((src, idx) => (
          <div key={idx} className="relative aspect-square overflow-hidden bg-white">
            <Image src={src} alt={`Preview ${idx + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
          </div>
        ))}
      </div>
    </div>
  );
}
