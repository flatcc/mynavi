# 🚀 Personal Navigation Site

A clean and modern personal navigation site that helps you better organize and access your favorite resources.

<div align="center">

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Preview-blue?style=for-the-badge&logo=github)](https://flatcc.github.io/mynavi/)
[![中文](https://img.shields.io/badge/中文-中文文档-red?style=for-the-badge&logo=read-the-docs)](README.md)

</div>

---

## ✨ Features

- 🎯 **Smart Search** - Full-text search supporting title, description, tags, and categories
- 🏷️ **Category Management** - Clear category tags for quick content location
- 🌓 **Theme Switching** - Light/dark mode support with automatic system preference detection
- 📱 **Responsive Design** - Perfect display on mobile, tablet, and desktop devices
- ⚡ **Performance Optimized** - Fast loading with smooth interaction experience
- 🎨 **Modern UI** - Clean design inspired by Linear App
- 🔄 **Hybrid Data Source** - Flexible configuration supporting local data + API requests
- ⚙️ **Layout Configuration** - Support for default and compact card layout modes

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Styling Framework**: TailwindCSS 3.0+
- **Icon Library**: Font Awesome 6.4.0
- **Build Tool**: Vite 4.4.0
- **State Management**: React Context + Hooks
- **Package Manager**: pnpm

## 🚀 Quick Start

### Requirements

- Node.js 16.0+
- pnpm 8.0+

### Install Dependencies

```bash
pnpm install
```

### Start Development Server

```bash
pnpm dev
```

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## 📁 Project Structure

```
mynavi/
├── src/
│   ├── components/          # React Components
│   │   ├── Sidebar.tsx     # Left Navigation Bar (includes search)
│   │   ├── NavItem.tsx     # Navigation Item Cards (supports two layouts)
│   │   ├── ContentArea.tsx # Content Display Area
│   │   ├── ConfigButton.tsx # Configuration Button (layout switching)
│   │   └── Footer.tsx      # Footer Component
│   ├── contexts/           # React Contexts
│   │   └── ThemeContext.tsx # Theme Management
│   ├── data/               # Data Configuration
│   │   ├── navigationData.ts # Local Navigation Data
│   │   └── api.ts          # API Request Configuration
│   ├── utils/              # Utility Functions
│   │   ├── search.ts       # Search Functionality
│   │   └── dataManager.ts  # Data Manager
│   ├── types/              # TypeScript Types
│   ├── App.tsx             # Main Application Component
│   ├── main.tsx            # Application Entry Point
│   └── index.css           # Global Styles
├── index.html              # HTML Template
├── package.json            # Project Configuration
├── vite.config.js          # Vite Configuration
├── env.example             # Environment Variables Example
└── README.md               # Project Documentation
```

## 🎨 Customization

### Modify Navigation Data

Edit the `src/data/navigationData.ts` file:

```typescript
export const navigationItems: NavItem[] = [
  {
    id: 'your-item',
    title: 'Your Title',
    description: 'Your Description',
    url: 'https://your-url.com',
    icon: 'fas fa-star', // Font Awesome icon class name
    category: 'development', // Category ID
    tags: ['Tag1', 'Tag2']
  }
];
```

### Modify Categories

```typescript
export const categories: Category[] = [
  {
    id: 'your-category',
    name: 'Your Category Name',
    description: 'Category Description',
    icon: 'fas fa-folder'
  }
];
```

### Modify Author Information

Edit the social media links and author information in `src/components/Footer.tsx`.

## 🔄 Hybrid Data Source Configuration

The project supports a hybrid approach of local data + API requests, which can be flexibly configured as needed.

### 1. Local Data Configuration

Local data is stored in the `src/data/navigationData.ts` file, suitable for:
- Fixed links that don't change frequently
- Offline access requirements
- Rapid development and testing

```typescript
// src/data/navigationData.ts
export const navigationItems: NavItem[] = [
  // Your local data
];

export const categories: Category[] = [
  // Your local categories
];
```

### 2. API Request Configuration

Create the `src/data/api.ts` file to configure API requests:

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
    // If authentication is needed
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
    console.error('Failed to fetch categories:', error);
    // Return empty array to let data manager use local data
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
    console.error('Failed to fetch navigation items:', error);
    // Return empty array to let data manager use local data
    return [];
  }
};
```

### 3. Data Manager

Create the `src/utils/dataManager.ts` file to unify data management:

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
        // Use only local data
        this.categories = localCategories;
        this.navigationItems = localItems;
      } else if (dataSource.type === 'api') {
        // Use only API data
        this.categories = await fetchCategories();
        this.navigationItems = await fetchNavigationItems();
      } else if (dataSource.type === 'hybrid') {
        // Hybrid mode
        if (dataSource.priority === 'local') {
          // Local priority, API as supplement
          this.categories = [...localCategories];
          this.navigationItems = [...localItems];
          
          // Asynchronously fetch API data and merge
          this.loadApiData();
        } else {
          // API priority, local as backup
          try {
            this.categories = await fetchCategories();
            this.navigationItems = await fetchNavigationItems();
          } catch (error) {
            console.warn('API request failed, using local data:', error);
            this.categories = localCategories;
            this.navigationItems = localItems;
          }
        }
      }
    } catch (error) {
      console.error('Data initialization failed:', error);
      // Fallback to local data
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
      
      // Merge data, API data overwrites local data
      this.mergeData(apiCategories, apiItems);
    } catch (error) {
      console.warn('API data loading failed:', error);
    }
  }

  private mergeData(apiCategories: Category[], apiItems: NavItem[]): void {
    // Merge categories
    const categoryMap = new Map();
    localCategories.forEach(cat => categoryMap.set(cat.id, cat));
    apiCategories.forEach(cat => categoryMap.set(cat.id, cat));
    this.categories = Array.from(categoryMap.values());

    // Merge navigation items
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

  // Manual data refresh
  async refresh(): Promise<void> {
    await this.initialize();
  }
}

export const dataManager = DataManager.getInstance();
```

### 4. Use in Application

Modify the `src/App.tsx` file to use the data manager:

```typescript
// src/App.tsx
import { useEffect, useState } from 'react';
import { dataManager } from './utils/dataManager';

function AppContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [navigationItems, setNavigationItems] = useState<NavItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // ... other states

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

  // Show loading state if loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading data...</p>
        </div>
      </div>
    );
  }

  // ... rest of component logic
}
```

### 5. Environment Variables Configuration

Create a `.env` file to configure API addresses:

```bash
# .env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_API_TIMEOUT=10000
VITE_DATA_SOURCE=hybrid
VITE_DATA_PRIORITY=local
```

### 6. Data Source Configuration Options

In `src/utils/dataManager.ts`, you can dynamically configure based on environment variables:

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

## 🎨 Layout Configuration

The project supports two card layout modes:

### Default Layout
- Large card design, suitable for detailed browsing
- Tags displayed on separate lines
- Detailed description text
- Bottom shows "Click to Visit" prompt
- Supports up to 3 columns

### Compact Layout
- Small card design, saves space
- Only displays icon, title, and description
- No tags, cleaner interface
- Right side shows access icon
- Supports up to 5 columns (responsive)

### Switch Layout
Click the configuration button (gear icon) in the top right corner to switch layout modes.

## 🌈 Theme Customization

### Color Scheme

The project uses TailwindCSS's default color system with dark mode support. You can customize colors by modifying the TailwindCSS configuration in `index.html`.

### Icons

The project uses the Font Awesome icon library. You can change icons by modifying the `icon` property in components.

## 📱 Responsive Design

- **Mobile (< 640px)**: Sidebar collapses into drawer menu
- **Tablet (640px - 1024px)**: Moderate layout and font sizes
- **Desktop (> 1024px)**: Complete sidebar and content display

## 🔍 Search Functionality

Search supports the following fields:
- Title
- Description
- Tags
- Category

Search has debounce functionality, automatically executing search 300ms after input.

## 🎯 Performance Optimization

- Uses React.memo to optimize component rendering
- Search debounce reduces unnecessary calculations
- Lazy loading and virtual scrolling support
- WebP format image optimization
- Data caching and intelligent merging

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Font Awesome](https://fontawesome.com/) - Icon library
- [Vite](https://vitejs.dev/) - Build tool

## 📞 Contact

- Author: flatcc
- GitHub: [@flatcc](https://github.com/flatcc)

---

⭐ If this project helps you, please give it a star!
