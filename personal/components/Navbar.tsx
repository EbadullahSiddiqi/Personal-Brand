"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  return (
    <div>
      <nav>
        <div className="flex justify-between items-center p-4">
          {/* Name and Pic div*/}
          <div className="flex gap-3 items-center justify-between">
            <div className="hover:scale-110 transition-transform duration-300">
              <Image
                className="rounded-full border-2 border-[#ffeca0] cursor-pointer"
                src="/me2.png"
                alt="my image"
                priority={true}
                width={70}
                height={70}
                onClick={() => {
                  router.push("/profile");
                }}
              />
            </div>

            <h1 className="text-3xl font-bold">Ebad</h1>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
