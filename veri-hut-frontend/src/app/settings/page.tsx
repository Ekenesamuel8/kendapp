// components/SettingsSection.tsx
import Link from "next/link";
import {
  FiBell,
  FiLock,
  FiDollarSign,
  FiMessageCircle,
  FiInfo,
  FiHelpCircle,
  FiArrowLeft,
} from "react-icons/fi";

const settings = [
  {
    icon: FiBell,
    title: "Customize Notification",
    link: "/settings/notification",
    description: "Control when and how you’re notified about account activity.",
  },
  {
    icon: FiLock,
    title: "Account Security",
    link: "/settings/security",
    description: "Update your profile, login details, and account status.",
  },
  {
    icon: FiDollarSign,
    title: "Monetization",
    link: "/monetization",
    description: "Become a premium creator",
  },
  {
    icon: FiMessageCircle,
    title: "Messages",
    link: "settings/messages",
    description: "Manage who can message you and how you’re notified.",
  },
  {
    icon: FiInfo,
    title: "Bugs report form",
    link: "/report",
    description: "Report bugs you find in The Hut.",
  },
  {
    icon: FiHelpCircle,
    title: "Support",
    link: "/support",
    description: "Get help, report issues, or find answers to your questions.",
  },
];

const SettingsSection = () => {
  return (
    <div className="flex-1 p-3 bg-white m-3 rounded-lg">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <FiArrowLeft className="w-5 h-5 text-black cursor-pointer" />
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>

      {/* Settings List */}
      <div className="flex flex-col gap-1">
        {settings.map((item, idx) => (
          <Link
            key={idx}
            href={item.link}
            className="flex items-start space-x-3 p-4 bg-[#F8F8F8] hover:bg-gray-50 cursor-pointer"
          >
            <item.icon className="w-10 h-10 font-bold text-black mt-1" />
            <div>
              <p className="font-bold text-lg text-[#5A5A5A]">{item.title}</p>
              <p className="text-xs text-[#959595]">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SettingsSection;
