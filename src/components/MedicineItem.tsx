import { type Medicine, type DailyChecklistItem } from '../types';
import { PillCountBadge } from './PillCountBadge';
import { formatTime } from '../utils/dateUtils';
import { texts } from '../locales/zh-CN';

interface MedicineItemProps {
  medicine: Medicine;
  checklistItem: DailyChecklistItem;
  onToggle: () => void;
}

export function MedicineItem({
  medicine,
  checklistItem,
  onToggle,
}: MedicineItemProps) {
  const { completed, completedAt, instanceIndex } = checklistItem;

  // 如果同一药物在同一时段出现多次，显示 "第X次"
  const showInstanceLabel = instanceIndex > 0;

  return (
    <div
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: completed ? '#f0fdf4' : 'white',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
    >
      {/* Checkbox */}
      <div
        style={{
          width: '48px',
          height: '48px',
          minWidth: '48px',
          border: '2px solid',
          borderColor: completed ? '#10b981' : '#d1d5db',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '16px',
          fontSize: '24px',
          backgroundColor: completed ? '#10b981' : 'white',
          color: 'white',
        }}
      >
        {completed && '✓'}
      </div>

      {/* Medicine Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: completed ? '#059669' : '#111827',
            marginBottom: '4px',
          }}
        >
          {medicine.name}
          {showInstanceLabel && (
            <span style={{ fontSize: '16px', fontWeight: 'normal', marginLeft: '8px' }}>
              ({texts.checklist.instance.replace('{n}', (instanceIndex + 1).toString())})
            </span>
          )}
        </div>

        {completed && completedAt && (
          <div style={{ fontSize: '14px', color: '#059669' }}>
            {texts.checklist.completedAt.replace('{time}', formatTime(completedAt))}
          </div>
        )}
      </div>

      {/* Pill Count Badge */}
      <div style={{ marginLeft: '12px' }}>
        <PillCountBadge count={medicine.pillsPerDose} completed={completed} />
      </div>
    </div>
  );
}
