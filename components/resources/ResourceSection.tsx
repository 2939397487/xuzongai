import { BookOpen, Video, Github, Globe, ExternalLink, Star } from "lucide-react";

const resourceCategories = [
  { name: "全部", id: "all" },
  { name: "文档", id: "docs" },
  { name: "教程", id: "tutorials" },
  { name: "工具", id: "tools" },
  { name: "社区", id: "community" }
];

const resources = [
  {
    category: "docs",
    title: "OpenAI API 官方文档",
    description: "OpenAI 官方API使用指南，包含所有模型接口详细说明和最佳实践",
    icon: BookOpen,
    color: "bg-blue-500",
    rating: 5
  },
  {
    category: "docs",
    title: "Anthropic Claude 文档",
    description: "Claude 模型完整文档，API参考、使用指南和示例代码",
    icon: BookOpen,
    color: "bg-cyan-500",
    rating: 4
  },
  {
    category: "tutorials",
    title: "LangChain 教程",
    description: "从入门到精通的 LangChain 框架学习路径，实战案例丰富",
    icon: Video,
    color: "bg-indigo-500",
    rating: 5
  },
  {
    category: "tutorials",
    title: "Prompt Engineering 课程",
    description: "系统化的提示词工程课程，掌握高效与模型对话的技巧",
    icon: Video,
    color: "bg-purple-500",
    rating: 4
  },
  {
    category: "tools",
    title: "Hugging Face",
    description: "开源模型和机器学习工具平台，海量预训练模型资源",
    icon: Globe,
    color: "bg-orange-500",
    rating: 5
  },
  {
    category: "tools",
    title: "GitHub AI Projects",
    description: "精选GitHub上的AI开源项目，涵盖各类应用场景和工具",
    icon: Github,
    color: "bg-gray-700",
    rating: 4
  },
  {
    category: "community",
    title: "Reddit r/artificial",
    description: "AI领域的活跃社区，最新资讯、讨论和资源分享",
    icon: Globe,
    color: "bg-green-500",
    rating: 4
  },
  {
    category: "community",
    title: "Discord AI Communities",
    description: "多个AI技术交流的Discord社区，与全球开发者实时交流",
    icon: Globe,
    color: "bg-pink-500",
    rating: 3
  }
];

export default function ResourceSection() {
  return (
    <section id="resources" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            学习资源中心
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            汇集优质学习资源，助力你快速掌握AI大模型技术
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {resourceCategories.map((category) => (
            <button
              key={category.id}
              className="px-6 py-2 rounded-full text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-colors"
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <a
                key={index}
                href="#"
                className="group p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className={`w-12 h-12 rounded-lg ${resource.color} bg-opacity-10 flex items-center justify-center`}>
                    <Icon className="h-6 w-6" style={{ color: resource.color.replace('bg-', '') }} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                  {resource.description}
                </p>

                {/* Rating & Link */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-1">
                    {[...Array(resource.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </a>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className="p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              想要更多资源？
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              关注我们的社区，获取最新的AI技术动态和学习资源
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 dark:bg-slate-100 text-white dark:text-gray-900 font-medium hover:bg-slate-700 dark:hover:bg-white transition-all"
            >
              加入社区
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
