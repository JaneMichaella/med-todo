import { Header } from './components/Header';
import { MedicineList } from './components/MedicineList';
import { MedicineManagement } from './components/MedicineManagement';
import { AddButton } from './components/AddButton';
import { MedicineForm } from './components/MedicineForm';
import { useDailyReset } from './hooks/useDailyReset';
import { useAppStore } from './store/appStore';
import './styles/global.css';

function App() {
  // 初始化应用并处理每日重置
  useDailyReset();

  const isLoading = useAppStore(state => state.isLoading);
  const currentView = useAppStore(state => state.currentView);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontSize: '20px',
          color: '#6b7280',
        }}
      >
        加载中...
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {currentView === 'checklist' ? <MedicineList /> : <MedicineManagement />}
      </div>
      <AddButton />
      <MedicineForm />
    </div>
  );
}

export default App;
