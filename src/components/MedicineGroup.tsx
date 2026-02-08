import { type Medicine, type DailyChecklistItem } from '../types';
import { MedicineItem } from './MedicineItem';
import { texts } from '../locales/zh-CN';

interface MedicineGroupProps {
  timing: 'morning' | 'afternoon' | 'evening';
  checklistItems: DailyChecklistItem[];
  medicines: Medicine[];
  onToggle: (
    medicineId: string,
    timing: 'morning' | 'afternoon' | 'evening',
    instanceIndex: number
  ) => void;
}

export function MedicineGroup({
  timing,
  checklistItems,
  medicines,
  onToggle,
}: MedicineGroupProps) {
  // 过滤当前时段的清单项目
  const items = checklistItems.filter(item => item.timing === timing);

  if (items.length === 0) {
    return null; // 没有药物时不显示该时段
  }

  const timingLabels = {
    morning: texts.timings.morning,
    afternoon: texts.timings.afternoon,
    evening: texts.timings.evening,
  };

  const timingTimes = {
    morning: texts.timings.morningTime,
    afternoon: texts.timings.afternoonTime,
    evening: texts.timings.eveningTime,
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Time Group Header */}
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: '#f3f4f6',
          borderLeft: '4px solid #3b82f6',
          fontWeight: 'bold',
          fontSize: '18px',
          color: '#1f2937',
        }}
      >
        {timingLabels[timing]} {timingTimes[timing]}
      </div>

      {/* Medicine Items */}
      <div>
        {items.map(item => {
          const medicine = medicines.find(m => m.id === item.medicineId);
          if (!medicine) return null;

          return (
            <MedicineItem
              key={`${item.medicineId}-${item.timing}-${item.instanceIndex}`}
              medicine={medicine}
              checklistItem={item}
              onToggle={() => onToggle(item.medicineId, item.timing, item.instanceIndex)}
            />
          );
        })}
      </div>
    </div>
  );
}
