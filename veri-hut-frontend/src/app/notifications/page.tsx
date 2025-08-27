"use client"
import { useState } from "react"


const TABS = [ "All", "Channel", "Mentions" ] as const
type Tab = typeof TABS[number]


type Notif = {
    id: string
    icon: string
    title?: string
    text: string
    subtext?: string
    time: string
    bucket: Tab
    unread?: boolean
}


const ALL_NOTIFS: Notif[] = [

    {
    id: "g1",
    icon: "🧑‍🤝‍🧑",
    text: "New post notifications from Bryan and two others",
    time: "2 mins",
    bucket: "All",
    unread: true,
  },
  { id: "1", icon: "👤", text: "Angel Smith started following you.", time: "2 mins", bucket: "All", unread: true },
  { id: "2", icon: "❤️", text: "Bryan liked your thread.", time: "1 hr", bucket: "All", unread: true },
  { id: "3", icon: "❤️", text: "Kelvin liked your video.", time: "1 hr", bucket: "Channel" },
  { id: "4", icon: "👤", text: "Angel Smith started following you.", time: "1 day", bucket: "All" },
  { id: "5", icon: "🫶", text: "Zendel tipped your video.", time: "2 days", bucket: "Channel" },
  { id: "6", icon: "📡", text: "Zaddy is Live", time: "2 days", bucket: "Channel" },
  {
    id: "7",
    icon: "💬",
    text: "Bryan replied to your thread.",
    subtext: "Bruh this is fire work fam",
    time: "3 days",
    bucket: "Mentions",
  },
  {
    id: "8",
    icon: "💬",
    text: "Angel replied to your post.",
    subtext: "I've been following $ve since launch",
    time: "8/3/25",
    bucket: "Mentions",
  },
]

const NotificationPage = () => {
     //  Keep track of which tab is active. Default to "All".
  const [tab, setTab] = useState<Tab>("All");

  const list = tab === "All" ? ALL_NOTIFS : ALL_NOTIFS.filter((n) => n.bucket === tab);
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-0 mt-6">
        <h1 className="text-2xl font-bold tracking-tight mb-3">Notifications</h1>


        <div className="border-b border-zinc-200 dark:border-zinc-800 mb-2">
        <div className="flex gap-8 text-sm">
          {TABS.map((name) => (
            <button
              key={name}
              onClick={() => setTab(name)}
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

        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        {list.map((n, idx) => (
          // Add a divider between rows except the first one.
          <div key={n.id} className={idx > 0 ? "border-t border-zinc-200 dark:border-zinc-800" : ""}>
            <div className="flex items-start gap-3 px-4 sm:px-5 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
              <div className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800">
                <span aria-hidden>{n.icon}</span>
              </div>

              {/*  Main text area */}
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  {/*  Boldish primary text like Figma */}
                  <span className="font-medium">{n.text}</span>
                </p>
                {/*  Optional grey sub-line (excerpt) */}
                {n.subtext && (
                  <p className="text-xs text-zinc-500 mt-1 truncate">{n.subtext}</p>
                )}
              </div>

              {/*  Right side: unread dot (if any) + time label */}
              <div className="ml-2 flex items-center gap-2 shrink-0">
                {n.unread && <span className="inline-block w-2 h-2 rounded-full bg-rose-500" aria-hidden />}
                <span className="text-xs text-zinc-500">{n.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state if there’s nothing in the selected tab */}
      {list.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center text-zinc-500">
          No notifications here yet.
        </div>
      )}
    </div>
  )
}

export default NotificationPage
