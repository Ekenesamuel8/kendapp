"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiSend, FiSmile } from "react-icons/fi";

type ChatMsg = {
  id: string;
  who: "me" | "host" | "viewer";
  name?: string;
  text: string;
  time: string;
};

const INITIAL_CHAT: ChatMsg[] = [
  { id: "1", who: "viewer", name: "Mms", text: "I love the game", time: "2hrs" },
  { id: "2", who: "host", name: "You", text: "Thanks mate", time: "1hr" },
  { id: "3", who: "viewer", name: "Grado", text: "Game fun as hell", time: "1m" },
  { id: "4", who: "host", name: "You", text: "Hello glad for you guys to join", time: "1m" },
];

export default function ViewerPage() {
  const [chat, setChat] = useState(INITIAL_CHAT);
  const [draft, setDraft] = useState("");

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    setChat((c) => [
      ...c,
      { id: String(Date.now()), who: "me", name: "You", text: t, time: "now" },
    ]);
    setDraft("");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-6">
      {/* Back */}
      <div className="mb-3">
        <Link
          href="/live"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900"
        >
          <FiArrowLeft /> Back
        </Link>
      </div>

      {/* Main area: player + chat */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6">
        {/* Player + tips */}
        <div>
          {/* Video/player (viewer has no custom overlay controls) */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-black">
            <video
              className="w-full aspect-video object-cover"
              src="https://www.w3schools.com/html/mov_bbb.mp4"

              controls
              playsInline
            />
          </div>

          {/* Tip pills */}
          <div className="mt-3 flex items-center gap-4">
            <span className="inline-block rounded-full bg-rose-500 text-white text-xs px-3 py-1">
              Stream tip : 1k $ve
            </span>
            <span className="inline-block rounded-full bg-rose-500 text-white text-xs px-3 py-1">
              Total tipped: 20k $ve
            </span>
          </div>
        </div>

        {/* Chat */}
        <aside className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-auto p-3 space-y-3">
            {chat.map((m) => {
              const mine = m.who === "me";
              return (
                <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                      mine
                        ? "bg-rose-500 text-white"
                        : "bg-rose-100 text-rose-900 dark:bg-rose-900/30 dark:text-rose-100"
                    }`}
                  >
                    {!mine && (
                      <div className="text-[11px] opacity-80 mb-0.5">
                        {m.name} <span className="text-[10px]">• {m.time}</span>
                      </div>
                    )}
                    <p>{m.text}</p>
                    {mine && (
                      <span className="block text-[10px] mt-1 opacity-80">{m.time}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Composer (emoji + send like the design) */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 p-3">
            <div className="flex items-center gap-2">
              <button
                className="rounded-xl p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                aria-label="Emoji"
              >
                <FiSmile />
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500/30"
              />
              <button
                onClick={send}
                disabled={!draft.trim()}
                className="rounded-xl px-3 py-2 text-sm bg-rose-500 text-white disabled:opacity-50"
                aria-label="Send"
              >
                <FiSend />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
