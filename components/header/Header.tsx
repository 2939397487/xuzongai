"use client";

import { Brain, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import Link from "next/link";

const navItems = [
  { name: "首页", href: "/" },
  { name: "教程", href: "/tutorials" },
  { name: "大模型", href: "/models" },
  { name: "工作流", href: "/workflow" },
  { name: "智能体", href: "/agents" },
  { name: "提示词", href: "/prompts" },
  { name: "关于我", href: "/about" },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("搜索:", searchQuery);
    // 实际项目中这里会调用搜索API
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Logo and Search + Theme Toggle */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-slate-800 dark:text-slate-100" />
            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              AI大模型技术学习平台
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-white sm:hidden">
              AI学习平台
            </span>
          </div>

          {/* Right Side: Search Box & Theme Toggle */}
          <div className="flex items-center gap-4">
            {/* Search Box */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus-within:border-slate-800 dark:focus-within:border-slate-100 transition-colors">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="搜索模型、提示词..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white placeholder:text-gray-500 w-48"
              />
            </form>

            <ThemeToggle />
          </div>
        </div>

        {/* Bottom Row: Navigation Links */}
        <nav className="flex items-center gap-6 py-3 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors whitespace-nowrap px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
