import { useAppStore } from '../store/appStore';
import { texts } from '../locales/zh-CN';

export function MedicineManagement() {
  const medicines = useAppStore(state => state.medicines);
  const openForm = useAppStore(state => state.openForm);

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
          还没有添加药物
        </div>
        <div style={{ fontSize: '16px', marginBottom: '24px' }}>
          点击下方"添加药物"按钮开始添加
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div
        style={{
          padding: '16px',
          backgroundColor: '#f9fafb',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <div style={{ fontSize: '16px', color: '#6b7280' }}>
          共 {medicines.length} 个药物
        </div>
      </div>

      <div>
        {medicines.map(medicine => {
          const timingLabels = medicine.timings
            .map(t => texts.timings[t])
            .join('、');

          return (
            <div
              key={medicine.id}
              onClick={() => openForm(medicine.id)}
              style={{
                padding: '20px',
                borderBottom: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: 'white',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '8px',
                }}
              >
                {medicine.name}
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  fontSize: '14px',
                  color: '#6b7280',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <span style={{ fontWeight: 'bold' }}>服用时段：</span>
                  {timingLabels}
                </div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>每天：</span>
                  {medicine.timings.length}次
                </div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>每次：</span>
                  {medicine.pillsPerDose}片
                </div>
              </div>

              {medicine.appearance && (
                <div
                  style={{
                    marginTop: '8px',
                    fontSize: '14px',
                    color: '#9ca3af',
                  }}
                >
                  外观：{medicine.appearance}
                </div>
              )}

              <div
                style={{
                  marginTop: '12px',
                  fontSize: '14px',
                  color: '#3b82f6',
                }}
              >
                点击编辑 →
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
