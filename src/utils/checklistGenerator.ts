import { type Medicine, type DailyChecklistItem, type Timing } from '../types';

/**
 * 清单生成器 - 从药物定义生成每日清单
 */

// 根据药物配置获取时段列表
function getTimingsForMedicine(medicine: Medicine): ('morning' | 'afternoon' | 'evening')[] {
  if (medicine.timing === 'all') {
    // 根据每天次数分配时段
    if (medicine.frequencyPerDay === 1) {
      return ['morning'];
    } else if (medicine.frequencyPerDay === 2) {
      return ['morning', 'evening'];
    } else {
      return ['morning', 'afternoon', 'evening'];
    }
  } else {
    // 指定时段，按频率重复
    const timings: ('morning' | 'afternoon' | 'evening')[] = [];
    const baseTiming = medicine.timing as 'morning' | 'afternoon' | 'evening';

    for (let i = 0; i < medicine.frequencyPerDay; i++) {
      timings.push(baseTiming);
    }
    return timings;
  }
}

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

    const timings = getTimingsForMedicine(medicine);

    timings.forEach((timing, index) => {
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
