"use client";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import {
  Play,
  Clock,
  Eye,
  Filter,
  Search,
  ChevronLeft,
  Folder as FolderIcon,
  Book,
  Sparkles,
  Rocket,
  Grid3x3
} from "lucide-react";
import { useState } from "react";
import tutorialsData from "@/data/tutorials.json";
import type { Folder, Video, TutorialData } from "@/components/tutorials/TutorialSection";

export default function TutorialsPage() {
  const data: TutorialData = tutorialsData;
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [selectedLevel, setSelectedLevel] = useState<string>("全部");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["全部", "基础", "进阶", "实战", "高级"];
  const levels = ["全部", "初级", "中级", "高级"];

  const currentFolder = data.folders.find((f) => f.id === currentFolderId)!;

  const filteredVideos = currentFolderId
    ? data.videos
        .filter((v) => v.folderId === currentFolderId)
        .filter((v) =>
          selectedCategory === "全部" ? true : v.category === selectedCategory
        )
        .filter((v) =>
          selectedLevel === "全部" ? true : v.level === selectedLevel
        )
        .filter((v) =>
          searchQuery === "" ||
          v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : [];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "初级":
        return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300";
      case "中级":
        return "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300";
      case "高级":
        return "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "基础":
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
      case "进阶":
        return "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300";
      case "实战":
        return "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300";
      case "高级":
        return "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  const getFolderIcon = (icon: string) => {
    switch (icon) {
      case "folder":
        return <FolderIcon className="w-8 h-8" />;
      case "book":
        return <Book className="w-8 h-8" />;
      case "sparkles":
        return <Sparkles className="w-8 h-8" />;
      case "rocket":
        return <Rocket className="w-8 h-8" />;
      default:
        return <FolderIcon className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* 页面标题区域 */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {currentFolderId ? `${currentFolder.name}` : "视频教程"}
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {currentFolderId
                  ? currentFolder?.description || ""
                  : "系统化学习AI技术，从基础概念到实战应用，帮助你在AI时代保持竞争力"}
              </p>
              {currentFolderId && (
                <button
                  onClick={() => {
                    setCurrentFolderId(null);
                    setSearchQuery("");
                    setSelectedCategory("全部");
                    setSelectedLevel("全部");
                  }}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  返回所有文件夹
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 教程内容区域 */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {!currentFolderId ? (
              <>
                {/* 文件夹列表 */}
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <Grid3x3 className="w-5 h-5 text-slate-800 dark:text-slate-100" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      文件夹
                    </h2>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({data.folders.length}个)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.folders.map((folder: Folder) => (
                      <div
                        key={folder.id}
                        className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                        onClick={() => setCurrentFolderId(folder.id)}
                      >
                        {/* 缩略图 */}
                        <div className="relative aspect-video">
                          <img
                            src={folder.thumbnail}
                            alt={folder.name}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                          {/* 文件夹图标覆盖层 */}
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-16 h-16 rounded-full bg-slate-800 dark:bg-slate-100 flex items-center justify-center">
                              {getFolderIcon(folder.icon)}
                            </div>
                          </div>
                          {/* 数量标签 */}
                          <div className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-black/70 text-white text-sm font-medium">
                            {folder.count} 个视频
                          </div>
                        </div>

                        {/* 内容 */}
                        <div className="p-5">
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
                            {folder.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {folder.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 最新视频 */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Play className="w-5 h-5 text-slate-800 dark:text-slate-100" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      最新视频
                    </h2>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      (最新6个)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.videos.slice(0, 6).map((video: Video) => (
                      <div
                        key={video.id}
                        className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                        onClick={() => console.log("播放视频:", video.title)}
                      >
                        {/* 缩略图 */}
                        <div className="relative aspect-video">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                          {/* 播放按钮覆盖层 */}
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                              <Play className="w-7 h-7 text-gray-900 ml-1" />
                            </div>
                          </div>
                          {/* 时长标签 */}
                          <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/70 text-white text-xs font-medium flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {video.duration}
                          </div>
                        </div>

                        {/* 内容 */}
                        <div className="p-5">
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-1 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
                            {video.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {video.description}
                          </p>

                          {/* 标签 */}
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getCategoryColor(
                                video.category
                              )}`}
                            >
                              {video.category}
                            </span>
                            <span
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getLevelColor(
                                video.level
                              )}`}
                            >
                              {video.level}
                            </span>
                          </div>

                          {/* 底部信息 */}
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1.5">
                              <Eye className="w-4 h-4" />
                              <span>{video.views} 次观看</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 文件夹内视频列表 */}
                {/* 筛选和搜索 */}
                <div className="mb-8 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  {/* 搜索框 */}
                  <div className="relative w-full lg:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="搜索视频..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-100"
                    />
                  </div>

                  {/* 分类和难度筛选 */}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-100"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-100"
                      >
                        {levels.map((lvl) => (
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 视频数量 */}
                <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                  找到 {filteredVideos.length} 个视频
                </div>

                {/* 视频网格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video: Video) => (
                    <div
                      key={video.id}
                      className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                      onClick={() => console.log("播放视频:", video.title)}
                    >
                      {/* 缩略图 */}
                      <div className="relative aspect-video">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        {/* 播放按钮覆盖层 */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                            <Play className="w-7 h-7 text-gray-900 ml-1" />
                          </div>
                        </div>
                        {/* 时长标签 */}
                        <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/70 text-white text-xs font-medium flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {video.duration}
                        </div>
                      </div>

                      {/* 内容 */}
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-1 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {video.description}
                        </p>

                        {/* 标签 */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getCategoryColor(
                              video.category
                            )}`}
                          >
                            {video.category}
                          </span>
                          <span
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getLevelColor(
                              video.level
                            )}`}
                          >
                            {video.level}
                          </span>
                        </div>

                        {/* 底部信息 */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <Eye className="w-4 h-4" />
                            <span>{video.views} 次观看</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 空状态 */}
                {filteredVideos.length === 0 && (
                  <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                      <Play className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      未找到相关视频
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      尝试调整筛选条件或搜索关键词
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
