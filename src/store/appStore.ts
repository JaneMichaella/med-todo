import { create } from 'zustand';
import { type Medicine, type DailyChecklistItem } from '../types';
import {
  getMedicines,
  addMedicine as addMedicineService,
  updateMedicine as updateMedicineService,
  deleteMedicine as deleteMedicineService,
} from '../services/medicineService';
import {
  checkAndResetDaily,
  addChecklistForNewMedicine,
  updateChecklistForMedicine,
  removeChecklistForMedicine,
  updateChecklistItem as updateChecklistItemService,
} from '../services/checklistService';
import { getCurrentDate } from '../utils/dateUtils';

interface AppStore {
  // 状态
  medicines: Medicine[];
  dailyChecklist: DailyChecklistItem[];
  currentDate: string;
  currentView: 'checklist' | 'management'; // 当前页面视图
  isFormOpen: boolean;
  editingMedicineId: string | null;
  isLoading: boolean;

  // 视图切换
  setView: (view: 'checklist' | 'management') => void;

  // 药物管理
  loadMedicines: () => Promise<void>;
  addMedicine: (
    medicine: Omit<Medicine, 'id' | 'createdAt' | 'active'>
  ) => Promise<void>;
  updateMedicine: (
    id: string,
    updates: Partial<Omit<Medicine, 'id' | 'createdAt'>>
  ) => Promise<void>;
  deleteMedicine: (id: string) => Promise<void>;

  // 清单管理
  loadChecklist: () => Promise<void>;
  toggleChecklistItem: (
    medicineId: string,
    timing: 'morning' | 'afternoon' | 'evening',
    instanceIndex: number
  ) => Promise<void>;

  // 表单管理
  openForm: (medicineId?: string) => void;
  closeForm: () => void;

  // 初始化
  initialize: () => Promise<void>;
}

export const useAppStore = create<AppStore>((set, get) => ({
  // 初始状态
  medicines: [],
  dailyChecklist: [],
  currentDate: getCurrentDate(),
  currentView: 'checklist',
  isFormOpen: false,
  editingMedicineId: null,
  isLoading: false,

  // 切换视图
  setView: (view) => {
    set({ currentView: view });
  },

  // 加载药物
  loadMedicines: async () => {
    const medicines = await getMedicines();
    set({ medicines });
  },

  // 添加药物
  addMedicine: async medicine => {
    const newMedicine = await addMedicineService(medicine);
    await get().loadMedicines();
    // 智能添加清单项（保留其他药物的记录）
    const { currentDate } = get();
    const checklist = await addChecklistForNewMedicine(currentDate, newMedicine);
    set({ dailyChecklist: checklist });
  },

  // 更新药物
  updateMedicine: async (id, updates) => {
    await updateMedicineService(id, updates);
    await get().loadMedicines();
    // 智能更新清单项（保留已完成的记录）
    const { medicines, currentDate } = get();
    const updatedMedicine = medicines.find(m => m.id === id);
    if (updatedMedicine) {
      const checklist = await updateChecklistForMedicine(currentDate, updatedMedicine);
      set({ dailyChecklist: checklist });
    }
  },

  // 删除药物
  deleteMedicine: async id => {
    await deleteMedicineService(id);
    await get().loadMedicines();
    // 智能删除清单项（只删除该药物的记录）
    const { currentDate } = get();
    const checklist = await removeChecklistForMedicine(currentDate, id);
    set({ dailyChecklist: checklist });
  },

  // 加载清单（包括每日重置检查）
  loadChecklist: async () => {
    const { medicines } = get();
    const checklist = await checkAndResetDaily(medicines);
    set({ dailyChecklist: checklist, currentDate: getCurrentDate() });
  },

  // 切换清单项目完成状态
  toggleChecklistItem: async (medicineId, timing, instanceIndex) => {
    const { dailyChecklist, currentDate } = get();

    const item = dailyChecklist.find(
      item =>
        item.medicineId === medicineId &&
        item.timing === timing &&
        item.instanceIndex === instanceIndex
    );

    if (item) {
      const newCompletedState = !item.completed;
      await updateChecklistItemService(
        medicineId,
        currentDate,
        timing,
        instanceIndex,
        newCompletedState
      );
      await get().loadChecklist();
    }
  },

  // 打开表单
  openForm: (medicineId?: string) => {
    set({ isFormOpen: true, editingMedicineId: medicineId || null });
  },

  // 关闭表单
  closeForm: () => {
    set({ isFormOpen: false, editingMedicineId: null });
  },

  // 初始化应用
  initialize: async () => {
    set({ isLoading: true });
    await get().loadMedicines();
    await get().loadChecklist();
    set({ isLoading: false });
  },
}));
