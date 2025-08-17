// src/components/MainContent.tsx
import { useState } from "react";
import Getcontent from "./Getcontent";

const MainContent = () => {
  const [text, setText] = useState("");
  const [media, setMedia] = useState<File | null>(null);

  // Handle the text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // Handle media file input change
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMedia(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //const formData = new FormData();
    //for (const [key, value] of Object.entries(formData)) {
      //if (key === "media") {
        //formData.append("key", value);
     //   } else {
       // formData.append(key, value);
        //}
    //}
    const formData = new FormData();
    formData.append("text", text);
    if (media) {
        formData.append("media", media);
    }

    try {
      // Send data to backend API (Django REST)
      const response = await fetch("http://127.0.0.1:8000/api/posts/", {
        method: "POST",
        body: formData,
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error("Failed to submit post");
      } else {
        const data = await response.json();
        console.log("Post created:", data);
      }

      // Clear the form after submission
      setText("");
      setMedia(null);
      alert("Post created successfully!");
    } catch (error) {
      alert("Error creating post: " + error);
    }
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg">
        {/* Avatar */}
        <div className="bg-gray-300 w-10 h-10 rounded-full"></div>

        {/* Post input field */}
        <input
          type="text"
          placeholder="What's on your mind..."
          value={text}
          onChange={handleTextChange}
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />

        {/* Buttons */}
        <div className="flex space-x-4 items-center">
          <label htmlFor="media" className="cursor-pointer">
            <span className="text-green-500 text-2xl">📷</span> {/* Image/Video Icon */}
            <input
              type="file"
              id="media"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="hidden"
            />
          </label>

          <span className="text-yellow-500 text-2xl cursor-pointer">😊</span> {/* Emoji Icon */}

          {/* Post Button */}
          <button
            onClick={handleSubmit}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
