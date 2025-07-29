// app/profile/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const skills = [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Bootstrap",
  "Next.js",
  "TypeScript",
  "TailwindCSS",
  "Drizzle ORM",
  "Prisma",
  "NeonDB",
  "Superbase",
];

const projects = [
  {
    title: "Personal LinkedIn / Social Media App",
    description:
      "A custom-built LinkedIn for REAL personal branding with posts, likes, and comments.",
    tech: ["Next.js", "TypeScript", "Drizzle ORM", "NeonDB"],
    status: "Live",
    link: "#",
  },
  {
    title: "Content Co-Pilot",
    description:
      "AI-powered content generation tool for YouTube Scripts, Instagram Reels, and LinkedIn Posts.",
    tech: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Gemini AI",
      "Clerk Auth",
      "Google Cloud Services",
    ],
    status: "Live",
    link: "https://contentcopilot.vercel.app/",
  },
  {
    title: "Prepit AI",
    description:
      "Study prepapration app that generates quizzes and flashcards from students' notes.",
    tech: ["Next.js", "TypeScript", "Gemini AI"],
    status: "Live",
    link: "https://prepit-ai.vercel.app/",
  },
  {
    title: "Kenjen Agency Website",
    description:
      "Portfolio website for our agency showcasing client work and services.",
    tech: ["React", "TailwindCSS", "Framer Motion"],
    status: "Live",
    link: "https://kenjen.tech/",
  },
];

const stats = [
  { label: "Projects", value: "12+" },
  { label: "Years Exp", value: "2+" },
];

type PostType = {
  id: number;
  title: string;
  content: string;
  likes: number;
  createdAt: string;
  // add other fields as needed
};

export default function ProfilePage() {
  const [posts, setPosts] = useState<PostType[]>([]);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#1c1b1b]">
      <div className="max-w-6xl mx-auto py-8 px-4 lg:px-8">
        {/* Hero Section with Cover */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a2a2a] via-[#333] to-[#2a2a2a] p-8 mb-8 shadow-2xl border border-[#3a3a3a]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ffeca0]/5 to-[#ffeca0]/10"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ffeca0] to-[#f5d97a] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <Image
                  src="/me2.png"
                  alt="Profile Picture"
                  width={120}
                  height={120}
                  className="relative rounded-full border-4 border-[#ffeca0]/50 backdrop-blur-sm shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#00c851] rounded-full border-4 border-[#2a2a2a] flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white to-[#ffeca0] bg-clip-text">
                  Ebadullah Siddiqi
                </h1>
                <p className="text-xl text-[#d6d0a5] mb-4 font-medium">
                  Full Stack Developer & Indie Hacker
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-[#ffeca0]">
                        {stat.value}
                      </div>
                      <div className="text-sm text-[#d6d0a5]">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href="mailto:dev.ebadullah@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-[#ffeca0] text-[#1c1b1b] cursor-pointer px-6 py-3 rounded-xl font-semibold hover:bg-[#f5d97a] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      Get In Touch
                    </button>
                  </a>
                  <button
                    onClick={downloadResume}
                    className="bg-[#2a2a2a]/80 backdrop-blur-sm cursor-pointer text-[#ffeca0] px-6 py-3 rounded-xl font-semibold hover:bg-[#333]/80 transition-all duration-200 border border-[#ffeca0]/30"
                  >
                    Download Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Me */}
            <div className="bg-[#2a2a2a]/70 backdrop-blur-sm rounded-2xl p-8 border border-[#3a3a3a] hover:border-[#ffeca0]/30 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#ffeca0] to-[#f5d97a] rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[#1c1b1b]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                About Me
              </h2>
              <p className="text-[#d6d0a5] leading-relaxed text-lg">
                I'm a MERN Stack & Next.js Developer and Indie Hacker building
                digital products and helping businesses grow with custom
                software. I run a software agency called{" "}
                <span className="text-[#ffeca0] font-semibold">Kenjen</span> and
                I'm always pushing out cool projects like this LinkedIn clone!
              </p>
            </div>

            {/* Projects */}
            <div className="bg-[#2a2a2a]/70 backdrop-blur-sm rounded-2xl p-8 border border-[#3a3a3a] hover:border-[#ffeca0]/30 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#ffeca0] to-[#f5d97a] rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[#1c1b1b]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Featured Projects
              </h2>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="group bg-[#333]/40 hover:bg-[#333]/60 border border-[#444]/50 hover:border-[#ffeca0]/40 p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#ffeca0]/5 hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#ffeca0] transition-colors">
                        {project.title}
                      </h3>
                      <span className="bg-[#00c851]/20 text-[#4ade80] px-3 py-1 rounded-full text-sm font-medium border border-[#00c851]/30">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-[#d6d0a5] mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-[#ffeca0]/10 text-[#ffeca0] px-3 py-1 rounded-lg text-sm font-medium border border-[#ffeca0]/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={project.link}
                      className="text-[#ffeca0] hover:text-[#f5d97a] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                      View Project
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-[#2a2a2a]/70 backdrop-blur-sm rounded-2xl p-8 border border-[#3a3a3a] hover:border-[#ffeca0]/30 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#ffeca0] to-[#f5d97a] rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[#1c1b1b]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Recent Posts
              </h2>
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <article
                    key={index}
                    className="group bg-[#333]/40 hover:bg-[#333]/60 border border-[#444]/50 hover:border-[#ffeca0]/40 p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#ffeca0]/5 hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-bold text-white group-hover:text-[#ffeca0] transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-[#d6d0a5] mb-4 leading-relaxed">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between">
                      {/* <div className="flex items-center gap-4 text-sm text-[#999]">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div> */}
                      <div className="flex items-center gap-4 text-sm text-[#999]">
                        <div className="flex items-center gap-1 hover:text-[#ffeca0] transition-colors cursor-pointer">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-1 hover:text-[#ffeca0] transition-colors cursor-pointer">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {/* {post.comments} */}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Skills */}
            <div className="bg-[#2a2a2a]/70 backdrop-blur-sm rounded-2xl p-8 border border-[#3a3a3a] hover:border-[#ffeca0]/30 transition-all duration-300 sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#ffeca0] to-[#f5d97a] rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[#1c1b1b]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Skills & Tech
              </h2>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between bg-[#333]/40 hover:bg-[#333]/60 p-4 rounded-xl border border-[#444]/50 hover:border-[#ffeca0]/40 transition-all duration-300"
                  >
                    <span className="font-semibold text-white group-hover:text-[#ffeca0] transition-colors">
                      {skill}
                    </span>
                    <div className="w-2 h-2 bg-[#ffeca0] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
