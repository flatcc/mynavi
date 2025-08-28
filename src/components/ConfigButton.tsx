import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ConfigButtonProps {
  layout: 'default' | 'compact';
  onLayoutChange: (layout: 'default' | 'compact') => void;
}

export const ConfigButton: React.FC<ConfigButtonProps> = ({ layout, onLayoutChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLayoutChange = (newLayout: 'default' | 'compact') => {
    onLayoutChange(newLayout);
    setIsOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div className="relative">
      {/* 配置按钮 */}
      <button
        onClick={toggleMenu}
        className="
          fixed top-4 right-4 z-50 w-12 h-12
          bg-white dark:bg-gray-800 rounded-full shadow-lg 
          border border-gray-200 dark:border-gray-700 
          hover:bg-gray-50 dark:hover:bg-gray-700 
          transition-all duration-200 ease-out
          hover:scale-110 hover:shadow-xl
          flex items-center justify-center
        "
        title="配置选项"
      >
        <i className="fas fa-cog text-gray-600 dark:text-gray-300 text-lg"></i>
      </button>

      {/* 配置菜单 */}
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 菜单内容 */}
          <div className="
            absolute top-20 right-4 z-50 w-64
            bg-white dark:bg-gray-800 rounded-lg shadow-xl
            border border-gray-200 dark:border-gray-700
            p-4
          ">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                配置选项
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* 布局选择 */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                卡片布局
              </label>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleLayoutChange('default')}
                  className={`
                    w-full flex items-center p-3 rounded-lg border-2 transition-all duration-200
                    ${layout === 'default'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }
                  `}
                >
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded mr-3"></div>
                  <div className="text-left">
                    <div className="font-medium">默认布局</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      大卡片，标签独立行，详细描述
                    </div>
                  </div>
                  {layout === 'default' && (
                    <i className="fas fa-check ml-auto text-blue-500"></i>
                  )}
                </button>

                <button
                  onClick={() => handleLayoutChange('compact')}
                  className={`
                    w-full flex items-center p-3 rounded-lg border-2 transition-all duration-200
                    ${layout === 'compact'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }
                  `}
                >
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded mr-3"></div>
                  <div className="text-left">
                    <div className="font-medium">紧凑布局</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      小卡片，标签同行，简洁描述
                    </div>
                  </div>
                  {layout === 'compact' && (
                    <i className="fas fa-check ml-auto text-blue-500"></i>
                  )}
                </button>
              </div>
            </div>

            {/* 分隔线 */}
            <div className="my-4 border-t border-gray-200 dark:border-gray-600"></div>

            {/* 深色模式配置 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">深色模式</span>
                <button
                  onClick={handleThemeToggle}
                  className="
                    relative w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer
                    transition-colors duration-200
                  "
                >
                  <span className={`
                    block w-4 h-4 bg-white rounded-full transform transition-transform duration-200
                    ${theme === 'dark' ? 'translate-x-5' : 'translate-x-1'}
                    translate-y-0.5
                  `}></span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
