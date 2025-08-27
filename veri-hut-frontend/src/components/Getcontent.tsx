"use client";
import { useEffect, useState } from "react";
import {
  FiMessageCircle,
  FiRepeat,
  FiHeart,
  FiBookmark,
  FiMoreVertical,
} from "react-icons/fi";

type UserMini = {
  name?: string; // e.g. "Kelvin Nita"
  username?: string; // e.g. "kelnita"
  avatar_url?: string; // absolute URL
};

type Post = {
  id: number | string;
  text: string;
  media?: string | null; // optional image/video
  created_at?: string; // ISO string from your API
  user?: UserMini; // optional nested user
  comments_count?: number;
  reposts_count?: number;
  likes_count?: number;
  bookmarks_count?: number;
};

export default function Getcontent({
  refreshKey = 0,
}: {
  refreshKey?: number;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/api/posts/", {
        cache: "no-store",
      });
      const data: Post[] = await res.json();

      // Sort: most recent first (fallback to id if no date)
      data.sort((a, b) => {
        const at = a.created_at ? new Date(a.created_at).getTime() : 0;
        const bt = b.created_at ? new Date(b.created_at).getTime() : 0;
        return bt - at;
      });

      setPosts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshKey]);

  return (
    <div className="mt-6 space-y-4">
      {loading && (
        <div className="animate-pulse bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm h-28" />
      )}

      {posts.map((p) => (
        <Card key={p.id} post={p} />
      ))}

      {!loading && posts.length === 0 && (
        <div className="text-center text-neutral-500 text-sm">
          No posts yet.
        </div>
      )}
    </div>
  );
}

function Card({ post }: { post: Post }) {
  const {
    text,
    media,
    user,
    created_at,
    comments_count = 0,
    reposts_count = 0,
    likes_count = 0,
    bookmarks_count = 0,
  } = post;

  const name = user?.name ?? "User";
  const handle = user?.username ? `@${user.username}` : "@user";
  const time = timeAgo(created_at);
  const avatar = user?.avatar_url ?? "https://api.dicebear.com/7.x/thumbs/svg";

  const isVideo = !!media && /\.(mp4|webm|ogg)$/i.test(media);

  return (
    <article className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm">
      {/* header */}
      <div className="flex items-start gap-3">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[15px] text-neutral-900">
              {name}
            </span>
            <span className="text-neutral-500 text-sm">{time}</span>
          </div>
          <div className="text-neutral-500 text-sm leading-tight">{handle}</div>
        </div>

        <button
          className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500"
          aria-label="More"
        >
          <FiMoreVertical size={18} />
        </button>
      </div>

      {/* text */}
      {text && (
        <p className="mt-3 text-[15px] leading-6 text-neutral-900">{text}</p>
      )}

      {/* media (optional) */}
      {media && (
        <div className="mt-3 overflow-hidden rounded-2xl border border-neutral-100">
          {isVideo ? (
            <video src={media} controls className="w-300px max-h-[480px]" />
          ) : (
            <img src={media} className="w-300px max-h-[450px] object-cover" />
          )}
        </div>
      )}

      {/* divider */}
      <div className="h-px bg-neutral-200/60 mt-4 mb-2" />

      {/* actions */}
      <div className="flex items-center gap-6 text-neutral-600">
        <Action icon={<FiMessageCircle />} count={comments_count} />
        <Action icon={<FiRepeat />} count={reposts_count} />
        <Action icon={<FiHeart />} count={likes_count} />
        <Action icon={<FiBookmark />} count={bookmarks_count} />
        {/* right-aligned red pill (from your screenshot) */}
        <div className="ml-auto w-8 h-8 rounded-full bg-rose-100 grid place-items-center">
          <div className="w-4 h-4 rounded-full bg-rose-400" />
        </div>
      </div>
    </article>
  );
}

function Action({ icon, count }: { icon: React.ReactNode; count?: number }) {
  return (
    <button className="group flex items-center gap-2 text-sm">
      <span className="grid place-items-center w-8 h-8 rounded-full group-hover:bg-neutral-100">
        {icon}
      </span>
      <span className="text-neutral-600">{count ?? 0}</span>
    </button>
  );
}

function timeAgo(iso?: string) {
  if (!iso) return "";
  const now = Date.now();
  const t = new Date(iso).getTime();
  const diff = Math.max(0, now - t);

  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins || 1}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}
