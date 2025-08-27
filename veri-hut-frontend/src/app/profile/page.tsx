// components/ProfileSection.tsx
import {
  FiMoreVertical,
  FiMessageSquare,
  FiHeart,
  FiArrowLeft,
  FiDatabase,
} from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import ProfileImage from "../../../public/profile.png";
import Avatar_one from "../../../public/avatars/1.png";
import Avatar_two from "../../../public/avatars/2.png";
import Avatar_three from "../../../public/avatars/3.png";

const Profile = () => {
  const posts = [
    { id: 1, name: "Kelvin Nita", username: "@kelnita", avatar: Avatar_one },
    { id: 2, name: "Kelvin Nita", username: "@kelnita", avatar: Avatar_two },
    { id: 3, name: "Kelvin Nita", username: "@kelnita", avatar: Avatar_three },
  ];
  return (
    <div className="flex-1 px-4 m-3">
      <Link href="/" className="flex items-center mb-4">
        <FiArrowLeft className="w-6 h-6" />
      </Link>
      {/* Profile Header */}
      <div className="bg-[#AAAAAA] w-full h-40 relative mt-3">
        {/* Avatar */}
        <div className="absolute -bottom-10 left-6">
          <Image
            src={ProfileImage}
            alt="Profile Avatar"
            className="w-20 h-20 rounded-full bg-[#F6DE9D]"
          />
        </div>
      </div>

      <div className="px-6 pb-6 bg-white flex flex-col">
        <div className="flex justify-end pt-3 gap-2">
          <button className="p-3 rounded-full border border-[#ff6d75] text-[#ff6d75] hover:bg-red-50">
            <FiDatabase />
          </button>
          <button className="px-4 py-2 rounded-full border border-[#ff6d75] text-[#ff6d75] hover:bg-red-50">
            Edit profile
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-[15px]">Kelvin Nita</p>
            <p className="text-sm text-[#959595]">@kelnita</p>
            <p className="text-sm mt-1">
              onchain product ideas – designer | co-founder Verihut
            </p>
            <div className="flex gap-4 text-sm mt-2">
              <p>
                <span className="font-semibold">1200</span> followers
              </p>
              <p>
                <span className="font-semibold">200</span> following
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-around items-center bg-white mt-1 rounded-b-lg py-4">
        <Link href={"#"} className="font-bold text-[#1F1F1F]">
          Post
        </Link>
        <Link href={"#"} className="font-bold text-[#1F1F1F]">
          Replies
        </Link>
        <Link href={"#"} className="font-bold text-[#1F1F1F]">
          Likes
        </Link>
      </div>

      {/* Posts */}
      <div className="space-y-4 mt-4">
        {posts.map((post, id) => (
          <div
            key={id}
            className="flex flex-row bg-white rounded-lg shadow-sm p-4"
          >
            <div className="w-[10%] flex justify-center">
              <Image
                src={post.avatar}
                alt="avatar"
                className="w-15 h-15 rounded-full bg-[#ABC5DE]"
              />
            </div>

            <div className="flex flex-col w-[90%]">
              <div className="flex justify-between ">
                <div>
                  <h4 className="font-medium text-sm">{post.name} · 2h</h4>
                  <p className="text-xs text-[#959595]">{post.username}</p>
                </div>
                <FiMoreVertical className="text-gray-500" />
              </div>

              {/* Content */}
              <p className="mt-3 text-sm font-medium">
                We&apos;re going back to our SocialFi roots. <br />
                <br />
                One app for everything, Create, Trade, Play and Earn.
              </p>

              {/* Footer */}
              <div className="flex justify-between text-gray-500 text-sm mt-3">
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <FaRegCommentDots /> <span className="ml-2">5</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <AiOutlineRetweet /> <span className="ml-2">20</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiHeart /> <span className="ml-2">20</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiMessageSquare /> <span className="ml-2">20</span>
                  </div>
                </div>
                <div className="rounded-full p-1 bg-[#ff6d75]">
                  <FiDatabase className="text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
