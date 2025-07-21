import React from "react";

function Comment({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[#1c1b1b] rounded-xl border border-[#2a2a2a] my-3">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#ffeca0] text-sm font-bold">
        A
      </div>

      {/* Content */}
      <div className="flex flex-col">
        {/* Name */}
        <span className="text-sm font-semibold text-[#ffeca0]">Anonymous</span>

        {/* Comment Text */}
        <p className="text-sm text-gray-300 mt-1 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export default Comment;
