import React from "react";
import { useEffect, useRef } from "react";

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { formatMsgTime } from "../lib/utils";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import MsgSkeleton from "./skeletons/MsgSkeleton";

const ChatBox = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const msgEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);
  useEffect(() => {
    if (msgEndRef.current && messages) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MsgSkeleton />
        <Message />
      </div>
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col overflow-auto ${
        window.innerWidth < 1024 ? "w-full" : ""
      }`}
    >
      <ChatHeader />
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((x) => (
          <div
            key={x._id}
            className={`chat ${
              x.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={msgEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    x.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.gif"
                      : selectedUser.profilePic || "/avatar.gif"
                  }
                  alt="avatar"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMsgTime(x.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {x.image && (
                <img
                  src={x.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {x.text && <p>{x.text}</p>}
            </div>
          </div>
        ))}
      </main>
      <Message />
    </div>
  );
};

export default ChatBox;
