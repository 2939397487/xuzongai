"use client";

/**
 * 大模型展示组件
 * 展示主流AI大模型信息，支持分类筛选和详细信息展开
 */

import { useState, useCallback, memo } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import type { Model, CategoryOption } from "@/types";
import { getIconComponent, getColorClass, getModelTypeName, filterModels } from "@/lib/utils";

// 导入模型数据
import modelsData from "@/data/models.json";

// 分类选项
const CATEGORIES: CategoryOption[] = [
  { id: "all", name: "全部" },
  { id: "text", name: "文本生成" },
  { id: "image", name: "图像生成" },
  { id: "audio", name: "语音处理" },
  { id: "multimodal", name: "多模态" },
];

/**
 * 模型卡片子组件
 * 使用memo优化，避免不必要的重新渲染
 */
interface ModelCardProps {
  model: Model;
  isExpanded: boolean;
  onToggle: () => void;
}

const ModelCard = memo(({ model, isExpanded, onToggle }: ModelCardProps) => {
  const IconComponent = getIconComponent(model.icon);
  const colorClass = getColorClass(model.id);

  return (
    <div
      className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onToggle();
        }
      }}
    >
      {/* 图标和标题 */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
          {IconComponent && (
            <IconComponent className={`h-6 w-6 ${colorClass.replace('bg-', 'text-')}`} />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {model.name}
            </h3>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            )}
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {model.description}
          </p>
        </div>
      </div>

      {/* 类型标签 */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 rounded-full bg-slate-800/10 dark:bg-slate-100/10 text-slate-800 dark:text-slate-100 text-xs font-medium">
          {getModelTypeName(model.type)}
        </span>
        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300">
          {model.company}
        </span>
      </div>

      {/* 特性标签 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {model.features.map((feature, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* 展开的详细信息 */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            onClick={(e) => e.stopPropagation()}
            aria-label={`查看${model.name}详细文档`}
          >
            查看详细文档
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
});

ModelCard.displayName = "ModelCard";

/**
 * 大模型展示主组件
 */
export default function ModelSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  /**
   * 过滤模型数据
   * 使用useCallback优化，避免每次渲染都重新创建函数
   */
  const filteredModels = filterModels(modelsData as Model[], selectedCategory);

  /**
   * 切换卡片展开状态
   */
  const handleToggleCard = useCallback((modelId: number) => {
    setExpandedCard(prev => (prev === modelId ? null : modelId));
  }, []);

  return (
    <section id="models" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            主流AI大模型分类
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            深入了解不同类型的大模型及其应用场景，为你的项目选择最适合的技术方案
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
              aria-pressed={selectedCategory === category.id}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Model Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredModels.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              isExpanded={expandedCard === model.id}
              onToggle={() => handleToggleCard(model.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
