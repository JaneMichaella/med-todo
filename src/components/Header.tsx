import { useAppStore } from '../store/appStore';
import { formatDisplayDate } from '../utils/dateUtils';
import { texts } from '../locales/zh-CN';

export function Header() {
  const currentDate = useAppStore(state => state.currentDate);

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {texts.app.title}
          </h1>
          <div style={{ fontSize: '14px', marginTop: '4px', opacity: 0.9 }}>
            {formatDisplayDate(currentDate)}
          </div>
        </div>
      </div>
    </div>
  );
}
