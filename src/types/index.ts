// 药物时段类型
export type Timing = 'morning' | 'afternoon' | 'evening' | 'all';

// 药物定义
export interface Medicine {
  id: string;              // UUID
  name: string;            // 药物名称 (中文)
  timing: Timing;          // 服用时段
  frequencyPerDay: number; // 每天次数 (1-3)
  pillsPerDose: number;    // 每次片数
  appearance?: string;     // 药片外观描述 (optional)
  createdAt: string;       // ISO date
  active: boolean;         // 是否启用
}

// 每日清单项目
export interface DailyChecklistItem {
  medicineId: string;      // 关联的药物ID
  date: string;            // YYYY-MM-DD
  timing: 'morning' | 'afternoon' | 'evening'; // 服用时段 (不包括 'all')
  instanceIndex: number;   // 第几次 (0, 1, 2 for up to 3 times)
  completed: boolean;      // 是否已服用
  completedAt?: string;    // 完成时间 (ISO)
}

// 应用状态
export interface AppState {
  medicines: Medicine[];
  dailyChecklist: DailyChecklistItem[];
  currentDate: string;     // YYYY-MM-DD
  isFormOpen: boolean;     // 添加/编辑表单是否打开
  editingMedicineId: string | null; // 正在编辑的药物ID
}

// 存储键
export const STORAGE_KEYS = {
  MEDICINES: 'medicines_list',
  CHECKLIST: 'daily_checklist',
  LAST_DATE: 'last_active_date',
} as const;
