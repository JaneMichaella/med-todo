import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';

/**
 * useDailyReset Hook
 * 检查日期变化并在新的一天时自动重置清单
 */
export function useDailyReset() {
  const initialize = useAppStore(state => state.initialize);

  useEffect(() => {
    // 初始化应用（加载药物和清单，包含日期检查）
    initialize();

    // 设置定时器，每分钟检查一次日期是否变化
    const interval = setInterval(() => {
      initialize();
    }, 60000); // 60秒

    return () => clearInterval(interval);
  }, [initialize]);
}
