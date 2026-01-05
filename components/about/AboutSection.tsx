import { Github, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            关于我们
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 leading-relaxed">
            我们是一支热爱AI技术的开发者团队，致力于打造优质的AI学习平台，
            帮助更多开发者快速掌握大模型技术，在AI时代保持竞争力。
          </p>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">开放共享</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                坚持开源精神，分享优质内容，促进知识传播
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">持续学习</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                紧跟技术前沿，不断更新内容，保持知识时效性
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">社区驱动</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                重视用户反馈，共建优质内容，打造学习社区
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              加入我们的社区
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              通过以下方式关注我们，获取最新的AI技术动态和学习资源
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium hover:border-slate-800 dark:hover:border-slate-100 hover:text-slate-800 dark:hover:text-slate-100 transition-all"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium hover:border-slate-800 dark:hover:border-slate-100 hover:text-slate-800 dark:hover:text-slate-100 transition-all"
              >
                <Twitter className="h-5 w-5" />
                Twitter
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 dark:bg-slate-100 text-white dark:text-gray-900 font-medium hover:bg-slate-700 dark:hover:bg-white transition-all"
              >
                <Mail className="h-5 w-5" />
                联系我们
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
