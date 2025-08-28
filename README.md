# 🚀 个人导航站点

一个简洁现代的个性化导航站点，帮助您更好地整理和访问您喜爱的资源。

<div align="center">

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-在线预览-blue?style=for-the-badge&logo=github)](https://flatcc.github.io/mynavi/)
[![English](https://img.shields.io/badge/English-英文文档-green?style=for-the-badge&logo=read-the-docs)](README_EN.md)

</div>

---

## ✨ 功能特性

- 🎯 **智能搜索** - 支持标题、描述、标签、分类的全文搜索
- 🏷️ **分类管理** - 清晰的分类标签，快速定位内容
- 🌓 **主题切换** - 支持浅色/深色模式，自动跟随系统设置
- 📱 **响应式设计** - 完美适配手机、平板、桌面设备
- ⚡ **性能优化** - 快速加载，流畅交互体验
- 🎨 **现代UI** - 参考Linear App的简约设计风格
- 🔄 **混合数据源** - 支持本地数据 + API请求的灵活配置
- ⚙️ **布局配置** - 支持默认和紧凑两种卡片布局模式

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **样式框架**: TailwindCSS 3.0+
- **图标库**: Font Awesome 6.4.0
- **构建工具**: Vite 4.4.0
- **状态管理**: React Context + Hooks
- **包管理器**: pnpm

## 🚀 快速开始

### 环境要求

- Node.js 16.0+
- pnpm 8.0+

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 📁 项目结构

```
mynavi/
├── src/
│   ├── components/          # React组件
│   │   ├── Sidebar.tsx     # 左侧导航栏（包含搜索功能）
│   │   ├── NavItem.tsx     # 导航项卡片（支持两种布局）
│   │   ├── ContentArea.tsx # 内容展示区域
│   │   ├── ConfigButton.tsx # 配置按钮（布局切换）
│   │   └── Footer.tsx      # 页脚组件
│   ├── contexts/           # React Context
│   │   └── ThemeContext.tsx # 主题管理
│   ├── data/               # 数据配置
│   │   ├── navigationData.ts # 本地导航数据
│   │   └── api.ts          # API请求配置
│   ├── utils/              # 工具函数
│   │   ├── search.ts       # 搜索功能
│   │   └── dataManager.ts  # 数据管理器
│   ├── types/              # TypeScript类型
│   ├── App.tsx             # 主应用组件
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── index.html              # HTML模板
├── package.json            # 项目配置
├── vite.config.js          # Vite配置
├── env.example             # 环境变量配置示例
└── README.md               # 项目说明
```

## 🎨 自定义配置

### 修改导航数据

编辑 `src/data/navigationData.ts` 文件：

```typescript
export const navigationItems: NavItem[] = [
  {
    id: 'your-item',
    title: '你的标题',
    description: '你的描述',
    url: 'https://your-url.com',
    icon: 'fas fa-star', // Font Awesome图标类名
    category: 'development', // 分类ID
    tags: ['标签1', '标签2']
  }
];
```

### 修改分类

```typescript
export const categories: Category[] = [
  {
    id: 'your-category',
    name: '你的分类名',
    description: '分类描述',
    icon: 'fas fa-folder'
  }
];
```

### 修改作者信息

编辑 `src/components/Footer.tsx` 文件中的社交媒体链接和作者信息。

## 🔄 混合数据源配置

项目支持本地数据 + API请求的混合方式，可以根据需要灵活配置。

### 1. 本地数据配置

本地数据存储在 `src/data/navigationData.ts` 文件中，适合：
- 固定的、不经常变化的链接
- 离线访问需求
- 快速开发和测试

```typescript
// src/data/navigationData.ts
export const navigationItems: NavItem[] = [
  // 你的本地数据
];

export const categories: Category[] = [
  // 你的本地分类
];
```

### 2. API请求配置

创建 `src/data/api.ts` 文件配置API请求：

```typescript
// src/data/api.ts
export interface ApiConfig {
  baseUrl: string;
  endpoints: {
    categories: string;
    navigationItems: string;
  };
  headers?: Record<string, string>;
}

export const apiConfig: ApiConfig = {
  baseUrl: 'https://your-api-domain.com/api',
  endpoints: {
    categories: '/categories',
    navigationItems: '/navigation-items'
  },
  headers: {
    'Content-Type': 'application/json',
    // 如果需要认证
    // 'Authorization': 'Bearer your-token'
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.categories}`, {
      headers: apiConfig.headers
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('获取分类失败:', error);
    // 返回空数组或默认分类
    return [];
  }
};

export const fetchNavigationItems = async (): Promise<NavItem[]> => {
  try {
    const response = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.navigationItems}`, {
      headers: apiConfig.headers
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('获取导航项失败:', error);
    // 返回空数组或默认数据
    return [];
  }
};
```

### 3. 数据管理器

创建 `src/utils/dataManager.ts` 文件统一管理数据：

```typescript
// src/utils/dataManager.ts
import { categories as localCategories, navigationItems as localItems } from '../data/navigationData';
import { fetchCategories, fetchNavigationItems } from '../data/api';

export interface DataSource {
  type: 'local' | 'api' | 'hybrid';
  priority: 'local' | 'api';
}

export const dataSource: DataSource = {
  type: 'hybrid', // 'local' | 'api' | 'hybrid'
  priority: 'local' // 'local' | 'api'
};

export class DataManager {
  private static instance: DataManager;
  private categories: Category[] = [];
  private navigationItems: NavItem[] = [];
  private isLoading = false;

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  async initialize(): Promise<void> {
    this.isLoading = true;
    
    try {
      if (dataSource.type === 'local') {
        // 只使用本地数据
        this.categories = localCategories;
        this.navigationItems = localItems;
      } else if (dataSource.type === 'api') {
        // 只使用API数据
        this.categories = await fetchCategories();
        this.navigationItems = await fetchNavigationItems();
      } else if (dataSource.type === 'hybrid') {
        // 混合模式
        if (dataSource.priority === 'local') {
          // 本地优先，API作为补充
          this.categories = [...localCategories];
          this.navigationItems = [...localItems];
          
          // 异步获取API数据并合并
          this.loadApiData();
        } else {
          // API优先，本地作为备用
          try {
            this.categories = await fetchCategories();
            this.navigationItems = await fetchNavigationItems();
          } catch (error) {
            console.warn('API请求失败，使用本地数据:', error);
            this.categories = localCategories;
            this.navigationItems = localItems;
          }
        }
      }
    } catch (error) {
      console.error('数据初始化失败:', error);
      // 降级到本地数据
      this.categories = localCategories;
      this.navigationItems = localItems;
    } finally {
      this.isLoading = false;
    }
  }

  private async loadApiData(): Promise<void> {
    try {
      const [apiCategories, apiItems] = await Promise.all([
        fetchCategories(),
        fetchNavigationItems()
      ]);
      
      // 合并数据，API数据覆盖本地数据
      this.mergeData(apiCategories, apiItems);
    } catch (error) {
      console.warn('API数据加载失败:', error);
    }
  }

  private mergeData(apiCategories: Category[], apiItems: NavItem[]): void {
    // 合并分类
    const categoryMap = new Map();
    localCategories.forEach(cat => categoryMap.set(cat.id, cat));
    apiCategories.forEach(cat => categoryMap.set(cat.id, cat));
    this.categories = Array.from(categoryMap.values());

    // 合并导航项
    const itemMap = new Map();
    localItems.forEach(item => itemMap.set(item.id, item));
    apiItems.forEach(item => itemMap.set(item.id, item));
    this.navigationItems = Array.from(itemMap.values());
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getNavigationItems(): NavItem[] {
    return this.navigationItems;
  }

  isLoading(): boolean {
    return this.isLoading;
  }

  // 手动刷新数据
  async refresh(): Promise<void> {
    await this.initialize();
  }
}

export const dataManager = DataManager.getInstance();
```

### 4. 在应用中使用

修改 `src/App.tsx` 文件使用数据管理器：

```typescript
// src/App.tsx
import { useEffect, useState } from 'react';
import { dataManager } from './utils/dataManager';

function AppContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [navigationItems, setNavigationItems] = useState<NavItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // ... 其他状态

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      await dataManager.initialize();
      
      setCategories(dataManager.getCategories());
      setNavigationItems(dataManager.getNavigationItems());
      setIsLoading(false);
    };

    initializeData();
  }, []);

  // 如果正在加载，显示加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">正在加载数据...</p>
        </div>
      </div>
    );
  }

  // ... 其余组件逻辑
}
```

### 5. 环境变量配置

创建 `.env` 文件配置API地址：

```bash
# .env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_API_TIMEOUT=10000
VITE_DATA_SOURCE=hybrid
VITE_DATA_PRIORITY=local
```

### 6. 数据源配置选项

在 `src/utils/dataManager.ts` 中可以根据环境变量动态配置：

```typescript
const getDataSourceConfig = (): DataSource => {
  const source = import.meta.env.VITE_DATA_SOURCE || 'hybrid';
  const priority = import.meta.env.VITE_DATA_PRIORITY || 'local';
  
  return {
    type: source as 'local' | 'api' | 'hybrid',
    priority: priority as 'local' | 'api'
  };
};
```

## 🎨 布局配置

项目支持两种卡片布局模式：

### 默认布局
- 大卡片设计，适合详细浏览
- 标签独立行显示
- 详细描述文字
- 底部显示"点击访问"提示
- 支持最多3列布局

### 紧凑布局
- 小卡片设计，节省空间
- 只显示图标、标题和描述
- 不显示标签，界面更简洁
- 右侧显示访问图标
- 支持最多6列布局（响应式）

### 切换布局
点击右上角的配置按钮（齿轮图标）可以切换布局模式。

## 🌈 主题定制

### 颜色方案

项目使用TailwindCSS的默认颜色系统，支持深色模式。可以通过修改 `index.html` 中的TailwindCSS配置来自定义颜色。

### 图标

项目使用Font Awesome图标库，可以通过修改组件中的 `icon` 属性来更换图标。

## 📱 响应式设计

- **移动端 (< 640px)**: 侧边栏折叠为抽屉式菜单
- **平板 (640px - 1024px)**: 适中的布局和字体大小
- **桌面 (> 1024px)**: 完整的侧边栏和内容展示

## 🔍 搜索功能

搜索支持以下字段：
- 标题
- 描述
- 标签
- 分类

搜索具有防抖功能，输入300ms后自动执行搜索。

## 🎯 性能优化

- 使用React.memo优化组件渲染
- 搜索防抖减少不必要的计算
- 懒加载和虚拟滚动支持
- 图片WebP格式优化
- 数据缓存和智能合并

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [React](https://reactjs.org/) - 前端框架
- [TailwindCSS](https://tailwindcss.com/) - CSS框架
- [Font Awesome](https://fontawesome.com/) - 图标库
- [Vite](https://vitejs.dev/) - 构建工具

## 📞 联系方式

- 作者: flatcc
- GitHub: [@flatcc](https://github.com/flatcc)

---

⭐ 如果这个项目对您有帮助，请给它一个星标！
