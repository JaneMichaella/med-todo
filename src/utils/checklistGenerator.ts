import { type Medicine, type DailyChecklistItem } from '../types';

/**
 * 清单生成器 - 从药物定义生成每日清单
 */

// 生成每日清单
export function generateDailyChecklist(
  date: string,
  medicines: Medicine[]
): DailyChecklistItem[] {
  const checklist: DailyChecklistItem[] = [];

  medicines.forEach(medicine => {
    if (!medicine.active) {
      return; // 跳过未激活的药物
    }

    // 为每个选定的时段创建一个清单项
    medicine.timings.forEach((timing, index) => {
      checklist.push({
        medicineId: medicine.id,
        date,
        timing,
        instanceIndex: index,
        completed: false,
      });
    });
  });

  // 按时段排序：早上 -> 中午 -> 晚上
  const timingOrder: Record<string, number> = {
    morning: 0,
    afternoon: 1,
    evening: 2,
  };

  checklist.sort((a, b) => {
    const orderDiff = timingOrder[a.timing] - timingOrder[b.timing];
    if (orderDiff !== 0) {
      return orderDiff;
    }
    // 同一时段，按 instanceIndex 排序
    return a.instanceIndex - b.instanceIndex;
  });

  return checklist;
}
