import React, { useState, useMemo, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentArea } from './components/ContentArea';
import { Footer } from './components/Footer';
import { ConfigButton } from './components/ConfigButton';
import { ThemeProvider } from './contexts/ThemeContext';
import { categories, navigationItems } from './data/navigationData';
import { searchItems } from './utils/search';

function AppContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [layout, setLayout] = useState<'default' | 'compact'>('default');

  // 搜索过滤
  const filteredItems = useMemo(() => {
    let items = navigationItems;
    
    // 如果选择了分类，先按分类过滤
    if (activeCategory) {
      items = items.filter(item => item.category === activeCategory);
    }
    
    // 如果有搜索查询，再进行搜索过滤
    if (searchQuery.trim()) {
      items = searchItems(items, searchQuery);
    }
    
    return items;
  }, [activeCategory, searchQuery]);

  // 使用useCallback优化函数性能
  const handleCategorySelect = useCallback((categoryId: string) => {
    const newCategory = categoryId || null;
    setActiveCategory(newCategory);
    setSearchQuery(''); // 清除搜索
    setIsMobileMenuOpen(false); // 关闭移动端菜单
    
    // 添加一些调试信息
    console.log('选择分类:', newCategory);
    
    // 如果选择了分类，轻微滚动到顶部，避免大幅偏移
    if (newCategory) {
      // 使用较小的滚动距离，避免页面大幅偏移
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > 100) {
        window.scrollTo({ top: 50, behavior: 'smooth' });
      }
    }
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setActiveCategory(null); // 清除分类选择
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const handleClearAll = useCallback(() => {
    setActiveCategory(null);
    setSearchQuery('');
  }, []);

  const handleLayoutChange = useCallback((newLayout: 'default' | 'compact') => {
    setLayout(newLayout);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 移动端菜单按钮 */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={handleMobileMenuToggle}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* 配置按钮 */}
      <ConfigButton layout={layout} onLayoutChange={handleLayoutChange} />

      <div className="flex">
        {/* 侧边栏 */}
        <Sidebar
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />

        {/* 主内容区域 */}
        <main className="flex-1 flex flex-col min-h-screen">
          <ContentArea
            items={filteredItems}
            categories={categories}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onCategorySelect={handleClearAll}
            layout={layout}
          />
          
          {/* 页脚 */}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
