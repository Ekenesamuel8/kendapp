"use client";
import { useState } from "react";
import Getcontent from "./Getcontent";
import VideoFeed from "./VideoFeed";
import { FiImage } from "react-icons/fi";
import Image from "next/image";
import Avatar_one from "../../public/avatars/1.png";
import Avatar_two from "../../public/avatars/2.png";
import Avatar_three from "../../public/avatars/3.png";
import Avatar_four from "../../public/avatars/4.png";

type Tab = "Verihut" | "Following" | "Videos";

const MainContent = () => {
  const [text, setText] = useState("");
  const [media, setMedia] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [feedVersion, setFeedVersion] = useState(0);

  const [tab, setTab] = useState<Tab>("Verihut");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v.length <= 1000) setText(v);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    setMedia((prev) => [...prev, ...newFiles]);
    setMediaPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleMediaEdit = (index: number) => {
    const nextMedia = [...media];
    const nextPrev = [...mediaPreviews];
    nextMedia.splice(index, 1);
    nextPrev.splice(index, 1);
    setMedia(nextMedia);
    setMediaPreviews(nextPrev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text);
    media.forEach((file) => formData.append("media", file));

    try {
      const res = await fetch("http://127.0.0.1:8000/api/posts/", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(await res.text());
      setText("");
      setMedia([]);
      setMediaPreviews([]);
      setIsEditing(false);
      setFeedVersion((v) => v + 1);
    } catch (err: any) {
      alert("Error creating post: " + (err?.message || err));
    }
  };

  return (
    <div className="flex-1 p-6 overflow-auto space-y-2">
      <div className="w-full space-y-1">
        {/* STORIES */}
        <div className="flex items-center gap-4 overflow-x-auto px-4 py-3 no-scrollbar p-2 rounded-lg shadow-md bg-white">
          {/* Story 1 (you) with + badge */}
          <div className="relative shrink-0">
            <div className="p-[3px] rounded-full bg-gradient-to-tr from-rose-500 to-rose-300">
              <div className="rounded-full bg-white p-1">
                <Image
                src={Avatar_one}
                alt="Profile_Avatar"
                className="w-10 h-10 bg-[#ABC5DE] rounded-full"
                />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 size-7 rounded-full bg-rose-400 grid place-items-center ring-4 ring-white">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </div>

          {/* Story 2 */}
          <div className="shrink-0">
            <div className="p-[3px] rounded-full bg-gradient-to-tr from-rose-500 to-rose-300">
              <div className="rounded-full bg-white p-1">
                <Image
                src={Avatar_one}
                alt="Profile_Avatar"
                className="w-10 h-10 bg-[#ABC5DE] rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Story 3 */}
          <div className="shrink-0">
            <div className="p-[3px] rounded-full bg-gradient-to-tr from-rose-500 to-rose-300">
              <div className="rounded-full bg-white p-1">
                <Image
                src={Avatar_one}
                alt="Profile_Avatar"
                className="w-10 h-10 bg-[#ABC5DE] rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Story 4 (inactive light ring) */}
          <div className="shrink-0">
            <div className="p-[3px] rounded-full bg-neutral-200">
              <div className="rounded-full bg-white p-1">
                <Image
                src={Avatar_two}
                alt="Profile_Avatar"
                className="w-10 h-10 bg-[#ABC5DE] rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Story 5 */}
          <div className="shrink-0">
            <div className="p-[3px] rounded-full bg-gradient-to-tr from-rose-500 to-rose-300">
              <div className="rounded-full bg-white p-1">
                <Image
                src={Avatar_four}
                alt="Profile_Avatar"
                className="w-10 h-10 bg-[#ABC5DE] rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Story 6 (purple ring example) */}
          <div className="shrink-0">
            <div className="p-[3px] rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400">
              <div className="rounded-full bg-white p-1">
                <Image
                src={Avatar_three}
                alt="Profile_Avatar"
                className="w-10 h-10 bg-[#ABC5DE] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="px-3 p-1 rounded-lg shadow-md bg-white">
          <div className="grid grid-cols-3 text-center py-3">
            {(["Verihut", "Following", "Videos"] as Tab[]).map((name) => (
              <button
                key={name}
                onClick={() => setTab(name)}
                className={`text-md font-semibold ${
                  tab === name ? "text-neutral-900" : "text-neutral-500"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Hide scrollbar on WebKit */}
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .size-16 {
            width: 4rem;
            height: 4rem;
          }
          .size-7 {
            width: 1.75rem;
            height: 1.75rem;
          }
        `}</style>

        {/* Composer (kept above feed like your figma) */}
        <div className="space-x-4 bg-white p-4 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-gray-300 w-10 h-10 rounded-full" />
            <input
              type="text"
              placeholder="What's on your mind..."
              value={text}
              onChange={handleTextChange}
              maxLength={1000}
              className="flex-1 p-3 rounded-full border border-neutral-200 focus:outline-none"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-full bg-rose-400 text-white font-medium"
              >
                Post
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 pl-12">
            <label htmlFor="media" className="cursor-pointer">
              <input
                id="media"
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaChange}
                multiple
                className="hidden"
              />
              <div className="flex items-center gap-2 text-sm">
                <FiImage className="w-6 h-6 text-green-600" /> Image/Video
              </div>
            </label>

            <button className="flex items-center gap-2 text-sm text-neutral-600">
              <span className="text-yellow-500 text-xl">😊</span> Emoji
            </button>

            <div className="flex items-center gap-3 ml-auto">
              <button className="w-5 h-5 rounded-full bg-rose-400 text-white grid place-items-center">
                +
              </button>
              <button className="w-5 h-5 rounded-full bg-rose-400 text-white grid place-items-center">
                .
              </button>
              <div className="flex items-center gap-1 text-sm text-neutral-500 cursor-pointer">
                Public <span>▾</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Preview (uses file.type, not URL extension) */}
      {mediaPreviews.length > 0 && (
        <div className="mt-3 space-y-3">
          {mediaPreviews.map((preview, idx) => {
            const isVideo = media[idx]?.type?.startsWith("video/");
            return (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex-1">
                  {isVideo ? (
                    <video
                      src={preview}
                      controls
                      className="max-h-60 object-cover rounded-lg"
                    />
                  ) : (
                    <img
                      src={preview}
                      alt="preview"
                      className="max-h-60 object-cover rounded-lg"
                    />
                  )}
                </div>
                <button
                  onClick={() => handleMediaEdit(idx)}
                  className="text-red-500 px-2 py-1 rounded-full bg-gray-200"
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* FEEDS */}
      {tab === "Videos" ? (
        <VideoFeed />
      ) : (
        <Getcontent refreshKey={feedVersion} />
      )}
    </div>
  );
};

export default MainContent;
