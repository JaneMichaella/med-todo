import { type Medicine, STORAGE_KEYS } from '../types';
import { getStorageItem, setStorageItem } from './storage';

/**
 * 药物服务 - CRUD operations for medicines
 */

// 生成唯一ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 获取所有药物
export async function getMedicines(): Promise<Medicine[]> {
  const medicines = await getStorageItem<Medicine[]>(STORAGE_KEYS.MEDICINES);
  return medicines || [];
}

// 添加药物
export async function addMedicine(
  medicine: Omit<Medicine, 'id' | 'createdAt' | 'active'>
): Promise<Medicine> {
  const medicines = await getMedicines();

  const newMedicine: Medicine = {
    ...medicine,
    id: generateId(),
    createdAt: new Date().toISOString(),
    active: true,
  };

  medicines.push(newMedicine);
  await setStorageItem(STORAGE_KEYS.MEDICINES, medicines);

  return newMedicine;
}

// 更新药物
export async function updateMedicine(
  id: string,
  updates: Partial<Omit<Medicine, 'id' | 'createdAt'>>
): Promise<Medicine | null> {
  const medicines = await getMedicines();
  const index = medicines.findIndex(m => m.id === id);

  if (index === -1) {
    return null;
  }

  medicines[index] = {
    ...medicines[index],
    ...updates,
  };

  await setStorageItem(STORAGE_KEYS.MEDICINES, medicines);
  return medicines[index];
}

// 删除药物
export async function deleteMedicine(id: string): Promise<boolean> {
  const medicines = await getMedicines();
  const filteredMedicines = medicines.filter(m => m.id !== id);

  if (filteredMedicines.length === medicines.length) {
    return false; // 没有找到该药物
  }

  await setStorageItem(STORAGE_KEYS.MEDICINES, filteredMedicines);
  return true;
}

// 停用药物
export async function deactivateMedicine(id: string): Promise<boolean> {
  const result = await updateMedicine(id, { active: false });
  return result !== null;
}

// 激活药物
export async function activateMedicine(id: string): Promise<boolean> {
  const result = await updateMedicine(id, { active: true });
  return result !== null;
}

// 获取活跃药物
export async function getActiveMedicines(): Promise<Medicine[]> {
  const medicines = await getMedicines();
  return medicines.filter(m => m.active);
}
