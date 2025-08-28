import React from 'react';
import { NavItem as NavItemType } from '../data/navigationData';

interface NavItemProps {
  item: NavItemType;
  searchQuery?: string;
  layout?: 'default' | 'compact';
}

export const NavItem: React.FC<NavItemProps> = ({ 
  item, 
  searchQuery = '', 
  layout = 'default' 
}) => {
  const handleClick = () => {
    window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  // 高亮搜索关键词
  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>');
  };

  // 紧凑布局
  if (layout === 'compact') {
    return (
      <div
        onClick={handleClick}
        className="
          group cursor-pointer bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700
          p-3 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600
          transform hover:scale-102 transition-all duration-200 ease-out
          hover:bg-blue-50 dark:hover:bg-gray-700
        "
      >
        {/* 图标、标题和描述在同一行 */}
        <div className="flex items-center space-x-3">
          <div className="
            flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600
            flex items-center justify-center text-white text-sm
            group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-200
          ">
            <i className={item.icon}></i>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 
              className="text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate"
              dangerouslySetInnerHTML={{ __html: highlightText(item.title) }}
            />
            
            {/* 描述文字 - 单行显示 */}
            <p 
              className="
                text-xs text-gray-600 dark:text-gray-400
                truncate group-hover:text-gray-700 dark:group-hover:text-gray-300
                transition-colors duration-200
              "
              dangerouslySetInnerHTML={{ __html: highlightText(item.description) }}
              title={item.description}
            />
          </div>
          
          {/* 访问图标 */}
          <div className="
            opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0
            transition-all duration-200 text-blue-500 flex-shrink-0
          ">
            <i className="fas fa-external-link-alt text-sm"></i>
          </div>
        </div>
      </div>
    );
  }

  // 默认布局
  return (
    <div
      onClick={handleClick}
      className="
        group cursor-pointer bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
        p-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600
        transform hover:scale-105 transition-all duration-200 ease-out
        hover:bg-blue-50 dark:hover:bg-gray-700
      "
    >
      {/* 图标和标题 */}
      <div className="flex items-start space-x-3 mb-3">
        <div className="
          flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600
          flex items-center justify-center text-white text-lg
          group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-200
        ">
          <i className={item.icon}></i>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 
            className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate"
            dangerouslySetInnerHTML={{ __html: highlightText(item.title) }}
          />
          
          {/* 标签 */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {item.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="
                    inline-block px-2 py-1 text-xs font-medium
                    bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300
                    rounded-full
                  "
                >
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="inline-block px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                  +{item.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 描述 */}
      <p 
        className="
          text-sm text-gray-600 dark:text-gray-400 leading-relaxed
          line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300
          transition-colors duration-200
        "
        dangerouslySetInnerHTML={{ __html: highlightText(item.description) }}
      />

      {/* 底部操作区 */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <i className="fas fa-external-link-alt"></i>
          <span>点击访问</span>
        </div>
        
        <div className="
          opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0
          transition-all duration-200
        ">
          <i className="fas fa-arrow-right text-blue-500"></i>
        </div>
      </div>
    </div>
  );
};
