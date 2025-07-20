import Navbar from "@/components/Navbar";
import PostsContainer from "@/components/PostsContainer";
import { DotLoader } from "react-spinners";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />

        <div className="flex flex-col items-center justify-center mt-10">
          <PostsContainer />
        </div>
      </div>
    </div>
  );
}
