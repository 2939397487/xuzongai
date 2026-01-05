/**
 * 应用常量配置
 */

import * as Icons from "lucide-react";
import type { IconMap, ColorMap } from "@/types";

/**
 * 图标映射配置
 * 将JSON中的图标名称映射到实际的Lucide React图标组件
 */
export const ICON_MAP: IconMap = {
  // 文本相关图标
  MessageSquare: Icons.MessageSquare,
  FileText: Icons.FileText,
  BookOpen: Icons.BookOpen,
  Terminal: Icons.Terminal,
  Globe: Icons.Globe,
  
  // 图像相关图标
  Image: Icons.Image,
  Sparkles: Icons.Sparkles,
  Palette: Icons.Palette,
  
  // 音频相关图标
  Mic: Icons.Mic,
  Volume2: Icons.Volume2,
  Video: Icons.Video,
  
  // 功能相关图标
  Search: Icons.Search,
  Code: Icons.Code,
  Code2: Icons.Code2,
  CheckCircle2: Icons.CheckCircle2,
  ChevronRight: Icons.ChevronRight,
  ChevronDown: Icons.ChevronDown,
  ChevronUp: Icons.ChevronUp,
  Star: Icons.Star,
  StarOff: Icons.StarOff,
  Copy: Icons.Copy,
  Check: Icons.Check,
  Download: Icons.Download,
  Play: Icons.Play,
  ExternalLink: Icons.ExternalLink,
  ArrowRight: Icons.ArrowRight,
  GraduationCap: Icons.GraduationCap,
  PieChart: Icons.PieChart,
  BarChart: Icons.BarChart,
  BarChart3: Icons.BarChart3,
  TrendingUp: Icons.TrendingUp,
  PenTool: Icons.PenTool,
  Brush: Icons.Brush,
  Headphones: Icons.Headphones,
  Zap: Icons.Zap,
  RefreshCw: Icons.RefreshCw,
  Lightbulb: Icons.Lightbulb,
};

/**
 * 颜色映射配置
 * 为不同ID或类型分配对应的颜色
 */
export const COLOR_MAP: ColorMap = {
  // 工作流颜色
  1: "bg-blue-500",
  2: "bg-cyan-500",
  3: "bg-green-500",
  4: "bg-purple-500",
  5: "bg-orange-500",
  
  // 提示词颜色
  "writing-1": "bg-blue-500",
  "writing-2": "bg-cyan-500",
  "writing-3": "bg-green-500",
  "writing-4": "bg-purple-500",
  "writing-5": "bg-pink-500",
  "coding-1": "bg-blue-500",
  "coding-2": "bg-indigo-500",
  "coding-3": "bg-purple-500",
  "coding-4": "bg-orange-500",
  "coding-5": "bg-red-500",
  "design-1": "bg-pink-500",
  "design-2": "bg-purple-500",
  "design-3": "bg-indigo-500",
  "design-4": "bg-blue-500",
  "design-5": "bg-cyan-500",
  
  // 智能体颜色
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  indigo: "bg-indigo-500",
};

/**
 * 模型类型映射配置
 */
export const MODEL_TYPE_MAP: Record<string, string> = {
  text: "文本生成",
  image: "图像生成",
  audio: "语音处理",
  multimodal: "多模态",
};

/**
 * 分类映射配置
 */
export const CATEGORY_MAP: Record<string, string> = {
  all: "全部",
  writing: "写作",
  coding: "编程",
  design: "设计",
  data: "数据分析",
  learning: "学习",
};

/**
 * 导航菜单配置
 */
export const NAV_ITEMS = [
  { label: "首页", href: "#hero" },
  { label: "大模型", href: "#models" },
  { label: "工作流", href: "#workflow" },
  { label: "智能体", href: "#agents" },
  { label: "提示词", href: "#prompts" },
  { label: "资源", href: "#resources" },
  { label: "关于", href: "#about" },
];

/**
 * 页面配置
 */
export const PAGE_CONFIG = {
  title: "AI大模型技术学习平台",
  description: "深入了解AI大模型技术，学习工作流构建和智能体开发",
  keywords: ["AI", "大模型", "GPT", "Claude", "智能体", "提示词工程"],
};
