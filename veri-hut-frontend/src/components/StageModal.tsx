interface StageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const participants = [
  { id: 1, name: "Anita", role: "Host", avatar: "/avatars/anita.png" },
  { id: 2, name: "Dima", role: "Co-host", avatar: "/avatars/dima.png" },
  { id: 3, name: "Anita", role: "Co-host", avatar: "/avatars/anita2.png" },
  { id: 4, name: "Anita", role: "Guest", avatar: "/avatars/anita3.png" },
  { id: 5, name: "Anita", role: "Guest", avatar: "/avatars/anita4.png" },
];

export function StageModal({ isOpen, onClose }: StageModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#BFBFBF]/70 z-50">
      <div className="bg-white rounded-2xl p-20 w-full max-w-lg shadow-xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-12 right-8 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Participants */}
        <div className="flex items-center justify-center gap-6 my-16">
          {participants.map((p) => (
            <div key={p.id} className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full border-2 border-pink-500 overflow-hidden">
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-sm font-medium">{p.name}</p>
              <p className="text-xs text-gray-500">{p.role}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="w-full py-2 bg-[#ff6d75] hover:bg-red-400 text-white rounded-lg mb-16">
          Join stage
        </button>
      </div>
    </div>
  );
}
