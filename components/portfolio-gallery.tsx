"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, Maximize2, Play } from "lucide-react";
import type { PortfolioMedia } from "@/lib/portfolio";

const categories = [
  "All work",
  "Beauty & skincare",
  "Wellness & supplements",
  "Lifestyle",
  "Video & motion",
  "More work",
];
export default function PortfolioGallery({
  images,
  headingLevel: Heading = "h2",
  eagerImages = true,
}: {
  images: PortfolioMedia[];
  headingLevel?: "h2" | "h3";
  eagerImages?: boolean;
}) {
  const [category, setCategory] = useState("All work");
  const [selected, setSelected] = useState<PortfolioMedia | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered =
    category === "All work"
      ? images
      : images.filter((image) => image.category === category);
  const move = (direction: number) => {
    const index = filtered.findIndex(
      (image) => image.filename === selected?.filename,
    );
    setSelected(
      filtered[(index + direction + filtered.length) % filtered.length],
    );
  };
  return (
    <>
      <div
        role="group"
        aria-label="Filter portfolio"
        className="mb-8 flex flex-wrap gap-2"
      >
        {categories
          .filter(
            (name) =>
              name === "All work" ||
              images.some((image) => image.category === name),
          )
          .map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
              className={`min-h-11 border px-4 py-2 text-xs transition-colors ${category === name ? "border-[#242522] bg-[#242522] text-white" : "border-[#d8d7d0] hover:border-[#242522]"}`}
            >
              {name}
            </button>
          ))}
      </div>
      <p className="mb-6 text-xs text-[#66675f]" role="status">
        {filtered.filter((item) => item.kind === "image").length} photographs ·{" "}
        {filtered.filter((item) => item.kind === "video").length} videos ·
        Select to explore
      </p>
      <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((image, index) => (
          <figure key={image.filename}>
            <button
              type="button"
              className="group relative block aspect-square w-full overflow-hidden bg-[#e9e6e0]"
              aria-label={`View ${image.title}`}
              onClick={() => {
                setSelected(image);
                dialog.current?.showModal();
              }}
            >
              <Image
                src={image.kind === "video" ? image.poster! : image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                loading={eagerImages && index < 2 ? "eager" : "lazy"}
                className="object-contain transition-transform duration-500 group-hover:scale-[1.025]"
              />
              <span className="absolute bottom-3 right-3 grid size-9 place-items-center bg-white/90 text-[#242522]">
                {image.kind === "video" ? (
                  <Play size={17} aria-hidden="true" />
                ) : (
                  <Maximize2 size={15} aria-hidden="true" />
                )}
              </span>
            </button>
            <figcaption className="mt-3">
              <Heading className="text-sm">{image.title}</Heading>
              <p className="mt-1 text-[10px] uppercase tracking-[.12em] text-[#66675f]">
                {image.category}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        aria-label="Portfolio media detail"
        onClose={() => setSelected(null)}
        className="fixed inset-0 m-auto h-[90svh] max-h-none w-[min(94vw,1200px)] max-w-none border-0 bg-[#f7f5f1] p-3 backdrop:bg-black/85 sm:p-6"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.target instanceof HTMLVideoElement) return;
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 pb-3">
            <p className="text-xs">{selected?.title}</p>
            <button
              type="button"
              className="grid size-11 shrink-0 place-items-center"
              aria-label="Close media"
              onClick={() => dialog.current?.close()}
            >
              <X size={22} />
            </button>
          </div>
          <div className="relative min-h-0 flex-1">
            {selected &&
              (selected.kind === "video" ? (
                <video
                  key={selected.src}
                  src={selected.src}
                  poster={selected.poster}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={selected.alt}
                  className="h-full w-full object-contain"
                >
                  Your browser does not support this video.{" "}
                  <a href={selected.src}>Open the video</a>.
                </video>
              ) : (
                <Image
                  src={selected.src}
                  alt={selected.alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              ))}
          </div>
          <div className="flex items-center justify-between gap-4 pt-3">
            <button
              type="button"
              aria-label="Previous item"
              className="grid size-11 place-items-center"
              onClick={() => move(-1)}
            >
              <ArrowLeft size={20} />
            </button>
            <p className="text-center text-xs">{selected?.category}</p>
            <button
              type="button"
              aria-label="Next item"
              className="grid size-11 place-items-center"
              onClick={() => move(1)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
