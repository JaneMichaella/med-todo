import { useAppStore } from '../store/appStore';
import { formatDisplayDate } from '../utils/dateUtils';
import { texts } from '../locales/zh-CN';

export function Header() {
  const currentDate = useAppStore(state => state.currentDate);
  const currentView = useAppStore(state => state.currentView);
  const setView = useAppStore(state => state.setView);

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: '#3b82f6',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          padding: '16px',
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

      {/* Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          borderTop: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <button
          onClick={() => setView('checklist')}
          style={{
            flex: 1,
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            backgroundColor: currentView === 'checklist' ? 'rgba(255,255,255,0.2)' : 'transparent',
            color: 'white',
            cursor: 'pointer',
            borderBottom: currentView === 'checklist' ? '3px solid white' : '3px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          📋 今日清单
        </button>
        <button
          onClick={() => setView('management')}
          style={{
            flex: 1,
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            backgroundColor: currentView === 'management' ? 'rgba(255,255,255,0.2)' : 'transparent',
            color: 'white',
            cursor: 'pointer',
            borderBottom: currentView === 'management' ? '3px solid white' : '3px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          💊 药物管理
        </button>
      </div>
    </div>
  );
}
