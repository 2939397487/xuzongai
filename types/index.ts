/**
 * 大模型类型定义
 */
export interface Model {
  id: number;
  name: string;
  type: "text" | "image" | "audio" | "multimodal";
  company: string;
  description: string;
  icon: string;
  features: string[];
}

/**
 * 工作流步骤定义
 */
export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

/**
 * 工作流类型定义
 */
export interface Workflow {
  id: number;
  name: string;
  description: string;
  icon: string;
  steps: WorkflowStep[];
  tools: string[];
}

/**
 * 智能体能力定义
 */
export interface AgentCapability {
  name: string;
  description: string;
}

/**
 * 智能体类型定义
 */
export interface Agent {
  id: number;
  name: string;
  icon: string;
  description: string;
  capabilities: string[];
  useCases: string[];
  color: string;
}

/**
 * 提示词类型定义
 */
export interface Prompt {
  id: string;
  title: string;
  description: string;
  template: string;
  tags: string[];
}

/**
 * 提示词分类定义
 */
export interface PromptCategory {
  category: string;
  icon: string;
  prompts: Prompt[];
}

/**
 * 资源类型定义
 */
export interface Resource {
  id: number;
  title: string;
  description: string;
  type: "文档" | "视频" | "工具" | "社区";
  icon: string;
  link: string;
  difficulty: "入门" | "进阶" | "高级";
}

/**
 * 导航菜单项类型定义
 */
export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

/**
 * 主题类型定义
 */
export type Theme = "light" | "dark" | "system";

/**
 * 分类选项类型定义
 */
export interface CategoryOption {
  id: string;
  name: string;
}

/**
 * 图标映射类型定义
 */
export type IconMap = Record<string, React.ComponentType<{ className?: string }>>;

/**
 * 颜色映射类型定义
 */
export type ColorMap = Record<string | number, string>;

/**
 * 分页参数类型定义
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 响应结果类型定义
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
