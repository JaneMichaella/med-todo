import { useAppStore } from '../store/appStore';
import { texts } from '../locales/zh-CN';

export function AddButton() {
  const openForm = useAppStore(state => state.openForm);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 20,
      }}
    >
      <button
        onClick={() => openForm()}
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '30px',
          padding: '16px 32px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseDown={e => {
          e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={e => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <span style={{ fontSize: '24px' }}>+</span>
        {texts.form.addMedicine}
      </button>
    </div>
  );
}
