import { NavItem } from '../data/navigationData';

export const searchItems = (items: NavItem[], query: string): NavItem[] => {
  if (!query.trim()) {
    return items;
  }

  const searchTerm = query.toLowerCase().trim();
  
  return items.filter(item => {
    // 搜索标题
    if (item.title.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // 搜索描述
    if (item.description.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    // 搜索标签
    if (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
      return true;
    }
    
    // 搜索分类
    if (item.category.toLowerCase().includes(searchTerm)) {
      return true;
    }
    
    return false;
  });
};

export const highlightSearchTerm = (text: string, query: string): string => {
  if (!query.trim()) {
    return text;
  }
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>');
};
