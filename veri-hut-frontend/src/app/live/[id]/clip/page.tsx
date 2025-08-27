"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiVolume2,
  FiVolumeX,
  FiRewind,
  FiPlay,
  FiPause,
  FiFastForward,
} from "react-icons/fi";

/* ------ utils ------ */
const formatTime = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

/* min clip length (sec) to avoid zero-width selection */
const MIN_LEN = 0.25;

type DragTarget = "start" | "end" | null;

export default function ClipBuilderPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  // Selection (seconds)
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);

  // Dragging
  const [drag, setDrag] = useState<DragTarget>(null);

  // Toasts
  const [toast, setToast] = useState<null | "saved" | "posted">(null);

  // Preview in right panel
  const previewTime = start ?? 0;

  /* --------- media events --------- */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => setDuration(v.duration || 0);
    const onTime = () => setCurrent(v.currentTime || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onVol = () => setMuted(v.muted);

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("volumechange", onVol);
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("volumechange", onVol);
    };
  }, []);

  /* --------- transport --------- */
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
  };
  const jump = (delta: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(duration, v.currentTime + delta));
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
  };

  /* --------- track helpers --------- */
  const xToTime = (clientX: number) => {
    if (!trackRef.current || duration === 0) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return pct * duration;
  };

  const onTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const t = xToTime(e.clientX);
    if (start === null) {
      setStart(t);
      setEnd(null);
      return;
    }
    if (end === null) {
      if (t < start) {
        setEnd(start);
        setStart(Math.max(0, t));
      } else {
        setEnd(Math.max(start + MIN_LEN, t));
      }
      return;
    }
    // restart selection
    setStart(t);
    setEnd(null);
  };

  /* --------- dragging (pointer events) --------- */
  useEffect(() => {
    const onMove = (ev: PointerEvent) => {
      if (!drag || duration === 0) return;
      const t = xToTime(ev.clientX);

      if (drag === "start") {
        // clamp between 0 and end - MIN_LEN
        const maxStart = end != null ? Math.max(0, end - MIN_LEN) : duration - MIN_LEN;
        const newStart = Math.max(0, Math.min(maxStart, t));
        setStart(newStart);
      } else if (drag === "end") {
        // clamp between start + MIN_LEN and duration
        const minEnd = start != null ? Math.min(duration, start + MIN_LEN) : MIN_LEN;
        const newEnd = Math.max(minEnd, Math.min(duration, t));
        setEnd(newEnd);
      }
    };

    const onUp = () => setDrag(null);

    if (drag) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp, { once: true });
    }
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [drag, duration, start, end]);

  /* --------- UI derived --------- */
  const selLeftPct = start == null || duration === 0 ? 0 : (start / duration) * 100;
  const selWidthPct =
    start == null || end == null || duration === 0 ? 0 : ((end - start) / duration) * 100;

  const canSaveOrPost = start != null && end != null && end > start + MIN_LEN;

  const triggerToast = (t: "saved" | "posted") => {
    setToast(t);
    setTimeout(() => setToast(null), 1400);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-green-500 text-white rounded-xl px-4 py-2 shadow">
            {toast === "saved" ? "Saved" : "Posted"}
          </div>
        </div>
      )}

      {/* Header/back */}
      <div className="mb-3 flex items-center justify-between">
        <Link
          href="/live"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900"
        >
          <FiArrowLeft /> Back
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6">
        {/* Left: video + controls + timeline */}
        <div>
          <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-black">
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              src="https://www.w3schools.com/html/mov_bbb.mp4"

              controls={false}
              playsInline
            />
          </div>

          {/* Transport */}
          <div className="mt-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <div className="flex items-center gap-3 px-3 py-2">
              <button
                className="h-10 w-10 rounded-full grid place-items-center bg-rose-50 text-rose-600"
                onClick={toggleMute}
                aria-label="Mute"
              >
                {muted ? <FiVolumeX /> : <FiVolume2 />}
              </button>
              <button
                className="h-10 w-10 rounded-full grid place-items-center bg-rose-50 text-rose-600"
                onClick={() => jump(-5)}
                aria-label="Rewind 5s"
              >
                <FiRewind />
              </button>
              <button
                className="h-10 w-10 rounded-full grid place-items-center bg-rose-500 text-white"
                onClick={togglePlay}
                aria-label="Play/Pause"
              >
                {playing ? <FiPause /> : <FiPlay />}
              </button>
              <button
                className="h-10 w-10 rounded-full grid place-items-center bg-rose-50 text-rose-600"
                onClick={() => jump(5)}
                aria-label="Forward 5s"
              >
                <FiFastForward />
              </button>

              <div className="ml-auto text-xs text-zinc-500">
                {formatTime(current)} | {formatTime(duration)}
              </div>
            </div>

            {/* Timeline with draggable handles */}
            <div
              ref={trackRef}
              onClick={onTrackClick}
              className="relative h-24 cursor-crosshair bg-rose-100/40 rounded-b-2xl overflow-hidden select-none"
            >
              {/* stripes */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,0,0.06)_1px,transparent_1px)] bg-[length:12px_100%]" />

              {/* Selection area */}
              {start != null && end != null && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-12 rounded-2xl border-4 border-rose-300 bg-rose-200/30"
                  style={{ left: `${selLeftPct}%`, width: `${Math.max(0, selWidthPct)}%` }}
                />
              )}

              {/* Start handle */}
              {start != null && (
                <div
                  role="slider"
                  aria-label="Clip start"
                  aria-valuemin={0}
                  aria-valuemax={duration}
                  aria-valuenow={start}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    setDrag("start");
                  }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-14 w-3 rounded-full
                             bg-rose-500 shadow ring-2 ring-white/70 cursor-ew-resize"
                  style={{ left: `${selLeftPct}%` }}
                />
              )}

              {/* End handle */}
              {end != null && (
                <div
                  role="slider"
                  aria-label="Clip end"
                  aria-valuemin={0}
                  aria-valuemax={duration}
                  aria-valuenow={end}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    setDrag("end");
                  }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-14 w-3 rounded-full
                             bg-rose-500 shadow ring-2 ring-white/70 cursor-ew-resize"
                  style={{
                    left: `${Math.min(100, selLeftPct + selWidthPct)}%`,
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <aside className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Create clip</h3>
            <span className="text-xs rounded-full px-2 py-0.5 bg-rose-100 text-rose-700">
              {start == null ? 0 : end == null ? 1 : 2}/2
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-black mb-4">
            <video
              className="w-full aspect-video object-cover"
              src="https://cdn.coverr.co/videos/coverr-fun-video-game-9813/1080p.mp4"
              controls={false}
              muted
              onLoadedMetadata={(e) => {
                e.currentTarget.currentTime = previewTime || 0;
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled={!canSaveOrPost}
              onClick={() => setToast("saved")}
              className="flex-1 rounded-full border border-rose-300 text-rose-600 px-5 py-2 disabled:opacity-40"
            >
              Save
            </button>
            <button
              disabled={!canSaveOrPost}
              onClick={() => setToast("posted")}
              className="flex-1 rounded-full bg-rose-500 text-white px-5 py-2 disabled:opacity-40"
            >
              Post clip
            </button>
          </div>

          <p className="mt-3 text-xs text-zinc-500">
            Click to set start/end. Drag the red handles for fine control. Min length {MIN_LEN}s.
          </p>
          {start != null && end != null && (
            <p className="mt-2 text-xs text-zinc-500">
              Selection: <span className="font-medium">{formatTime(end - start)}</span> (
              {formatTime(start)} → {formatTime(end)})
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
