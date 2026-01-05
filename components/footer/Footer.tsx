"use client";

import { Github, Twitter, Mail, Linkedin, Send, CheckCircle2, Heart } from "lucide-react";
import { useState } from "react";

const techStack = [
  { name: "Next.js", icon: "⚡", color: "hover:text-slate-800 dark:hover:text-slate-100" },
  { name: "React", icon: "⚛️", color: "hover:text-blue-500" },
  { name: "TypeScript", icon: "📘", color: "hover:text-blue-600" },
  { name: "Tailwind", icon: "🎨", color: "hover:text-cyan-500" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              AI大模型技术学习平台
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed max-w-md mb-6">
              系统化学习AI大模型技术，从基础概念到实战应用，助力你在AI时代掌握核心技术能力。
            </p>

            {/* Tech Stack */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">技术栈</h4>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <div
                    key={index}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors ${tech.color}`}
                    title={tech.name}
                  >
                    <span>{tech.icon}</span>
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <a href="/models" className="text-sm text-gray-700 dark:text-gray-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors">
                  AI模型
                </a>
              </li>
              <li>
                <a href="/workflow" className="text-sm text-gray-700 dark:text-gray-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors">
                  工作流
                </a>
              </li>
              <li>
                <a href="/agents" className="text-sm text-gray-700 dark:text-gray-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors">
                  智能体
                </a>
              </li>
              <li>
                <a href="/prompts" className="text-sm text-gray-700 dark:text-gray-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors">
                  提示词
                </a>
              </li>
              <li>
                <a href="/tutorials" className="text-sm text-gray-700 dark:text-gray-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors">
                  教程
                </a>
              </li>
              <li>
                <a href="#resources" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                  资源
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe & Contact */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">订阅更新</h4>
            <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
              获取最新的AI技术资讯和学习资源
            </p>
            <form onSubmit={handleSubscribe} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="你的邮箱"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:border-slate-800 dark:focus:border-slate-100 focus:outline-none transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className="px-3 py-2 rounded-lg bg-slate-800 dark:bg-slate-100 text-white dark:text-gray-900 hover:bg-slate-700 dark:hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="订阅"
                >
                  {isSubscribed ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
              {isSubscribed && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  订阅成功！
                </p>
              )}
            </form>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">社交媒体</h4>
              <div className="flex items-center gap-3">
                <a
                  href="mailto:contact@example.com"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-slate-800 dark:hover:text-slate-100 hover:border-slate-800 dark:hover:border-slate-100 transition-colors"
                  aria-label="邮箱"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-slate-800 dark:hover:text-slate-100 hover:border-slate-800 dark:hover:border-slate-100 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-slate-800 dark:hover:text-slate-100 hover:border-slate-800 dark:hover:border-slate-100 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-slate-800 dark:hover:text-slate-100 hover:border-slate-800 dark:hover:border-slate-100 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
              © {currentYear} AI大模型技术学习平台. All rights reserved.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-current" /> by AI Community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
