"use client";
import { useState } from "react";

const TABS = ["General", "Communities"] as const;
type Tab = typeof TABS[number];

type Message = {
  id: string;
  from: string;
  handle?: string;
  avatar?: string;
  text: string;
  time: string;
  mine?: boolean;
};

type Thread = {
  id: string;
  bucket: Tab;
  userName: string;
  handle?: string;
  avatar?: string;
  lastMessagePreview: string;
  time: string;
  unread?: boolean;
  messages: Message[];
};

const THREADS: Thread[] = [
  {
    id: "t1",
    bucket: "General",
    userName: "Dam angie",
    handle: "@damangie",
    avatar: "🧑🏾‍🦱",
    lastMessagePreview: "When are you coming over to the..",
    time: "1hr",
    unread: true,
    messages: [
      { id: "m1", from: "Dam angie", handle: "@damangie", avatar: "🧑🏾‍🦱", text: "Hey! free this evening?", time: "1hr" },
      { id: "m2", from: "Me", text: "Probably 7pm. Works?", time: "58m", mine: true },
      { id: "m3", from: "Dam angie", handle: "@damangie", avatar: "🧑🏾‍🦱", text: "Perfect. See you!", time: "55m" },
    ],
  },
  {
    id: "t2",
    bucket: "General",
    userName: "grad",
    handle: "@gard12",
    avatar: "🧔🏽",
    lastMessagePreview: "When are you coming over to the..",
    time: "1hr",
    messages: [{ id: "m1", from: "grad", handle: "@gard12", avatar: "🧔🏽", text: "Bro check the deck I sent", time: "1hr" }],
  },
  {
    id: "t3",
    bucket: "Communities",
    userName: "Dev Circle",
    handle: "@devcircle",
    avatar: "👩‍💻",
    lastMessagePreview: "Standup slides are in the drive",
    time: "1hr",
    messages: [
      { id: "m1", from: "Kelvin", avatar: "🧑🏾‍💻", text: "Standup slides are in the drive", time: "1hr" },
      { id: "m2", from: "Me", text: "Nice, thanks!", time: "58m", mine: true },
    ],
  },
  {
    id: "t4",
    bucket: "General",
    userName: "Lisa egg",
    handle: "@lisaegg",
    avatar: "👩🏼",
    lastMessagePreview: "Ping me when you’re free",
    time: "1hr",
    messages: [{ id: "m1", from: "Lisa", avatar: "👩🏼", text: "Ping me when you’re free", time: "1hr" }],
  },
];

const MessagesPage = () => {
  const [tab, setTab] = useState<Tab>("General");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  // Filter threads directly (cheap for small lists)
  const q = query.toLowerCase();
  const visibleThreads = THREADS.filter(
    (t) =>
      t.bucket === tab &&
      (!q ||
        t.userName.toLowerCase().includes(q) ||
        (t.handle?.toLowerCase().includes(q) ?? false) ||
        t.lastMessagePreview.toLowerCase().includes(q))
  );

  // Find active thread each render
  const activeThread = THREADS.find((t) => t.id === activeId) ?? null;

  const send = () => {
    if (!activeThread || !draft.trim()) return;
    activeThread.messages.push({
      id: `m-${Date.now()}`,
      from: "Me",
      text: draft.trim(),
      time: "now",
      mine: true,
    });
    setDraft("");
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-0 mt-6 ">
      <h1 className="text-2xl font-bold tracking-tight mb-3">Messages</h1>

      <div className="border-b border-zinc-200 dark:border-zinc-800 mb-2">
        <div className="flex gap-8 text-sm">
          {TABS.map((name) => (
            <button
              key={name}
              onClick={() => {
                setTab(name);
                setActiveId(null);
              }}
              className={`py-3 -mb-px capitalize ${
                tab === name ? "text-black dark:text-white" : "text-zinc-500"
              }`}
            >
              {name}
              {tab === name && <span className="block h-[2px] rounded-full bg-rose-500 mt-2" />}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[380px_minmax(0,1fr)] gap-4">
        {/* Left pane: list */}
        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try searching for people or keywords"
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500/30"
            />
          </div>

          <div className="px-3 pt-2 text-xs text-zinc-500 flex gap-6">
            <span className={tab === "General" ? "font-medium text-zinc-900 dark:text-zinc-100" : ""}>General</span>
            <span className={tab === "Communities" ? "font-medium text-zinc-900 dark:text-zinc-100" : ""}>Communities</span>
          </div>

          <div className="max-h-[70vh] overflow-auto">
            {visibleThreads.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`w-full text-left ${idx > 0 ? "border-t border-zinc-200 dark:border-zinc-800" : ""} ${
                  activeId === t.id ? "bg-rose-50/70 dark:bg-rose-950/10" : "hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                }`}
              >
                <div className="flex items-center gap-3 px-4 sm:px-5 py-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800">
                    <span aria-hidden>{t.avatar ?? "👤"}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium truncate">
                        {t.userName} {t.handle && <span className="text-zinc-500">{t.handle}</span>}
                      </p>
                      <span className="text-xs text-zinc-500 shrink-0">{t.time}</span>
                    </div>
                    <p className="text-xs text-zinc-500 truncate">{t.lastMessagePreview}</p>
                  </div>
                </div>
              </button>
            ))}
            {visibleThreads.length === 0 && (
              <div className="p-10 text-center text-zinc-500 text-sm">No conversations found.</div>
            )}
          </div>
        </div>

        {/* Right pane: chat */}
        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col min-h-[60vh]">
          <div className="h-14 px-4 sm:px-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
            {activeThread ? (
              <>
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800">
                  <span aria-hidden>{activeThread.avatar ?? "👤"}</span>
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-medium">{activeThread.userName}</p>
                  {activeThread.handle && <p className="text-xs text-zinc-500">{activeThread.handle}</p>}
                </div>
              </>
            ) : (
              <p className="text-sm text-zinc-500">Select a conversation to start chatting</p>
            )}
          </div>

          <div className="flex-1 overflow-auto p-4 sm:p-5 space-y-3">
            {activeThread ? (
              activeThread.messages.map((m) => (
                <div key={m.id} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                  {!m.mine && (
                    <div className="mr-2 flex items-center justify-center w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-800 shrink-0">
                      <span aria-hidden>{m.avatar ?? "👤"}</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                      m.mine ? "bg-rose-500 text-white" : "bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <span className={`block text-[10px] mt-1 ${m.mine ? "text-rose-100/80" : "text-zinc-500"}`}>
                      {m.time}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full grid place-items-center text-zinc-500 text-sm">Nothing selected</div>
            )}
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 p-3">
            <div className="flex items-center gap-2">
              <input
                disabled={!activeThread}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500/30 disabled:opacity-60"
              />
              <button
                onClick={send}
                disabled={!activeThread || !draft.trim()}
                className="rounded-xl px-3 py-2 text-sm bg-rose-500 text-white disabled:opacity-50"
              >
                Send
              </button>
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-zinc-500">
              <span>🖼️ Image/Video</span>
              <span>😊 Emoji</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
