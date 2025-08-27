"use client";

import { useEffect, useRef, useState } from "react";
import { FiClock, FiCalendar, FiX } from "react-icons/fi";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved?: (payload: {
    title: string;
    category: string;
    thumbnail?: string;
    scheduledAt?: string; // ISO
  }) => void;
};

function formatPretty(dtISO: string) {
  try {
    const d = new Date(dtISO);
    const opts: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat(undefined, opts).format(d);
  } catch {
    return dtISO;
  }
}

export default function CreateStreamModal({ open, onClose, onSaved }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [thumb, setThumb] = useState<string | undefined>();
  const [scheduledAt, setScheduledAt] = useState<string | undefined>(); // ISO string
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dtInputRef = useRef<HTMLInputElement>(null);

  // Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset when closed
  useEffect(() => {
    if (!open) {
      setTitle("");
      setCategory("");
      setThumb(undefined);
      setScheduledAt(undefined);
      setShowToast(false);
    }
  }, [open]);

  if (!open) return null;

  const canContinue = !!title && !!category;
  const canSave = canContinue && !!scheduledAt;

  const handleSave = () => {
    if (!canSave) return;
    onSaved?.({ title, category, thumbnail: thumb, scheduledAt });
    // Show toast then close after a moment
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Top-centered toast */}
      {showToast && (
        <div className="absolute left-1/2 top-6 -translate-x-1/2 bg-green-500 text-white rounded-xl px-4 py-2 shadow-lg flex items-center gap-2">
          <span className="inline-block h-5 w-5 rounded-full bg-white/20 grid place-items-center">⏻</span>
          <span className="text-sm">Stream set</span>
        </div>
      )}

      {/* Card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[92vw] max-w-lg rounded-3xl bg-white dark:bg-zinc-950
                      border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200"
              aria-label="Back"
            >
              ←
            </button>
            <h2 className="text-base font-semibold">Create Stream</h2>
            <span className="w-6" aria-hidden />
          </div>

          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500/30"
          />

          {/* Upload Thumbnail */}
          <div className="mt-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setThumb(URL.createObjectURL(f));
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-28 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 grid place-items-center text-sm text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
            >
              {thumb ? (
                <img src={thumb} alt="Thumbnail preview" className="h-28 w-full object-cover rounded-xl" />
              ) : (
                "Upload Thumbnail Image"
              )}
            </button>
          </div>

          {/* Category */}
          <div className="mt-4 relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none rounded-xl border border-zinc-200 dark:border-zinc-800  bg-rose-500 dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500/30"
            >
              <option value="">Category</option>
              <option value="gaming">Gaming</option>
              <option value="sports">Sports</option>
              <option value="music">Music</option>
              <option value="tech">Tech</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">▾</span>
          </div>

          {/* Hidden native datetime input; triggered by icons */}
          <input
            ref={dtInputRef}
            type="datetime-local"
            className="hidden"
            onChange={(e) => {
              // Convert local value to ISO string for storage
              const local = e.target.value; // "2025-01-23T08:00"
              if (!local) return setScheduledAt(undefined);
              const iso = new Date(local).toISOString();
              setScheduledAt(iso);
            }}
          />

          {/* Footer */}
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <div className="w-1" />

              <div className="flex items-center gap-2">
                {/* Time */}
                <button
                  type="button"
                  onClick={() => dtInputRef.current?.showPicker?.() || dtInputRef.current?.click()}
                  title="Set time"
                  className="h-9 w-9 rounded-full bg-rose-100 text-rose-600 grid place-items-center hover:bg-rose-200"
                >
                  <FiClock />
                </button>

                <button
                  type="button"
                  onClick={() => dtInputRef.current?.showPicker?.() || dtInputRef.current?.click()}
                  title="Schedule"
                  className="h-9 w-9 rounded-full bg-rose-100 text-rose-600 grid place-items-center hover:bg-rose-200"
                >
                  <FiCalendar />
                </button>

                {/* Primary action — switches between Continue and save */}
                {scheduledAt ? (
                  <button
                    onClick={handleSave}
                    disabled={!canSave}
                    className="rounded-full px-6 py-2 text-sm bg-rose-500 text-white disabled:opacity-50"
                  >
                    save
                  </button>
                ) : (
                  <button
                    onClick={() => {}}
                    disabled={!canContinue}
                    className="rounded-full px-6 py-2 text-sm bg-rose-500 text-white disabled:opacity-50"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>

            {/* Scheduled info row (like your screenshot) */}
            {scheduledAt && (
              <div className="mt-3 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>
                  Time set for {formatPretty(scheduledAt)}
                </span>
                <button
                  onClick={() => setScheduledAt(undefined)}
                  className="inline-flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-200"
                >
                  <FiX /> Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
