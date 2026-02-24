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

// 智能更新清单：添加新药物后
export async function addChecklistForNewMedicine(
  date: string,
  medicine: Medicine
): Promise<DailyChecklistItem[]> {
  const existingChecklist = await getChecklist(date);

  // 为新药物生成清单项
  const newItems: DailyChecklistItem[] = medicine.timings.map((timing, index) => ({
    medicineId: medicine.id,
    date,
    timing,
    instanceIndex: index,
    completed: false,
  }));

  // 合并现有清单和新清单项
  const updatedChecklist = [...existingChecklist, ...newItems];
  await saveChecklist(updatedChecklist);
  return updatedChecklist;
}

// 智能更新清单：删除药物后
export async function removeChecklistForMedicine(
  date: string,
  medicineId: string
): Promise<DailyChecklistItem[]> {
  const existingChecklist = await getChecklist(date);

  // 移除该药物的所有清单项
  const updatedChecklist = existingChecklist.filter(
    item => item.medicineId !== medicineId
  );

  await saveChecklist(updatedChecklist);
  return updatedChecklist;
}

// 智能更新清单：修改药物后
export async function updateChecklistForMedicine(
  date: string,
  medicine: Medicine
): Promise<DailyChecklistItem[]> {
  const existingChecklist = await getChecklist(date);

  // 找出该药物的现有清单项
  const oldItems = existingChecklist.filter(item => item.medicineId === medicine.id);
  const otherItems = existingChecklist.filter(item => item.medicineId !== medicine.id);

  // 生成新的清单项（根据更新后的timings）
  const newItems: DailyChecklistItem[] = medicine.timings.map((timing, index) => {
    // 尝试找到匹配的旧记录（同样的timing和instanceIndex）
    const matchingOldItem = oldItems.find(
      old => old.timing === timing && old.instanceIndex === index
    );

    if (matchingOldItem) {
      // 保留旧记录的完成状态
      return {
        ...matchingOldItem,
        // 药物信息可能改变了，但保留完成状态
      };
    } else {
      // 新增的时段，创建新记录
      return {
        medicineId: medicine.id,
        date,
        timing,
        instanceIndex: index,
        completed: false,
      };
    }
  });

  // 合并其他药物的清单项和更新后的清单项
  const updatedChecklist = [...otherItems, ...newItems];
  await saveChecklist(updatedChecklist);
  return updatedChecklist;
}
