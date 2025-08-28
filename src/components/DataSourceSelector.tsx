import React, { useState, useEffect } from 'react';
import { useDataManager, DataSource } from '../utils/dataManager';

export const DataSourceSelector: React.FC = () => {
  const { getStatus, getDataStats, switchDataSource, refresh } = useDataManager();
  const [status, setStatus] = useState(getStatus());
  const [stats, setStats] = useState(getDataStats());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = dataManager.subscribe(() => {
      setStatus(getStatus());
      setStats(getDataStats());
    });

    return unsubscribe;
  }, []);

  const handleDataSourceChange = async (type: DataSource['type'], priority?: DataSource['priority']) => {
    try {
      await switchDataSource(type, priority);
    } catch (error) {
      console.error('切换数据源失败:', error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          数据源配置
        </h3>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          {isRefreshing ? '刷新中...' : '刷新数据'}
        </button>
      </div>

      {/* 数据源选择 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            数据源类型
          </label>
          <select
            value={stats.dataSource.split(' ')[0]}
            onChange={(e) => {
              const type = e.target.value as DataSource['type'];
              const priority = type === 'hybrid' ? 'local' : undefined;
              handleDataSourceChange(type, priority);
            }}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="local">本地数据</option>
            <option value="api">API数据</option>
            <option value="hybrid">混合模式</option>
          </select>
        </div>

        {stats.dataSource.includes('hybrid') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              优先级
            </label>
            <select
              value={stats.dataSource.includes('local优先') ? 'local' : 'api'}
              onChange={(e) => {
                const priority = e.target.value as 'local' | 'api';
                handleDataSourceChange('hybrid', priority);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="local">本地优先</option>
              <option value="api">API优先</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            API状态
          </label>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${status.apiStatus?.isHealthy ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {status.apiStatus?.isHealthy ? '健康' : '异常'}
            </span>
          </div>
        </div>
      </div>

      {/* 数据统计 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.totalCategories}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">分类数量</div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.totalItems}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">导航项数量</div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {stats.dataSource}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">数据源</div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleTimeString() : '未更新'}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">最后更新</div>
        </div>
      </div>

      {/* 状态信息 */}
      {status.error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <i className="fas fa-exclamation-triangle text-red-500"></i>
            <span className="text-red-700 dark:text-red-300 text-sm">
              错误: {status.error}
            </span>
          </div>
        </div>
      )}

      {status.isLoading && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span className="text-blue-700 dark:text-blue-300 text-sm">
              正在加载数据...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
