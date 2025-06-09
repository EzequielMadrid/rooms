import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { CircleX } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [enlargedImage, setEnlargedImage] = useState(null);

  return (
    <>
      <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <section className="avatar">
              <div className="size-10 rounded-full relative">
                <img
                  src={selectedUser.profilePic || "/avatar.gif"}
                  alt={selectedUser.fullName}
                  onClick={() =>
                    setEnlargedImage(selectedUser.profilePic || "/avatar.gif")
                  }
                  className="rounded-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                />
              </div>
            </section>
            <section>
              <h3 className="font-medium">{selectedUser.fullName}</h3>
              <p className="text-sm font-mono text-base-content/70">
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </p>
            </section>
          </div>
          <button onClick={() => setSelectedUser(null)}>
            <CircleX />
          </button>
        </div>
      </div>

      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setEnlargedImage(null)}
        >
          <img
            src={enlargedImage}
            alt="Enlarged"
            className="rounded-full w-60 h-60 object-cover shadow-2xl ring-4 ring-white transition-all duration-300"
          />
        </div>
      )}
    </>
  );
};

export default ChatHeader;
