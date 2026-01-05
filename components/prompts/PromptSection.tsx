"use client";

/**
 * 提示词库展示组件
 * 展示精选提示词模板，支持分类筛选、收藏和复制功能
 */

import { useState, useCallback, memo, useEffect } from "react";
import { Star, StarOff, Copy, Check } from "lucide-react";
import type { Prompt, PromptCategory, CategoryOption } from "@/types";
import { getIconComponent, getColorClass, getCategoryName, copyToClipboard } from "@/lib/utils";

// 导入提示词数据
import promptsData from "@/data/prompts.json";

/**
 * 提示词卡片子组件
 * 使用memo优化，避免不必要的重新渲染
 */
interface PromptCardProps {
  prompt: Prompt;
  isFavorite: boolean;
  isCopied: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onCopy: () => void;
}

const PromptCard = memo(({ prompt, isFavorite, isCopied, onToggleFavorite, onCopy }: PromptCardProps) => {
  const colorClass = getColorClass(prompt.id);

  return (
    <div className="group p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* 头部 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {prompt.title}
            </h3>
            {isFavorite && (
              <Star className="h-4 w-4 text-primary fill-current flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${colorClass}`}
            >
              {prompt.tags[0]}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onToggleFavorite}
            className={`p-2 rounded-lg transition-colors ${
              isFavorite
                ? "text-slate-800 dark:text-slate-100 hover:bg-slate-800/10 dark:hover:bg-slate-100/10"
                : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            aria-label={isFavorite ? "取消收藏" : "收藏"}
          >
            {isFavorite ? (
              <Star className="h-5 w-5 fill-current" />
            ) : (
              <StarOff className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={onCopy}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="复制提示词"
          >
            {isCopied ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Copy className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* 描述 */}
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {prompt.description}
      </p>

      {/* 标签 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {prompt.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 模板预览 */}
      <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3">
          {prompt.template}
        </p>
      </div>
    </div>
  );
});

PromptCard.displayName = "PromptCard";

/**
 * 提示词库主组件
 */
export default function PromptSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    // 从localStorage读取收藏状态
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("prompt-favorites");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });

  // 将收藏状态保存到localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("prompt-favorites", JSON.stringify([...favorites]));
    }
  }, [favorites]);

  /**
   * 根据分类过滤提示词
   */
  const filteredPrompts = selectedCategory === "all"
    ? (promptsData as PromptCategory[]).flatMap(category => category.prompts)
    : (promptsData as PromptCategory[]).find(cat => cat.category === selectedCategory)?.prompts || [];

  /**
   * 切换收藏状态
   */
  const handleToggleFavorite = useCallback((promptId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(promptId)) {
        newFavorites.delete(promptId);
      } else {
        newFavorites.add(promptId);
      }
      return newFavorites;
    });
  }, []);

  /**
   * 复制提示词
   */
  const handleCopy = useCallback(async (promptId: string, template: string) => {
    const success = await copyToClipboard(template);
    if (success) {
      setCopiedId(promptId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }, []);

  /**
   * 分类选项
   */
  const categories: CategoryOption[] = [
    ...promptsData.map(cat => ({ id: cat.category, name: getCategoryName(cat.category) }))
  ];

  return (
    <section id="prompts" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            精选提示词库
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            高质量提示词模板，覆盖多种应用场景，助力提升AI输出效果
          </p>
        </div>

        {/* 分类标签 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: "all", name: "全部" },
            ...categories
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
              aria-pressed={selectedCategory === category.id}
            >
              {category.id !== "all" && (() => {
                const IconComponent = getIconComponent(
                  (promptsData as PromptCategory[]).find(cat => cat.category === category.id)?.icon || ""
                );
                return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
              })()}
              {category.name}
            </button>
          ))}
        </div>

        {/* 收藏计数器 */}
        {favorites.size > 0 && (
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/10 dark:bg-slate-100/10 text-slate-800 dark:text-slate-100 text-sm font-medium">
              <Star className="h-4 w-4 fill-current" />
              已收藏 {favorites.size} 个提示词
            </span>
          </div>
        )}

        {/* 提示词卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              isFavorite={favorites.has(prompt.id)}
              isCopied={copiedId === prompt.id}
              onToggleFavorite={(e) => handleToggleFavorite(prompt.id, e)}
              onCopy={() => handleCopy(prompt.id, prompt.template)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
