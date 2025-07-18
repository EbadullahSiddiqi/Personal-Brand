import React from "react";

function PostBox() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3 p-5 border-2 w-[60rem] h-1/2 border-[#ffeca0] rounded-lg">
        <h1 className="text-4xl font-bold text-white self-start">Title</h1>

        <p className="text-lg self-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea inventore
          deserunt, mollitia autem unde perspiciatis natus? Perferendis,
          quisquam accusantium qui temporibus veritatis maiores, deleniti,
          labore eum consequatur vero ipsum sint.
        </p>
      </div>
    </div>
  );
}

export default PostBox;
