/**
 * 中文文本
 */
export const texts = {
  app: {
    title: '药物清单',
    today: '今天',
  },
  timings: {
    morning: '早上',
    afternoon: '中午',
    evening: '晚上',
    all: '全天',
    morningTime: '(7:00-11:00)',
    afternoonTime: '(11:00-17:00)',
    eveningTime: '(17:00-23:00)',
  },
  form: {
    addMedicine: '添加药物',
    editMedicine: '编辑药物',
    medicineName: '药物名称',
    timing: '服用时段',
    frequency: '每天次数',
    pillsPerDose: '每次片数',
    appearance: '药片外观（可选）',
    save: '保存',
    cancel: '取消',
    delete: '删除',
    required: '必填',
  },
  checklist: {
    completed: '已完成',
    pending: '待服用',
    pillCount: '💊 每次 {count} 片',
    completedAt: '已完成 {time}',
    instance: '第{n}次',
    empty: '还没有添加药物',
    emptyHint: '点击下方按钮添加',
    allCompleted: '今日药物已全部服用完毕！',
  },
  validation: {
    nameRequired: '请输入药物名称',
    invalidFrequency: '每天次数必须是1-3',
    invalidPillCount: '每次片数必须是1或更多',
  },
};
