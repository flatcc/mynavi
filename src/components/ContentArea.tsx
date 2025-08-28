import React, { useEffect, useRef } from 'react';
import { NavItem as NavItemType, Category } from '../data/navigationData';
import { NavItem } from './NavItem';

interface ContentAreaProps {
  items: NavItemType[];
  categories: Category[];
  activeCategory: string | null;
  searchQuery: string;
  onCategorySelect: (categoryId: string) => void;
  layout?: 'default' | 'compact';
}

export const ContentArea: React.FC<ContentAreaProps> = ({
  items,
  categories,
  activeCategory,
  searchQuery,
  onCategorySelect,
  layout = 'default'
}) => {
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // 滚动到指定分类
  useEffect(() => {
    if (activeCategory && categoryRefs.current[activeCategory]) {
      // 延迟滚动，确保DOM更新完成
      setTimeout(() => {
        const element = categoryRefs.current[activeCategory];
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  }, [activeCategory]);

  // 按分类分组项目
  const groupedItems = React.useMemo(() => {
    const groups: { [key: string]: NavItemType[] } = {};
    
    // 只包含有项目的分类
    items.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    
    return groups;
  }, [items]);

  // 如果没有搜索结果
  if (searchQuery && Object.keys(groupedItems).length === 0) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <i className="fas fa-search text-2xl text-gray-400"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            未找到相关结果
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            没有找到与 "{searchQuery}" 相关的导航项
          </p>
          <button
            onClick={() => onCategorySelect('')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            显示所有内容
          </button>
        </div>
      </div>
    );
  }

  // 如果选择了分类但没有内容
  if (activeCategory && Object.keys(groupedItems).length === 0) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <i className="fas fa-folder-open text-2xl text-gray-400"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            该分类暂无内容
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            分类 "{categories.find(c => c.id === activeCategory)?.name}" 中暂时没有导航项
          </p>
          <button
            onClick={() => onCategorySelect('')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            显示所有分类
          </button>
        </div>
      </div>
    );
  }

  // 如果没有任何内容
  if (Object.keys(groupedItems).length === 0 && !searchQuery && !activeCategory) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <i className="fas fa-inbox text-2xl text-gray-400"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            暂无内容
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            当前没有可显示的导航项
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      {/* 搜索结果提示 */}
      {searchQuery && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <i className="fas fa-search text-blue-600 dark:text-blue-400"></i>
              <span className="text-blue-800 dark:text-blue-200 font-medium">
                搜索结果：找到 {items.length} 个相关项目
              </span>
            </div>
            <button
              onClick={() => onCategorySelect('')}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              清除搜索
            </button>
          </div>
        </div>
      )}

      {/* 分类内容 */}
      {Object.entries(groupedItems).map(([categoryId, categoryItems]) => {
        const category = categories.find(c => c.id === categoryId);
        if (!category) return null;

        return (
          <div
            key={categoryId}
            ref={el => categoryRefs.current[categoryId] = el}
            className="mb-8 scroll-mt-8"
          >
            {/* 分类标题 */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <i className={`${category.icon} text-white text-sm`}></i>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {category.name}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {categoryItems.length}
              </span>
            </div>
            
            {/* 分类描述 */}
            {category.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-4 ml-11">
                {category.description}
              </p>
            )}

            {/* 导航项网格 */}
            <div className={`
              grid gap-4
              ${layout === 'compact' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }
            `}>
              {categoryItems.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  searchQuery={searchQuery}
                  layout={layout}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
