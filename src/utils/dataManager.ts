import { categories as localCategories, navigationItems as localItems, Category, NavItem } from '../data/navigationData';
import { fetchCategories, fetchNavigationItems, getApiStatus } from '../data/api';

export interface DataSource {
  type: 'local' | 'api' | 'hybrid';
  priority: 'local' | 'api';
}

export interface DataStatus {
  isLoading: boolean;
  lastUpdated: Date | null;
  apiStatus: {
    isHealthy: boolean;
    responseTime: number;
    lastChecked: Date;
  } | null;
  error: string | null;
}

export const dataSource: DataSource = {
  type: (import.meta.env.VITE_DATA_SOURCE as 'local' | 'api' | 'hybrid') || 'hybrid',
  priority: (import.meta.env.VITE_DATA_PRIORITY as 'local' | 'api') || 'local'
};

export class DataManager {
  private static instance: DataManager;
  private categories: Category[] = [];
  private navigationItems: NavItem[] = [];
  private status: DataStatus = {
    isLoading: false,
    lastUpdated: null,
    apiStatus: null,
    error: null
  };
  private updateCallbacks: Array<() => void> = [];

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  // 订阅数据更新
  subscribe(callback: () => void): () => void {
    this.updateCallbacks.push(callback);
    return () => {
      const index = this.updateCallbacks.indexOf(callback);
      if (index > -1) {
        this.updateCallbacks.splice(index, 1);
      }
    };
  }

  // 通知订阅者数据已更新
  private notifyUpdate(): void {
    this.updateCallbacks.forEach(callback => callback());
  }

  async initialize(): Promise<void> {
    this.status.isLoading = true;
    this.status.error = null;
    
    try {
      console.log(`初始化数据源: ${dataSource.type}, 优先级: ${dataSource.priority}`);
      
      if (dataSource.type === 'local') {
        // 只使用本地数据
        this.categories = [...localCategories];
        this.navigationItems = [...localItems];
        console.log('使用本地数据模式');
      } else if (dataSource.type === 'api') {
        // 只使用API数据
        await this.loadApiData();
        console.log('使用API数据模式');
      } else if (dataSource.type === 'hybrid') {
        // 混合模式
        if (dataSource.priority === 'local') {
          // 本地优先，API作为补充
          this.categories = [...localCategories];
          this.navigationItems = [...localItems];
          console.log('使用混合模式：本地优先');
          
          // 异步获取API数据并合并
          this.loadApiDataInBackground();
        } else {
          // API优先，本地作为备用
          try {
            await this.loadApiData();
            console.log('使用混合模式：API优先');
          } catch (error) {
            console.warn('API请求失败，降级到本地数据:', error);
            this.categories = [...localCategories];
            this.navigationItems = [...localItems];
            this.status.error = 'API请求失败，使用本地数据';
          }
        }
      }
      
      this.status.lastUpdated = new Date();
      this.notifyUpdate();
      
    } catch (error) {
      console.error('数据初始化失败:', error);
      this.status.error = error instanceof Error ? error.message : '未知错误';
      
      // 降级到本地数据
      this.categories = [...localCategories];
      this.navigationItems = [...localItems];
      this.notifyUpdate();
    } finally {
      this.status.isLoading = false;
    }
  }

  private async loadApiData(): Promise<void> {
    try {
      // 检查API状态
      const apiStatus = await getApiStatus();
      this.status.apiStatus = apiStatus;
      
      if (!apiStatus.isHealthy) {
        throw new Error('API服务不可用');
      }
      
      // 并行获取分类和导航项
      const [apiCategories, apiItems] = await Promise.all([
        fetchCategories(),
        fetchNavigationItems()
      ]);
      
      if (apiCategories.length > 0) {
        this.categories = apiCategories;
      }
      
      if (apiItems.length > 0) {
        this.navigationItems = apiItems;
      }
      
    } catch (error) {
      console.error('加载API数据失败:', error);
      throw error;
    }
  }

  private async loadApiDataInBackground(): Promise<void> {
    // 在后台异步加载API数据，不阻塞UI
    this.loadApiData().then(() => {
      console.log('后台API数据加载完成');
      this.notifyUpdate();
    }).catch((error) => {
      console.warn('后台API数据加载失败:', error);
    });
  }

  // 手动刷新数据
  async refresh(): Promise<void> {
    console.log('手动刷新数据...');
    await this.initialize();
  }

  // 切换到不同的数据源
  async switchDataSource(type: DataSource['type'], priority?: DataSource['priority']): Promise<void> {
    dataSource.type = type;
    if (priority) {
      dataSource.priority = priority;
    }
    
    console.log(`切换到数据源: ${type}, 优先级: ${dataSource.priority}`);
    await this.initialize();
  }

  // 获取数据
  getCategories(): Category[] {
    return this.categories;
  }

  getNavigationItems(): NavItem[] {
    return this.navigationItems;
  }

  // 获取状态
  getStatus(): DataStatus {
    return { ...this.status };
  }

  // 获取数据源配置
  getDataSourceConfig(): DataSource {
    return { ...dataSource };
  }

  // 检查是否有更新
  async checkForUpdates(): Promise<boolean> {
    if (dataSource.type === 'local') {
      return false; // 本地数据不会有更新
    }
    
    try {
      const [apiCategories, apiItems] = await Promise.all([
        fetchCategories(),
        fetchNavigationItems()
      ]);
      
      // 简单的更新检查：比较数量或时间戳
      const hasUpdates = 
        apiCategories.length !== this.categories.length ||
        apiItems.length !== this.navigationItems.length;
      
      if (hasUpdates) {
        console.log('检测到数据更新');
        await this.initialize();
        return true;
      }
      
      return false;
    } catch (error) {
      console.warn('检查更新失败:', error);
      return false;
    }
  }

  // 获取数据统计信息
  getDataStats(): {
    totalCategories: number;
    totalItems: number;
    dataSource: string;
    lastUpdated: string | null;
    apiHealth: string;
  } {
    return {
      totalCategories: this.categories.length,
      totalItems: this.navigationItems.length,
      dataSource: `${dataSource.type} (${dataSource.priority}优先)`,
      lastUpdated: this.status.lastUpdated?.toLocaleString() || null,
      apiHealth: this.status.apiStatus?.isHealthy ? '健康' : '异常'
    };
  }
}

export const dataManager = DataManager.getInstance();

// 导出便捷函数
export const useDataManager = () => {
  return {
    getCategories: () => dataManager.getCategories(),
    getNavigationItems: () => dataManager.getNavigationItems(),
    getStatus: () => dataManager.getStatus(),
    refresh: () => dataManager.refresh(),
    checkForUpdates: () => dataManager.checkForUpdates(),
    getDataStats: () => dataManager.getDataStats(),
    switchDataSource: (type: DataSource['type'], priority?: DataSource['priority']) => 
      dataManager.switchDataSource(type, priority)
  };
};
