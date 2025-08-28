import { Category, NavItem } from './navigationData';

export interface ApiConfig {
  baseUrl: string;
  endpoints: {
    categories: string;
    navigationItems: string;
  };
  headers?: Record<string, string>;
  timeout?: number;
}

export const apiConfig: ApiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://your-api-domain.com/api',
  endpoints: {
    categories: '/categories',
    navigationItems: '/navigation-items'
  },
  headers: {
    'Content-Type': 'application/json',
    // 如果需要认证，取消注释下面的行
    // 'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
  },
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000')
};

// 创建带超时的fetch请求
const fetchWithTimeout = async (url: string, options: RequestInit, timeout: number): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('请求超时');
    }
    throw error;
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetchWithTimeout(
      `${apiConfig.baseUrl}${apiConfig.endpoints.categories}`,
      {
        method: 'GET',
        headers: apiConfig.headers
      },
      apiConfig.timeout!
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 验证数据格式
    if (Array.isArray(data) && data.every(item => 
      item.id && item.name && item.description && item.icon
    )) {
      return data;
    } else {
      throw new Error('API返回的数据格式不正确');
    }
  } catch (error) {
    console.error('获取分类失败:', error);
    // 返回空数组，让数据管理器使用本地数据
    return [];
  }
};

export const fetchNavigationItems = async (): Promise<NavItem[]> => {
  try {
    const response = await fetchWithTimeout(
      `${apiConfig.baseUrl}${apiConfig.endpoints.navigationItems}`,
      {
        method: 'GET',
        headers: apiConfig.headers
      },
      apiConfig.timeout!
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 验证数据格式
    if (Array.isArray(data) && data.every(item => 
      item.id && item.title && item.description && item.url && item.icon && item.category
    )) {
      return data;
    } else {
      throw new Error('API返回的数据格式不正确');
    }
  } catch (error) {
    console.error('获取导航项失败:', error);
    // 返回空数组，让数据管理器使用本地数据
    return [];
  }
};

// 健康检查
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetchWithTimeout(
      `${apiConfig.baseUrl}/health`,
      { method: 'GET' },
      5000
    );
    return response.ok;
  } catch (error) {
    console.warn('API健康检查失败:', error);
    return false;
  }
};

// 获取API状态信息
export const getApiStatus = async (): Promise<{
  isHealthy: boolean;
  responseTime: number;
  lastChecked: Date;
}> => {
  const startTime = Date.now();
  const isHealthy = await checkApiHealth();
  const responseTime = Date.now() - startTime;
  
  return {
    isHealthy,
    responseTime,
    lastChecked: new Date()
  };
};
