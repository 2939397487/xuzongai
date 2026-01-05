import { ArrowRight, Sparkles, Layers, Network, Zap, Bot } from "lucide-react";
import TutorialSection from "@/components/tutorials/TutorialSection";

export default function HeroSection() {
  const stats = [
    { icon: Layers, label: "AI模型", value: "100+", color: "text-slate-800 dark:text-slate-100" },
    { icon: Network, label: "工作流", value: "50+", color: "text-purple-500" },
    { icon: Bot, label: "智能体", value: "30+", color: "text-blue-500" },
    { icon: Zap, label: "提示词", value: "200+", color: "text-slate-800 dark:text-slate-100" },
  ];

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-slate-800/5 dark:bg-slate-100/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              探索AI无限可能
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              探索AI大模型的
              <span className="text-slate-800 dark:text-slate-100 block mt-2">无限可能</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              系统化学习路径，从基础概念到实战应用，助你在AI时代掌握核心技术能力，开启智能编程新时代。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 justify-center lg:justify-start">
              <a
                href="/models"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-800 dark:bg-slate-100 text-white dark:text-gray-900 font-medium hover:bg-slate-700 dark:hover:bg-white transition-all"
              >
                开始学习
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/workflow"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-gray-200 text-gray-900 dark:text-white dark:border-gray-700 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                查看资源
              </a>
            </div>
          </div>

          {/* Right Content - Tutorial Section */}
          <div className="relative hidden lg:block">
            <TutorialSection />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
