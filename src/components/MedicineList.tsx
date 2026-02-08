import { useAppStore } from '../store/appStore';
import { MedicineGroup } from './MedicineGroup';
import { texts } from '../locales/zh-CN';

export function MedicineList() {
  const medicines = useAppStore(state => state.medicines);
  const dailyChecklist = useAppStore(state => state.dailyChecklist);
  const toggleChecklistItem = useAppStore(state => state.toggleChecklistItem);

  // 如果没有药物，显示空状态
  if (medicines.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#6b7280',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>💊</div>
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
          {texts.checklist.empty}
        </div>
        <div style={{ fontSize: '16px' }}>{texts.checklist.emptyHint}</div>
      </div>
    );
  }

  // 如果有药物但清单为空，显示提示
  if (dailyChecklist.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#6b7280',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
          今日清单生成中...
        </div>
        <div style={{ fontSize: '16px' }}>请刷新页面</div>
      </div>
    );
  }

  // 检查是否全部完成
  const allCompleted =
    dailyChecklist.length > 0 && dailyChecklist.every(item => item.completed);

  return (
    <div style={{ paddingBottom: '80px' }}>
      {allCompleted && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#d1fae5',
            color: '#065f46',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            borderBottom: '2px solid #10b981',
          }}
        >
          🎉 {texts.checklist.allCompleted}
        </div>
      )}

      <MedicineGroup
        timing="morning"
        checklistItems={dailyChecklist}
        medicines={medicines}
        onToggle={toggleChecklistItem}
      />

      <MedicineGroup
        timing="afternoon"
        checklistItems={dailyChecklist}
        medicines={medicines}
        onToggle={toggleChecklistItem}
      />

      <MedicineGroup
        timing="evening"
        checklistItems={dailyChecklist}
        medicines={medicines}
        onToggle={toggleChecklistItem}
      />
    </div>
  );
}
