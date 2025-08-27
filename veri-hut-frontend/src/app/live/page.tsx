"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiHeart, FiMessageCircle, FiMoreHorizontal, FiPlus } from "react-icons/fi";
import CreateStreamModal from "@/components/CreateStreamModal";

/* Tabs */
const TABS = ["Livestream", "Spotlight"] as const;
type Tab = typeof TABS[number];

/* Types */
type Stream = {
  id: string;
  user: string;
  handle: string;
  avatar: string;
  time: string;
  title?: string;
  image: string;
  live?: boolean;
  views?: number;
  likes?: number;
  comments?: number;
};

/* Mock data */
const STREAMS: Stream[] = [
  { id: "s1", user: "Donald", handle: "@Don120", avatar: "🧑🏾‍🦱", time: "2h", title: "NBA who’s the next prince", image: "/live/nba.jpg", live: true, views: 5, likes: 20, comments: 20 },
  { id: "s2", user: "Malculate", handle: "@Madmae", avatar: "🧑🏻‍💻", time: "2h", title: "Battle Bro", image: "/live/battle.jpg", live: true, views: 5, likes: 20, comments: 20 },
  { id: "s3", user: "Grace", handle: "@graceee", avatar: "👩🏽", time: "2h", title: "Weekend build stream", image: "/live/build.jpg", views: 3, likes: 12, comments: 8 },
];

/** Replace this with your session/user handle (e.g. from NextAuth) */
const CURRENT_USER_HANDLE = "@kelvinita";

export default function LivePage() {
  const [tab, setTab] = useState<Tab>("Livestream");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const items = STREAMS.filter((s) => {
    if (tab === "Livestream" && !s.live) return false;
    if (tab === "Spotlight" && s.live) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return s.user.toLowerCase().includes(q) || s.handle.toLowerCase().includes(q) || (s.title ?? "").toLowerCase().includes(q);
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-6">
      <div className="mb-3">
        <h1 className="text-2xl font-bold tracking-tight">Broadcast</h1>
      </div>

      {/* Tabs + search */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex gap-8 text-sm">
          {TABS.map((name) => (
            <button
              key={name}
              onClick={() => setTab(name)}
              className={`py-3 -mb-px ${tab === name ? "text-black dark:text-white" : "text-zinc-500"}`}
            >
              {name}
              {tab === name && <span className="block h-[2px] rounded-full bg-rose-500 mt-2" />}
            </button>
          ))}
        </div>

        <div className="hidden sm:block w-full max-w-sm ml-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try searching for people or keywords"
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500/30"
          />
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-5">
        {items.map((s) => {
          const isOwner = s.handle.toLowerCase() === CURRENT_USER_HANDLE.toLowerCase();
          const href = isOwner ? `/live/${s.id}/streamer` : `/live/${s.id}/viewer`;

          return (
            <Link
              key={s.id}
              href={href}
              className="block rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden hover:shadow-sm transition-shadow"
            >
              <article>
                {/* Header */}
                <header className="flex items-center justify-between px-4 sm:px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800">
                      <span aria-hidden>{s.avatar}</span>
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm font-medium">
                        {s.user} <span className="text-zinc-500">{s.handle}</span>
                      </p>
                      <p className="text-xs text-zinc-500">{s.time}</p>
                    </div>
                  </div>
                  <span className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900" onClick={(e) => e.preventDefault()}>
                    <FiMoreHorizontal />
                  </span>
                </header>

                {/* Media */}
                <div className="relative">
                  <div className="relative w-full h-56 sm:h-72 md:h-80 bg-zinc-200 dark:bg-zinc-800">
                    <img
                      src={s.image}
                      alt={s.title ?? "stream"}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 800px, 100vw"
                    />
                  </div>

                  {s.live && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-rose-500/95 text-white text-xs px-2 py-1">
                      Live
                    </span>
                  )}

                  {s.title && (
                    <span className="absolute top-3 left-3 bg-black/40 backdrop-blur text-white text-sm px-2 py-1 rounded">
                      {s.title}
                    </span>
                  )}
                </div>

                {/* Stats row */}
                <footer className="px-4 sm:px-5 py-2.5">
                  <div className="flex items-center gap-5 text-sm text-zinc-700 dark:text-zinc-300">
                    <span className="inline-flex items-center gap-1.5">
                      <FiEye /> {s.views ?? 0}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FiHeart /> {s.likes ?? 0}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FiMessageCircle /> {s.comments ?? 0}
                    </span>
                  </div>
                </footer>
              </article>
            </Link>
          );
        })}

        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center text-zinc-500">
            No streams yet.
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        className="fixed bottom-6 right-6 z-10 rounded-full h-12 w-12 grid place-items-center bg-rose-500 text-white shadow-lg hover:brightness-95"
        aria-label="Create livestream"
        onClick={() => setOpen(true)}
      >
        <FiPlus />
      </button>

      <CreateStreamModal
        open={open}
        onClose={() => setOpen(false)}
        onContinue={(data) => {
          console.log("Create stream:", data);
          setOpen(false);
        }}
      />
    </div>
  );
}
