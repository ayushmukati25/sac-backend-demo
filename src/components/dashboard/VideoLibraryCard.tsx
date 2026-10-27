"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Play, Video, X } from "lucide-react";
import { videos } from "@/lib/member-data";
import Card from "./Card";

type VideoItem = (typeof videos)[number];

export default function VideoLibraryCard({ className }: { className?: string }) {
  const [active, setActive] = useState<VideoItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <Card title="Video library" icon={Video} className={className} bodyClassName="flex flex-col">
      <ul className="flex flex-col gap-2 lg:min-h-0 lg:flex-1">
        {videos.map((video) => (
          <li key={video.id} className="flex lg:min-h-0 lg:flex-1">
            <button
              type="button"
              onClick={() => setActive(video)}
              className="group flex w-full items-center gap-3 rounded-xl border border-neutral-200 px-3 py-3 text-left transition-colors hover:border-neutral-400 hover:bg-neutral-50"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors group-hover:bg-ink-hover">
                <Play className="ml-0.5 size-4 fill-current" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink">{video.title}</span>
                <span className="block text-xs text-neutral-500">{video.channel}</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between bg-white px-4 py-3">
              <p className="text-sm font-semibold text-ink">{active.title}</p>
              <button type="button" onClick={() => setActive(null)} aria-label="Close video" className="rounded-lg p-1 text-neutral-500 hover:bg-neutral-100">
                <X className="size-5" />
              </button>
            </div>
            <iframe
              className="aspect-video w-full"
              src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
              title={active.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              // YouTube refuses to play embeds without a referrer (error 153).
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </Card>
  );
}
