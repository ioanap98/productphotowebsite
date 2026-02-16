'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function PortfolioPage() {
  const [images, setImages] = useState<string[]>([])

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/images')
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const data = await res.json()
        if (Array.isArray(data)) {
          setImages(data)
        }
      } catch (err: unknown) {
        console.error('Error fetching images', err)
        setError(err instanceof Error ? err.message : 'Failed to load images')
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  if (loading) return <p className="p-6">Loading…</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
  if (images.length === 0) return <p className="p-6">No images found.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {images.map((img, index) => (
        <div key={index} className="relative w-full h-48 rounded overflow-hidden shadow">
          <Image
            src={`/portfolio/${img}`}
            alt={`Uploaded ${img}`}
            fill                       // make it cover the div
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"  // responsive hint
            priority={index < 3}      // prioritize the first few
          />
        </div>
      ))}
    </div>
  )
}
