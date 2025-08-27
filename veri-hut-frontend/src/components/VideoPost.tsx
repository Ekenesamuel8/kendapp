"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiBookmark,
  FiChevronUp,
  FiChevronDown,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";

type VideoPostProps = {
  id: string;
  src: string; // mp4 url
  poster?: string; // poster image
  author: { name: string };
  caption?: string;
  stats?: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    views?: number;
  };
  onJump?: (dir: "up" | "down") => void;
};

export default function VideoPost({
  id,
  src,
  poster,
  author,
  caption,
  stats = { likes: 0, comments: 0, shares: 0, saves: 0, views: 0 },
  onJump,
}: VideoPostProps) {
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // autoplay/pause when (mostly) in view
  useEffect(() => {
    const el = rootRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;
    const io = new IntersectionObserver(
      ([e]) =>
        e.isIntersecting && e.intersectionRatio > 0.6
          ? vid.play().catch(() => {})
          : vid.pause(),
      { threshold: [0, 0.25, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => setReady(true);
    v.addEventListener("loadedmetadata", onLoaded);
    return () => v.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  const fmt = (x?: number) => (x ?? 0).toLocaleString();

  return (
    <div ref={rootRef} className="relative w-[90%]">
      <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-black">
        {!ready && (
          <div className="absolute inset-0 animate-pulse bg-zinc-100 dark:bg-zinc-900" />
        )}
        <video
          ref={videoRef}
          className="w-full h-auto max-h-[700px] object-cover"
          style={{ aspectRatio: "9 / 16" }} // tall
          src={src}
          poster={poster}
          playsInline
          muted={muted}
          controls={false}
          preload="metadata"
        />
        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute left-3 top-3 h-8 w-8 rounded-full bg-white/80 dark:bg-black/60 grid place-items-center"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <FiVolumeX /> : <FiVolume2 />}
        </button>

        {/* action rail */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10 text-white">
          <Rail icon={<FiHeart />} label={fmt(stats.likes)} />
          <Rail
            icon={<FiMessageCircle />}
            label={fmt(stats.comments)}
            onClick={() => setShowComments(true)}
          />
          <Rail icon={<FiShare2 />} label={fmt(stats.shares)} />
          <Rail icon={<FiBookmark />} label={fmt(stats.saves)} />
        </div>
      </div>

      {/* caption */}
      {(author?.name || caption) && (
        <div className="mt-2 px-1">
          <p className="text-sm font-medium">{author?.name}</p>
          {caption && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {caption}
            </p>
          )}
        </div>
      )}

      {/* jump buttons (only on wide screens) */}
      <div className="absolute right-[-46px] top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-2">
        <Jump dir="up" onClick={() => onJump?.("up")} />
        <Jump dir="down" onClick={() => onJump?.("down")} />
      </div>

      {/* comments sheet (simple) */}
      {showComments && (
        <div className="fixed right-6 top-24 bottom-6 w-[360px] max-w-[90vw] z-50 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
            <p className="text-sm font-medium">Comments (100)</p>
            <button
              onClick={() => setShowComments(false)}
              className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              Close
            </button>
          </div>
          <div className="p-4 space-y-4 overflow-auto text-sm">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div>
                  <p className="font-medium">User {i + 1}</p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    man cmon it’s {i % 2 ? "so" : "too"} good
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Rail({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-1"
    >
      <span className="grid place-items-center h-10 w-10 rounded-full bg-black/50 hover:bg-black/60">
        {icon}
      </span>
      {label && (
        <span className="text-xs text-zinc-100 drop-shadow">{label}</span>
      )}
    </button>
  );
}
function Jump({ dir, onClick }: { dir: "up" | "down"; onClick?: () => void }) {
  const Icon = dir === "up" ? FiChevronUp : FiChevronDown;
  return (
    <button
      onClick={onClick}
      aria-label={`Jump ${dir}`}
      className="h-10 w-10 rounded-full bg-white/80 dark:bg-black/60 grid place-items-center"
    >
      <Icon />
    </button>
  );
}
