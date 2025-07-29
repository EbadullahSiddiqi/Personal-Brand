import React from "react";

function Comment({ text, name }: { text: string; name?: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[#1c1b1b] rounded-xl border border-[#2a2a2a] my-3 max-w-full sm:max-w-xl md:max-w-2xl">
      {/* Avatar */}
      <div className="w-9 h-9 min-w-[2.25rem] min-h-[2.25rem] rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#ffeca0] text-sm font-bold">
        {name ? name.charAt(0).toUpperCase() : "U"}
      </div>

      {/* Content */}
      <div className="flex flex-col overflow-hidden">
        {/* Name */}
        <span className="text-sm sm:text-base font-semibold text-[#ffeca0] break-words">
          {name}
        </span>

        {/* Comment Text */}
        <p className="text-sm sm:text-base text-gray-300 mt-1 leading-relaxed break-words">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Comment;
