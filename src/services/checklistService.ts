import { type DailyChecklistItem, type Medicine, STORAGE_KEYS } from '../types';
import { getStorageItem, setStorageItem } from './storage';
import { generateDailyChecklist } from '../utils/checklistGenerator';
import { getCurrentDate } from '../utils/dateUtils';

/**
 * 清单服务 - Daily checklist logic
 */

// 获取每日清单
export async function getChecklist(date: string): Promise<DailyChecklistItem[]> {
  const checklist = await getStorageItem<DailyChecklistItem[]>(STORAGE_KEYS.CHECKLIST);
  if (!checklist) {
    return [];
  }
  // 只返回当前日期的清单
  return checklist.filter(item => item.date === date);
}

// 保存每日清单
export async function saveChecklist(checklist: DailyChecklistItem[]): Promise<void> {
  await setStorageItem(STORAGE_KEYS.CHECKLIST, checklist);
}

// 更新清单项目（打勾/取消打勾）
export async function updateChecklistItem(
  medicineId: string,
  date: string,
  timing: 'morning' | 'afternoon' | 'evening',
  instanceIndex: number,
  completed: boolean
): Promise<void> {
  const checklist = await getStorageItem<DailyChecklistItem[]>(STORAGE_KEYS.CHECKLIST);
  if (!checklist) {
    return;
  }

  const index = checklist.findIndex(
    item =>
      item.medicineId === medicineId &&
      item.date === date &&
      item.timing === timing &&
      item.instanceIndex === instanceIndex
  );

  if (index !== -1) {
    checklist[index].completed = completed;
    if (completed) {
      checklist[index].completedAt = new Date().toISOString();
    } else {
      delete checklist[index].completedAt;
    }

    await saveChecklist(checklist);
  }
}

// 获取上次活跃日期
export async function getLastActiveDate(): Promise<string | null> {
  return await getStorageItem<string>(STORAGE_KEYS.LAST_DATE);
}

// 设置上次活跃日期
export async function setLastActiveDate(date: string): Promise<void> {
  await setStorageItem(STORAGE_KEYS.LAST_DATE, date);
}

// 生成并保存新的每日清单
export async function resetDailyChecklist(
  date: string,
  medicines: Medicine[]
): Promise<DailyChecklistItem[]> {
  const newChecklist = generateDailyChecklist(date, medicines);
  await saveChecklist(newChecklist);
  await setLastActiveDate(date);
  return newChecklist;
}

// 检查并重置每日清单（如果需要）
export async function checkAndResetDaily(
  medicines: Medicine[]
): Promise<DailyChecklistItem[]> {
  const today = getCurrentDate();
  const lastDate = await getLastActiveDate();

  if (lastDate !== today) {
    // 新的一天，重置清单
    return await resetDailyChecklist(today, medicines);
  } else {
    // 同一天，加载现有清单
    return await getChecklist(today);
  }
}
