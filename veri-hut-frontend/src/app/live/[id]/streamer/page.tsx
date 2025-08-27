"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiPause,
  FiPlay,
  FiVolume2,
  FiVolumeX,
  FiMaximize,
  FiSend,
} from "react-icons/fi";

type ChatMsg = {
  id: string;
  who: "me" | "viewer";
  name?: string;
  text: string;
  time: string;
};

const INITIAL_CHAT: ChatMsg[] = [
  { id: "1", who: "viewer", name: "Mms", text: "I love the game", time: "2hrs" },
  { id: "2", who: "me", text: "Thanks mate", time: "1hr" },
  { id: "3", who: "viewer", name: "Grado", text: "Game fun as hell", time: "1hr" },
  { id: "4", who: "me", text: "Hello glad for you guys to join", time: "1m" },
];

export default function StreamerViewPage() {
  const [chat, setChat] = useState<ChatMsg[]>(INITIAL_CHAT);
  const [draft, setDraft] = useState("");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8); // 0..1

  const videoRef = useRef<HTMLVideoElement>(null);

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    setChat((c) => [...c, { id: String(Date.now()), who: "me", text: t, time: "now" }]);
    setDraft("");
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const onVolume = (val: number) => {
    const v = videoRef.current;
    if (!v) return;
    const clamped = Math.max(0, Math.min(1, val));
    v.volume = clamped;
    setVolume(clamped);
    if (clamped > 0 && v.muted) {
      v.muted = false;
      setMuted(false);
    }
  };

  const goFullscreen = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      // Request fullscreen on the video container for controls overlay
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await v.parentElement?.requestFullscreen();
      }
    } catch {}
  };

  // keep UI in sync if user uses native controls/keyboard
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onVol = () => {
      setMuted(v.muted);
      setVolume(v.volume);
    };
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("volumechange", onVol);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("volumechange", onVol);
    };
  }, []);

  // space to toggle play/pause
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-6">
      {/* Back */}
      <div className="mb-3">
        <Link href="/live" className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900">
          <FiArrowLeft /> Back
        </Link>
      </div>

      {/* Main area */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6">
        {/* Player + tips */}
        <div>
          {/* Player container (relative for overlay controls) */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-black">
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              // sample stream/video link (replace with your HLS/MP4 etc.)
              src="https://www.w3schools.com/html/mov_bbb.mp4"

              // If you serve HLS, swap to hls.js or a player lib
              playsInline
              controls={false}    // we provide custom controls
              muted={muted}
              // autoPlay // enable if you want it to auto start
            />

            {/* Center control bar (absolute, semi-transparent) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-3 sm:bottom-4 flex items-center gap-3 rounded-full bg-black/55 backdrop-blur px-3 py-2 text-white">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="h-9 w-9 rounded-full bg-white/15 hover:bg-white/25 grid place-items-center"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? <FiPause /> : <FiPlay />}
              </button>

              {/* Mute */}
              <button
                onClick={toggleMute}
                className="h-9 w-9 rounded-full bg-white/15 hover:bg-white/25 grid place-items-center"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? <FiVolumeX /> : <FiVolume2 />}
              </button>

              {/* Volume slider */}
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => onVolume(parseFloat(e.target.value))}
                className="w-28 accent-white"
                aria-label="Volume"
              />

              {/* Fullscreen */}
              <button
                onClick={goFullscreen}
                className="h-9 w-9 rounded-full bg-white/15 hover:bg-white/25 grid place-items-center"
                aria-label="Fullscreen"
              >
                <FiMaximize />
              </button>
            </div>
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

        {/* Chat column */}
        <aside className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col">
          <div className="flex-1 overflow-auto p-3 space-y-3">
            {chat.map((m) => (
              <div key={m.id} className={`flex ${m.who === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.who === "me"
                      ? "bg-rose-500 text-white"
                      : "bg-rose-100 text-rose-900 dark:bg-rose-900/30 dark:text-rose-100"
                  }`}
                >
                  {m.who === "viewer" && (
                    <div className="text-[11px] opacity-80 mb-0.5">
                      {m.name} <span className="text-[10px]">• {m.time}</span>
                    </div>
                  )}
                  <p>{m.text}</p>
                  {m.who === "me" && <span className="block text-[10px] mt-1 opacity-80">{m.time}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 p-3">
            <div className="flex items-center gap-2">
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
