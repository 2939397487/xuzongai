"use client";

import { Play, Clock, Eye, Folder as FolderIcon, ChevronLeft, Book, Sparkles, Rocket } from "lucide-react";
import { useState } from "react";
import tutorialsData from "@/data/tutorials.json";

export interface Folder {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  count: number;
  icon: string;
}

export interface Video {
  id: number;
  folderId: number;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  category: string;
  level: string;
  views: string;
}

export interface TutorialData {
  folders: Folder[];
  videos: Video[];
}

/**
 * 文件夹卡片组件
 */
interface FolderCardProps {
  folder: Folder;
  onClick: () => void;
}

const FolderCard = ({ folder, onClick }: FolderCardProps) => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "folder":
        return <FolderIcon className="w-6 h-6 text-white dark:text-gray-900" />;
      case "book":
        return <Book className="w-6 h-6 text-white dark:text-gray-900" />;
      case "sparkles":
        return <Sparkles className="w-6 h-6 text-white dark:text-gray-900" />;
      case "rocket":
        return <Rocket className="w-6 h-6 text-white dark:text-gray-900" />;
      default:
        return <FolderIcon className="w-6 h-6 text-white dark:text-gray-900" />;
    }
  };

  return (
    <div
      className="group cursor-pointer"
      onClick={onClick}
    >
      {/* 缩略图 */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 mb-3">
        <img
          src={folder.thumbnail}
          alt={folder.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
        {/* 文件夹图标覆盖层 */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-slate-800 dark:bg-slate-100 flex items-center justify-center">
            {getIcon(folder.icon)}
          </div>
        </div>
        {/* 数量标签 */}
        <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/70 text-white text-xs font-medium">
          {folder.count} 个视频
        </div>
      </div>

      {/* 内容 */}
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1 line-clamp-1 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
          {folder.name}
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
          {folder.description}
        </p>
      </div>
    </div>
  );
};

/**
 * 视频卡片组件
 */
interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

const VideoCard = ({ video, onClick }: VideoCardProps) => {
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

  return (
    <div
      className="group cursor-pointer"
      onClick={onClick}
    >
      {/* 缩略图 */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 mb-3">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
        {/* 播放按钮覆盖层 */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-6 h-6 text-gray-900 ml-1" />
          </div>
        </div>
        {/* 时长标签 */}
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>
      </div>

      {/* 内容 */}
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
          {video.title}
        </h4>
        <div className="flex items-center gap-2 mt-2">
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(video.category)}`}>
            {video.category}
          </span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getLevelColor(video.level)}`}>
            {video.level}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * 教程区域主组件
 */
export default function TutorialSection() {
  const data: TutorialData = tutorialsData;
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const categories = ["全部", "基础", "进阶", "实战", "高级"];

  const currentFolder = data.folders.find((f) => f.id === currentFolderId)!;

  const filteredVideos = currentFolderId
    ? data.videos
        .filter((v) => v.folderId === currentFolderId)
        .filter((v) =>
          selectedCategory === "全部" ? true : v.category === selectedCategory
        )
    : [];

  const displayedVideos = currentFolderId
    ? filteredVideos
    : data.videos.slice(0, 6);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-6">
      {/* 标题 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800 dark:bg-slate-100">
            <Play className="w-5 h-5 text-white dark:text-gray-900" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              教程
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {currentFolderId
                ? `${currentFolder.name} - ${filteredVideos.length}个视频`
                : `${data.videos.length}个视频 · ${data.folders.length}个文件夹`}
            </p>
          </div>
        </div>
        <a
          href="/tutorials"
          className="text-sm text-slate-800 dark:text-slate-100 hover:underline flex items-center gap-1"
        >
          查看全部
          <ChevronLeft className="w-4 h-4 rotate-180" />
        </a>
      </div>

      {/* 返回按钮 */}
      {currentFolderId && (
        <button
          onClick={() => setCurrentFolderId(null)}
          className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          返回文件夹列表
        </button>
      )}

      {!currentFolderId ? (
        <>
          {/* 文件夹列表 */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {data.folders.map((folder) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                onClick={() => setCurrentFolderId(folder.id)}
              />
            ))}
          </div>

          {/* 最新视频 */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
              最新视频
            </h4>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              {displayedVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => console.log("播放视频:", video.title)}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 分类筛选 */}
          <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-slate-800 dark:bg-slate-100 text-white dark:text-gray-900"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 视频列表 */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => console.log("播放视频:", video.title)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
