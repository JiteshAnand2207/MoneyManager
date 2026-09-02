import type { AppData } from '../types';

const STORAGE_KEY = 'money-manager-data';

const defaultData: AppData = {
  password: '123',
  transactions: [],
  debts: [],
  debtPayments: [],
};

export async function loadData(): Promise<AppData> {
  if (window.electronAPI) {
    return window.electronAPI.loadData();
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as AppData;
    } catch {
      return { ...defaultData };
    }
  }
  return { ...defaultData };
}

export async function saveData(data: AppData): Promise<void> {
  if (window.electronAPI) {
    await window.electronAPI.saveData(data);
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
