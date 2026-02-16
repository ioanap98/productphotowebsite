// This is a client component, needed because it uses hooks like useState
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function UploadFormPortfolio() {
  // Store selected files from the file input
  const [files, setFiles] = useState<FileList | null>(null);

  // Store a success or error message after uploading
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Store preview URLs of the selected images
  const [previews, setPreviews] = useState<string[]>([]);

  // Runs when the user selects files
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files; // Get the selected file(s)
    setFiles(selected);              // Save them in state

    // cleanup previous previews
    previews.forEach((p) => URL.revokeObjectURL(p));

    if (selected) {
      // Create temporary preview URLs for each selected file
      const previewUrls = Array.from(selected).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(previewUrls); // Save preview URLs in state to display below
    }
  };

  // Runs when the user clicks the Upload button
  const handleUpload = async () => {
    // If no files were selected, do nothing
    if (!files || files.length === 0) return setError('No files selected');

    setIsUploading(true);
    setError(null);
    setMessage('');

    try {
      // Create a FormData object to send files to the server
      const formData = new FormData();
      Array.from(files).forEach((file) =>
        formData.append('files', file) // Add each file to the FormData under key "files"
      );

      // Send the files to your API route (/api/portfolio)
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin', // include the admin-auth cookie
      });

      // Wait for server response and parse it
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || 'Upload failed');
      } else {
        // Show a success message
        setMessage(data.message || 'Uploaded!');
        // Clear the form
        setFiles(null);
        previews.forEach((p) => URL.revokeObjectURL(p));
        setPreviews([]);
      }
    } catch (err) {
      console.error('Upload error', err);
      setError('Network error. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // revoke previews when they change or on unmount
  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p));
  }, [previews]);

  return (
    <div className="mt-4">
      {/* File input (accepts multiple images) */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={isUploading}
        className={`bg-blue-600 text-white px-4 py-2 rounded ${isUploading ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>

      {/* Show upload result message */}
      {message && <p className="mt-2 text-green-600">{message}</p>}
      {error && <p className="mt-2 text-red-600">{error}</p>}

      {/* Show preview thumbnails of selected images */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {previews.map((src, idx) => (
          <div key={idx} className="relative w-full h-48">
            <Image
              src={src}
              alt={`Preview ${idx + 1}`}
              fill
              className="object-cover rounded shadow"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
