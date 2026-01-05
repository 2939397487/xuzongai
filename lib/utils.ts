/**
 * 通用工具函数库
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Model, Workflow, Agent, Prompt } from "@/types";
import { MODEL_TYPE_MAP, CATEGORY_MAP } from "./constants";

/**
 * 合并Tailwind CSS类名
 * 使用clsx和tailwind-merge智能合并类名，避免冲突
 * 
 * @param inputs - 类名数组
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 获取图标组件
 * 根据图标名称返回对应的React组件
 * 
 * @param iconName - 图标名称
 * @returns 图标组件或null
 */
export function getIconComponent(iconName: string) {
  const { ICON_MAP } = require("./constants");
  return ICON_MAP[iconName] || null;
}

/**
 * 获取颜色类名
 * 根据ID或类型返回对应的颜色类名
 * 
 * @param id - ID或类型
 * @returns 颜色类名字符串
 */
export function getColorClass(id: string | number): string {
  const { COLOR_MAP } = require("./constants");
  return COLOR_MAP[id] || "bg-blue-500";
}

/**
 * 获取模型类型显示名称
 * 将模型类型代码转换为中文显示名称
 * 
 * @param type - 模型类型代码
 * @returns 中文类型名称
 */
export function getModelTypeName(type: string): string {
  return MODEL_TYPE_MAP[type] || type;
}

/**
 * 获取分类显示名称
 * 将分类代码转换为中文显示名称
 * 
 * @param category - 分类代码
 * @returns 中文分类名称
 */
export function getCategoryName(category: string): string {
  return CATEGORY_MAP[category] || category;
}

/**
 * 复制文本到剪贴板
 * 异步复制文本到系统剪贴板
 * 
 * @param text - 要复制的文本
 * @returns Promise<boolean> - 是否成功
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("复制失败:", error);
    return false;
  }
}

/**
 * 防抖函数
 * 延迟执行函数，在等待时间内如果再次调用则重新计时
 * 
 * @param func - 要防抖的函数
 * @param wait - 等待时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * 节流函数
 * 限制函数在指定时间内只能执行一次
 * 
 * @param func - 要节流的函数
 * @param limit - 时间限制（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 格式化数字
 * 将数字格式化为易读的形式（如：1200 -> 1.2K）
 * 
 * @param num - 要格式化的数字
 * @returns 格式化后的字符串
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

/**
 * 滚动到页面顶部
 * 平滑滚动到页面顶部
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/**
 * 滚动到指定元素
 * 平滑滚动到页面上的指定元素
 * 
 * @param id - 元素ID
 */
export function scrollToElement(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

/**
 * 检查元素是否在视口中
 * 判断元素是否在当前可视区域内
 * 
 * @param element - DOM元素
 * @returns 是否在视口中
 */
export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * 获取随机ID
 * 生成一个随机ID字符串
 * 
 * @param prefix - ID前缀
 * @returns 随机ID字符串
 */
export function getRandomId(prefix: string = "id"): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 过滤模型数据
 * 根据类型过滤模型数据
 * 
 * @param models - 模型数组
 * @param type - 类型（"all"表示不过滤）
 * @returns 过滤后的模型数组
 */
export function filterModels(
  models: Model[],
  type: string
): Model[] {
  if (type === "all") return models;
  return models.filter(model => model.type === type);
}

/**
 * 过滤提示词数据
 * 根据分类过滤提示词数据
 * 
 * @param promptsData - 提示词分类数组
 * @param category - 分类（"all"表示全部）
 * @returns 过滤后的提示词数组
 */
export function filterPrompts(
  promptsData: { category: string; prompts: Prompt[] }[],
  category: string
): Prompt[] {
  if (category === "all") {
    return promptsData.flatMap(cat => cat.prompts);
  }
  return promptsData.find(cat => cat.category === category)?.prompts || [];
}

/**
 * 本地存储工具
 * 提供本地存储的封装方法
 */
export const storage = {
  /**
   * 设置本地存储
   */
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("存储失败:", error);
    }
  },

  /**
   * 获取本地存储
   */
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("读取失败:", error);
      return defaultValue;
    }
  },

  /**
   * 删除本地存储
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("删除失败:", error);
    }
  },
};
