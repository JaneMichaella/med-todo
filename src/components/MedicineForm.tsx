import { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import { type Timing } from '../types';
import { texts } from '../locales/zh-CN';

export function MedicineForm() {
  const isFormOpen = useAppStore(state => state.isFormOpen);
  const editingMedicineId = useAppStore(state => state.editingMedicineId);
  const medicines = useAppStore(state => state.medicines);
  const addMedicine = useAppStore(state => state.addMedicine);
  const updateMedicine = useAppStore(state => state.updateMedicine);
  const deleteMedicine = useAppStore(state => state.deleteMedicine);
  const closeForm = useAppStore(state => state.closeForm);

  const [name, setName] = useState('');
  const [timings, setTimings] = useState<Timing[]>(['morning']);
  const [pillsPerDose, setPillsPerDose] = useState(''); // 改为字符串，支持空值
  const [appearance, setAppearance] = useState('');

  // 加载编辑的药物数据
  useEffect(() => {
    if (editingMedicineId) {
      const medicine = medicines.find(m => m.id === editingMedicineId);
      if (medicine) {
        setName(medicine.name);
        setTimings(medicine.timings);
        setPillsPerDose(medicine.pillsPerDose.toString());
        setAppearance(medicine.appearance || '');
      }
    } else {
      // 重置表单
      setName('');
      setTimings(['morning']);
      setPillsPerDose(''); // 默认为空
      setAppearance('');
    }
  }, [editingMedicineId, medicines]);

  const toggleTiming = (timing: Timing) => {
    if (timings.includes(timing)) {
      // 移除
      if (timings.length > 1) {
        setTimings(timings.filter(t => t !== timing));
      } else {
        alert('至少需要选择一个服用时段');
      }
    } else {
      // 添加
      setTimings([...timings, timing]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert(texts.validation.nameRequired);
      return;
    }

    if (timings.length === 0) {
      alert('请至少选择一个服用时段');
      return;
    }

    // 检查片数是否已填写
    if (!pillsPerDose || pillsPerDose.trim() === '') {
      alert('请输入每次片数');
      return;
    }

    const pillsCount = parseInt(pillsPerDose);
    if (isNaN(pillsCount) || pillsCount < 1) {
      alert(texts.validation.invalidPillCount);
      return;
    }

    const medicineData = {
      name: name.trim(),
      timings,
      pillsPerDose: pillsCount,
      appearance: appearance.trim() || undefined,
    };

    if (editingMedicineId) {
      await updateMedicine(editingMedicineId, medicineData);
    } else {
      await addMedicine(medicineData);
    }

    closeForm();
  };

  const handleDelete = async () => {
    if (editingMedicineId && confirm('确定要删除这个药物吗？')) {
      await deleteMedicine(editingMedicineId);
      closeForm();
    }
  };

  if (!isFormOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '20px',
      }}
      onClick={closeForm}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{ margin: '0 0 24px 0', fontSize: '24px' }}>
          {editingMedicineId ? texts.form.editMedicine : texts.form.addMedicine}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* 药物名称 */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {texts.form.medicineName} <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                boxSizing: 'border-box',
              }}
              placeholder="例如：降压药"
            />
          </div>

          {/* 服用时段 */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {texts.form.timing} <span style={{ color: 'red' }}>*</span>
            </label>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
              可多选，每选一个时段表示每天服用一次
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {(['morning', 'afternoon', 'evening'] as Timing[]).map(t => (
                <label
                  key={t}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    border: '2px solid',
                    borderColor: timings.includes(t) ? '#3b82f6' : '#d1d5db',
                    borderRadius: '8px',
                    backgroundColor: timings.includes(t) ? '#eff6ff' : 'white',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={timings.includes(t)}
                    onChange={() => toggleTiming(t)}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span style={{ fontSize: '16px' }}>
                    {texts.timings[t]}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 每次片数 */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {texts.form.pillsPerDose} <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="number"
              min="1"
              value={pillsPerDose}
              onChange={e => setPillsPerDose(e.target.value)}
              placeholder="请输入片数"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* 药片外观 */}
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              {texts.form.appearance}
            </label>
            <input
              type="text"
              value={appearance}
              onChange={e => setAppearance(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                boxSizing: 'border-box',
              }}
              placeholder="例如：白色圆形小药片"
            />
          </div>

          {/* 按钮 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={closeForm}
              style={{
                flex: 1,
                padding: '14px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                backgroundColor: 'white',
                cursor: 'pointer',
              }}
            >
              {texts.form.cancel}
            </button>

            {editingMedicineId && (
              <button
                type="button"
                onClick={handleDelete}
                style={{
                  flex: 1,
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                {texts.form.delete}
              </button>
            )}

            <button
              type="submit"
              style={{
                flex: 1,
                padding: '14px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#3b82f6',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              {texts.form.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
