import { useState } from "react";
import Getcontent from "./Getcontent";

const MainContent = () => {
  const [text, setText] = useState("");
  const [media, setMedia] = useState<File[]>([]);  // Array to handle multiple files
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]); // Previews for each file
  const [isEditing, setIsEditing] = useState(false); // To track editing media

  // Handle the text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v.length <= 1000) setText(v);
  };

  // Handle media file input change (supports multiple file uploads)
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));

    setMedia(prev => [...prev, ...newFiles]);
    setMediaPreviews(prev => [...prev, ...newPreviews]);
  };

  // Handle media edit (remove or change media)
  const handleMediaEdit = (index: number) => {
    const newMedia = [...media];
    const newPreviews = [...mediaPreviews];

    // Remove the selected file and its preview
    newMedia.splice(index, 1);
    newPreviews.splice(index, 1);

    setMedia(newMedia);
    setMediaPreviews(newPreviews);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    media.forEach(file => {
      formData.append("media", file);
    });

    try {
      const res = await fetch("http://127.0.0.1:8000/api/posts/", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(await res.text());

      // Clear form
      setText("");
      setMedia([]);
      setMediaPreviews([]);
      setIsEditing(false); // Reset editing state after posting
    } catch (err: any) {
      alert("Error creating post: " + (err?.message || err));
    }
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl shadow-lg">
        {/* Avatar */}
        <div className="bg-gray-300 w-10 h-10 rounded-full"></div>

        {/* Post input field */}
        <input
          type="text"
          placeholder="What's on your mind..."
          value={text}
          onChange={handleTextChange}
          maxLength={1000}
          className="flex-1 p-3 rounded-full border border-neutral-200 focus:outline-none"
        />

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <label htmlFor="media" className="cursor-pointer">
            <input
              id="media"
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              multiple // Allow multiple files
              className="hidden"
            />
            <span className="text-2xl">🖼️</span>
          </label>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-full bg-rose-400 text-white font-medium"
          >
            Post
          </button>
        </div>
      </div>

      {/* Media Preview and Editing */}
      {mediaPreviews.length > 0 && (
        <div className="mt-3 space-y-3">
          {mediaPreviews.map((preview, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex-1">
                {/* Display image or video */}
                {preview.match(/\.(mp4|webm|ogg)$/i) ? (
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
                onClick={() => handleMediaEdit(index)}
                className="text-red-500 px-2 py-1 rounded-full bg-gray-200"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      <Getcontent refreshKey={0} />
    </div>
  );
};

export default MainContent;
