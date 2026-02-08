import { texts } from '../locales/zh-CN';

interface PillCountBadgeProps {
  count: number;
  completed: boolean;
}

export function PillCountBadge({ count, completed }: PillCountBadgeProps) {
  const pillText = texts.checklist.pillCount.replace('{count}', count.toString());

  return (
    <div
      style={{
        fontSize: '16px',
        color: completed ? '#10b981' : '#6b7280',
        fontWeight: '500',
        whiteSpace: 'nowrap',
      }}
    >
      {pillText}
    </div>
  );
}
