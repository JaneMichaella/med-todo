import { Preferences } from '@capacitor/preferences';

/**
 * 存储服务 - Capacitor Preferences API 包装器
 * 提供简单的 key-value 存储，支持 web 和 Android
 */

// 获取数据
export async function getStorageItem<T>(key: string): Promise<T | null> {
  try {
    const { value } = await Preferences.get({ key });
    if (value === null) {
      return null;
    }
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Error getting storage item ${key}:`, error);
    return null;
  }
}

// 设置数据
export async function setStorageItem<T>(key: string, value: T): Promise<void> {
  try {
    await Preferences.set({
      key,
      value: JSON.stringify(value),
    });
  } catch (error) {
    console.error(`Error setting storage item ${key}:`, error);
  }
}

// 删除数据
export async function removeStorageItem(key: string): Promise<void> {
  try {
    await Preferences.remove({ key });
  } catch (error) {
    console.error(`Error removing storage item ${key}:`, error);
  }
}

// 清空所有数据
export async function clearStorage(): Promise<void> {
  try {
    await Preferences.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
}
