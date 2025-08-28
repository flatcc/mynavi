import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* 版权信息 */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} flatcc
          </div>
          
          {/* GitHub链接 */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/flatcc/mynavi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              title="查看源代码"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
