"use client";

/**
 * 智能体展示组件
 * 展示实战AI Agent案例，包含核心能力和应用场景
 */

import { memo } from "react";
import { Play, BookOpen, ExternalLink } from "lucide-react";
import type { Agent } from "@/types";
import { getIconComponent, getColorClass } from "@/lib/utils";

// 导入智能体数据
import agentsData from "@/data/agents.json";

/**
 * 智能体卡片子组件
 * 使用memo优化，避免不必要的重新渲染
 */
interface AgentCardProps {
  agent: Agent;
}

const AgentCard = memo(({ agent }: AgentCardProps) => {
  const IconComponent = getIconComponent(agent.icon);
  const colorClass = getColorClass(agent.color);

  return (
    <div
      className="group p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* 头部：图标和标题 */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
          {IconComponent && (
            <IconComponent className={`h-6 w-6 ${colorClass.replace('bg-', 'text-')}`} />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
            {agent.name}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {agent.description}
          </p>
        </div>
      </div>

      {/* 核心能力 */}
      <div className="mb-4">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">核心能力</div>
        <div className="flex flex-wrap gap-2">
          {agent.capabilities.map((capability, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              {capability}
            </span>
          ))}
        </div>
      </div>

      {/* 应用场景 */}
      <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">应用场景</div>
        <div className="text-sm text-gray-900 dark:text-white">
          {agent.useCases.join("、")}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-3">
        <a
          href="#"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-100 text-white dark:text-gray-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-white transition-all"
          aria-label={`体验${agent.name}在线Demo`}
        >
          <Play className="h-4 w-4" />
          在线Demo
        </a>
        <a
          href="#"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          aria-label={`查看${agent.name}构建指南`}
        >
          <BookOpen className="h-4 w-4" />
          构建指南
        </a>
      </div>
    </div>
  );
});

AgentCard.displayName = "AgentCard";

/**
 * 智能体展示主组件
 */
export default function AgentSection() {
  return (
    <section id="agents" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            实战智能体案例
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            探索AI Agent在实际业务中的应用场景，学习如何构建智能自动化系统
          </p>
        </div>

        {/* 智能体卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {(agentsData as Agent[]).map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {/* CTA部分 */}
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <div className="p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              想要了解更多智能体案例？
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              关注我们的GitHub和社区，获取最新的智能体开发教程和实战案例
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 dark:bg-slate-100 text-white dark:text-gray-900 font-medium hover:bg-slate-700 dark:hover:bg-white transition-all"
              aria-label="查看完整案例库"
            >
              查看完整案例库
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
