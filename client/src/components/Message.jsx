import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

import { useChatStore } from "../store/useChatStore";
import { CircleChevronUp, CircleArrowRight, CircleX } from "lucide-react";

const Message = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const { sendMessage } = useChatStore();
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <CircleX className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex flex-col gap-2 w-full">
        <textarea
          ref={textareaRef}
          className="w-full textarea textarea-bordered rounded-lg textarea-md sm:textarea-md focus:outline-none font-mono resize-none"
          placeholder="Type anything..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (textareaRef.current) {
              textareaRef.current.style.height = "auto";
              textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
            }
          }}
          rows={1}
          style={{ maxHeight: "100px", overflowY: "auto" }}
        />
        <div className="flex gap-2 items-center justify-end">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`btn btn-circle ${
              imagePreview ? "text-green-600" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <CircleChevronUp size={20} />
          </button>
          <button
            type="submit"
            className="btn btn-sm btn-circle"
            disabled={!text.trim() && !imagePreview}
          >
            <CircleArrowRight size={22} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Message;
