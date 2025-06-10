import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

import FriendListSkeleton from "./skeletons/FriendListSkeleton";
import { Globe } from "lucide-react";

const Friends = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <FriendListSkeleton />;

  return (
    <aside
      className={`h-full w-full lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200
      ${selectedUser && window.innerWidth < 1024 ? "hidden" : ""}
    `}
    >
      <div className="border-b border-base-300 w-full p-5">
        <section className="flex items-center gap-2">
          <Globe className="size-6" />
          <span className="font-medium tracking-widest">Global</span>
        </section>
        <section className="mt-3 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm font-mono">Online</span>
          </label>
          <span className="text-xs text-zinc-500 font-mono">
            ({onlineUsers.length - 1} online)
          </span>
        </section>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
            ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }
            ${selectedUser && window.innerWidth < 1024 ? "hidden" : ""}
          `}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/default-avatar.png"}
                alt={user.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>
            <div className="flex flex-col text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm font-mono text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            No one right now...
          </div>
        )}
      </div>
    </aside>
  );
};

export default Friends;
