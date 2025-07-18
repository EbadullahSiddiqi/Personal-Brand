import React from "react";

interface PostBoxProps {
  title?: string;
  content?: string;
}

function PostBox({ title, content }: PostBoxProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3 p-5 border-2 w-[60rem] h-1/2 border-[#ffeca0] rounded-lg">
        <h1 className="text-4xl font-bold text-white self-start">{title}</h1>

        <p className="text-lg self-start">{content}</p>
      </div>
    </div>
  );
}

export default PostBox;
