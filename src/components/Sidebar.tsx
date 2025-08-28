import React from 'react';
import { Category } from '../data/navigationData';

interface SidebarProps {
  categories: Category[];
  activeCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  activeCategory,
  onCategorySelect,
  isMobileOpen,
  onMobileClose,
  searchQuery,
  onSearch
}) => {
  const handleCategoryClick = (categoryId: string) => {
    // 如果点击的是当前已选中的分类，则取消选择
    if (activeCategory === categoryId) {
      onCategorySelect('');
      return;
    }
    
    onCategorySelect(categoryId);
    
    // 添加点击反馈
    const button = document.querySelector(`[data-category="${categoryId}"]`) as HTMLElement;
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
    }
  };

  return (
    <>
      {/* 移动端遮罩 */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}
      
      {/* 侧边栏 */}
      <aside className={`
        fixed lg:sticky lg:top-0 inset-y-0 left-0 z-50
        w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:opacity-100
        ${isMobileOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 lg:opacity-100'}
        h-screen overflow-y-auto
      `}>
        {/* 移动端关闭按钮 */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">导航分类</h2>
          <button
            onClick={onMobileClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 搜索栏 */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索导航项..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="
                w-full px-3 py-2 pl-10 pr-3
                text-sm bg-gray-50 dark:bg-gray-800
                border border-gray-300 dark:border-gray-600
                rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                transition-colors duration-200
              "
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400 text-sm"></i>
            </div>
            {searchQuery && (
              <button
                onClick={() => onSearch('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            )}
          </div>
        </div>

        {/* 分类列表 */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              分类导航
            </h3>
            {activeCategory && (
              <button
                onClick={() => onCategorySelect('')}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                清除选择
              </button>
            )}
          </div>
          
          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                data-category={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  w-full flex items-center px-3 py-2 text-sm font-medium rounded-md 
                  transition-all duration-200 ease-out
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  active:scale-95
                  ${activeCategory === category.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                <i className={`${category.icon} w-5 h-5 mr-3 transition-colors duration-200`}></i>
                <span className="truncate">{category.name}</span>
                
                {/* 活跃状态指示器 */}
                {activeCategory === category.id && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* 底部信息 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            <p>共 {categories.length} 个分类</p>
            {activeCategory && (
              <p className="mt-1 text-blue-600 dark:text-blue-400">
                当前：{categories.find(c => c.id === activeCategory)?.name}
              </p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
