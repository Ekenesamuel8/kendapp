// src/components/Notification.tsx
export default function Notification() {
  return (
    <div className="max-w-full mx-auto bg-white shadow border border-neutral-200 overflow-auto">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h1 className="text-2xl font-semibold">Notification</h1>
      </div>

      {/* Tabs */}
      <div className="px-3">
        <div className="flex items-center justify-between border border-neutral-200 rounded-full overflow-hidden">
          <button className="flex-1 py-3 text-center text-neutral-900 font-medium bg-neutral-100">
            All
          </button>
          <button className="flex-1 py-3 text-center text-neutral-500">
            Channel
          </button>
          <button className="flex-1 py-3 text-center text-neutral-500">
            Mention
          </button>
        </div>
      </div>

      {/* List */}
      <div className="p-3">
        <div className="rounded-2xl border border-neutral-200 overflow-hidden bg-white">
          {/* Grouped: new posts from users */}
          <div className="px-4 py-3">
            <div className="flex items-center gap-2">
              <img src="/avatars/a.png" className="w-7 h-7 rounded-full" />
              <img src="/avatars/b.png" className="w-7 h-7 rounded-full -ml-2 ring-2 ring-white" />
              <img src="/avatars/c.png" className="w-7 h-7 rounded-full -ml-2 ring-2 ring-white" />
            </div>
            <p className="text-sm text-neutral-600 mt-2">
              New post notifications from Bryan and two others
            </p>
          </div>
          <Divider />

          {/* Rows */}
          <NotifRow
            icon={<UserIcon />}
            text="Angel Smith started following you."
            time="2 mins"
          />
          <Divider />
          <NotifRow
            icon={<HeartIcon className="text-rose-500" />}
            text="Bryan like your thread."
            time="1hr"
          />
          <Divider />
          <NotifRow
            icon={<HeartIcon className="text-rose-500" />}
            text="Kelvin like your video."
            time="1 hr"
          />
          <Divider />
          <NotifRow
            icon={<UserIcon />}
            text="Angel Smith started following you."
            time="1 day"
          />
          <Divider />
          <NotifRow
            icon={<TipIcon />}
            text="Zendel tipped your Video."
            time="2 days"
          />
          <Divider />
          <NotifRow
            icon={<LiveIcon />}
            text="Zaddy is Live"
            time="2 days"
          />
          <Divider />
          <NotifRow
            icon={<ReplyIcon />}
            text="Bryan replied to your thread."
            sub="Bruh this is fire work fam"
            time="3 days"
          />
          <Divider />
          <NotifRow
            icon={<ReplyIcon />}
            text="Angel replied to your Post."
            sub="I’ve been following $Ve since launch"
            time="8/3/25"
          />
          <Divider />
          <NotifRow
            icon={<HeartIcon className="text-rose-500" />}
            text="Bryan like your thread."
            time="7/8/25"
          />
          <Divider />
          <NotifRow
            icon={<TipIcon />}
            text="Winnie tipped your thread."
            time="6/8/25"
          />
          <Divider />
          <NotifRow
            icon={<HeartIcon className="text-rose-500" />}
            text="Precious like your Post."
            time="5/8/25"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Divider() {
  return <div className="h-px bg-neutral-200" />;
}

function NotifRow({
  icon,
  text,
  sub,
  time,
}: {
  icon: React.ReactNode;
  text: string;
  sub?: string;
  time: string;
}) {
  return (
    <div className="px-4 py-3 flex items-start gap-3 hover:bg-neutral-50">
      <div className="shrink-0 mt-[2px]">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[15px] text-neutral-900 truncate">{text}</div>
        {sub && (
          <div className="text-sm text-neutral-400 mt-0.5 truncate">{sub}</div>
        )}
      </div>
      <div className="text-xs text-neutral-400 shrink-0">{time}</div>
    </div>
  );
}

/* ---------- minimalist inline SVG icons (no libs) ---------- */

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={"w-5 h-5 " + className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 21s-7.5-4.6-9.6-8.4C.7 9.7 2.2 6 5.7 6c2 0 3.3 1.2 4.3 2.4C11 7.2 12.3 6 14.3 6c3.5 0 5 3.7 3.3 6.6C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      className="w-5 h-5 text-neutral-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function TipIcon() {
  return (
    <svg
      className="w-5 h-5 text-neutral-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v10c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
    </svg>
  );
}

function LiveIcon() {
  return (
    <svg
      className="w-5 h-5 text-neutral-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12a10 10 0 0 1 20 0" />
      <path d="M6 12a6 6 0 0 1 12 0" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ReplyIcon() {
  return (
    <svg
      className="w-5 h-5 text-neutral-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 14L3 7l7-7" transform="translate(5 6) rotate(90 7 7)" />
      <path d="M21 15a6 6 0 0 0-6-6H5" />
    </svg>
  );
}
