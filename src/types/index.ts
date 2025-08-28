// 全局类型声明
declare global {
  interface Window {
    // 可以在这里添加全局window对象的扩展
  }
}

// 导出所有类型
export * from '../data/navigationData';
export * from '../contexts/ThemeContext';
