"use client";
import { useRef } from "react";
import VideoPost from "./VideoPost";

const FEED = [
  {
    id: "v1",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster:
      "https://images.unsplash.com/photo-1606813902917-9d2c436f75d1?auto=format&fit=crop&w=1200&q=60",
    author: { name: "Kelvin Nita" },
    caption: "come with me today as I share with you guys…",
    stats: { likes: 20, comments: 100, shares: 12, saves: 5, views: 2 },
  },
  {
    id: "v2",
    src: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    poster:
      "https://images.unsplash.com/photo-1623053063273-d3a9f82bc5e3?auto=format&fit=crop&w=1200&q=60",
    author: { name: "Bryan" },
    caption: "Blindin’, The Weeknd — simple vibes",
    stats: { likes: 120, comments: 56, shares: 22, saves: 10, views: 20 },
  },
];

export default function VideoFeed() {
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});


  const jump = (id: string, dir: "up" | "down") => {
    const idx = FEED.findIndex((f) => f.id === id);
    const next = FEED[dir === "down" ? idx + 1 : idx - 1];
    if (!next) return;
    refs.current[next.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="space-y-6">
      {FEED.map((v) => (
        <div
  key={v.id}
  ref={(el) => {
    refs.current[v.id] = el;
  }}
>
  <VideoPost
    id={v.id}
    src={v.src}
    poster={v.poster}
    author={v.author}
    caption={v.caption}
    stats={v.stats}
    onJump={(dir) => jump(v.id, dir)}
  />
</div>

      ))}
    </div>
  );
}
