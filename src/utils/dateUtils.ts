import { format } from 'date-fns';

/**
 * 日期工具函数
 */

// 获取当前日期 (YYYY-MM-DD)
export function getCurrentDate(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

// 格式化显示日期 (2026年2月8日)
export function formatDisplayDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'yyyy年M月d日');
}

// 格式化时间 (HH:mm)
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'HH:mm');
}

// 检查是否是新的一天
export function isNewDay(lastDate: string | null, currentDate: string): boolean {
  if (!lastDate) {
    return true; // 第一次打开应用
  }
  return lastDate !== currentDate;
}

// 获取当前时段 (早上/中午/晚上)
export function getCurrentTiming(): 'morning' | 'afternoon' | 'evening' {
  const hour = new Date().getHours();

  if (hour >= 7 && hour < 11) {
    return 'morning';
  } else if (hour >= 11 && hour < 17) {
    return 'afternoon';
  } else {
    return 'evening';
  }
}
