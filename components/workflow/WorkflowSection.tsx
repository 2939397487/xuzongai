"use client";

/**
 * 工作流展示组件
 * 展示AI开发工作流程，支持响应式布局和详细信息展开
 */

import { useState, useCallback, memo } from "react";
import { ChevronRight, CheckCircle2, Download, ChevronDown, ChevronUp } from "lucide-react";
import type { Workflow, WorkflowStep } from "@/types";
import { getIconComponent, getColorClass } from "@/lib/utils";

// 导入工作流数据
import workflowsData from "@/data/workflows.json";

/**
 * 工作流步骤子组件
 * 使用memo优化，避免不必要的重新渲染
 */
interface WorkflowStepItemProps {
  step: WorkflowStep;
  index: number;
}

const WorkflowStepItem = memo(({ step, index }: WorkflowStepItemProps) => (
  <li className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
    <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
    <span>
      <span className="font-medium">{step.title}：</span>
      {step.description}
    </span>
  </li>
));

WorkflowStepItem.displayName = "WorkflowStepItem";

/**
 * 工作流卡片子组件（桌面端）
 * 使用memo优化，避免不必要的重新渲染
 */
interface WorkflowCardProps {
  workflow: Workflow;
  isExpanded: boolean;
  onToggle: () => void;
  isLast: boolean;
}

const WorkflowCard = memo(({ workflow, isExpanded, onToggle, isLast }: WorkflowCardProps) => {
  const IconComponent = getIconComponent(workflow.icon);
  const colorClass = getColorClass(workflow.id);

  return (
    <div className="relative">
      {/* 卡片主体 */}
      <div
        className={`h-full p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
          isExpanded ? "border-blue-500" : ""
        }`}
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
        {/* 图标和编号 */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
            {IconComponent && (
              <IconComponent className={`h-6 w-6 ${colorClass.replace('bg-', 'text-')}`} />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-gray-200 dark:text-gray-700">
              {String(workflow.id).padStart(2, '0')}
            </span>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </div>
        </div>

        {/* 内容 */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {workflow.name}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {workflow.description}
        </p>

        {/* 展开的详细信息 */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">关键步骤</h4>
            <ul className="space-y-2">
              {workflow.steps.map((step, idx) => (
                <WorkflowStepItem key={idx} step={step} index={idx} />
              ))}
            </ul>
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">使用工具</p>
              <div className="flex flex-wrap gap-1">
                {workflow.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 箭头连接 */}
      {!isLast && (
        <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 hidden md:block">
          <ChevronRight className="h-6 w-6 text-gray-400" />
        </div>
      )}
    </div>
  );
});

WorkflowCard.displayName = "WorkflowCard";

/**
 * 工作流展示主组件
 */
export default function WorkflowSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  /**
   * 下载工作流模板
   */
  const downloadTemplate = useCallback(() => {
    console.log("下载工作流模板");
  }, []);

  /**
   * 切换步骤展开状态
   */
  const handleToggleStep = useCallback((workflowId: number) => {
    setExpandedStep(prev => (prev === workflowId ? null : workflowId));
  }, []);

  return (
    <section id="workflow" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI开发工作流程
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            实战案例：从需求到上线的完整开发流程
          </p>
        </div>

        {/* 下载按钮 */}
        <div className="mb-12 flex justify-center">
          <button
            onClick={downloadTemplate}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 dark:bg-slate-100 text-white dark:text-gray-900 font-medium hover:bg-slate-700 dark:hover:bg-white transition-all"
            aria-label="下载工作流模板"
          >
            <Download className="h-5 w-5" />
            下载工作流模板
          </button>
        </div>

        {/* 桌面端：横向布局 */}
        <div className="max-w-6xl mx-auto hidden md:block">
          <div className="grid grid-cols-5 gap-6">
            {(workflowsData as Workflow[]).map((workflow, index) => (
              <WorkflowCard
                key={workflow.id}
                workflow={workflow}
                isExpanded={expandedStep === workflow.id}
                onToggle={() => handleToggleStep(workflow.id)}
                isLast={index === workflowsData.length - 1}
              />
            ))}
          </div>
        </div>

        {/* 移动端：纵向布局 */}
        <div className="md:hidden space-y-6">
          {(workflowsData as Workflow[]).map((workflow, index) => {
            const IconComponent = getIconComponent(workflow.icon);
            const colorClass = getColorClass(workflow.id);
            const isExpanded = expandedStep === workflow.id;
            const isLast = index === workflowsData.length - 1;

            return (
              <div key={workflow.id} className="relative pl-8">
                {/* 时间线 */}
                {!isLast && (
                  <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                )}

                {/* 步骤编号 */}
                <div className="absolute left-0 top-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      isExpanded ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-white"
                    }`}
                  >
                    {workflow.id}
                  </div>
                </div>

                {/* 卡片主体 */}
                <div
                  className={`p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg cursor-pointer transition-all ${
                    isExpanded ? "border-blue-500" : ""
                  }`}
                  onClick={() => handleToggleStep(workflow.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
                      {IconComponent && (
                        <IconComponent className={`h-6 w-6 ${colorClass.replace('bg-', 'text-')}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {workflow.name}
                        </h3>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {workflow.description}
                      </p>

                      {/* 展开的详细信息 */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">关键步骤</h4>
                          <ul className="space-y-2">
                            {workflow.steps.map((step, idx) => (
                              <WorkflowStepItem key={idx} step={step} index={idx} />
                            ))}
                          </ul>
                          <div className="mt-3">
                            <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">使用工具</p>
                            <div className="flex flex-wrap gap-1">
                              {workflow.tools.map((tool, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
