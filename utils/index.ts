import { Dispatch, SetStateAction } from 'react';
import { types } from '../data/types';

export interface Alert {
  id: string;
  text: string;
  type: 'accepted' | 'error';
}

export const addAlert = (
  text: string, 
  type: 'accepted' | 'error', 
  alerts: Alert[], 
  setAlerts: Dispatch<SetStateAction<Alert[]>>
) => {
  const id = `${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;
  const newAlert: Alert = { id, text, type };
  setAlerts([...alerts, newAlert]);

  setTimeout(() => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  }, 10000);
};

export async function loadCounts(): Promise<{ [key: string]: number }> {
  const newCounts: { [key: string]: number } = {};

  for (const type of types) {
    try {
      const module = await import(`../data/${type.name.toLowerCase()}`);
      const data = module.default || [];
      newCounts[type.name] = data.length;
    } catch (error) {
      console.error(`Ошибка загрузки данных для ${type.name}:`, error);
      newCounts[type.name] = 0;
    }
  }

  return newCounts;
}

export function handleSearch(query: string, data: any[]) {
  const lowercasedQuery = query.toLowerCase();
  return data.filter((item) =>
    Object.values(item).some((val) =>
      typeof val === 'string' ? val.toLowerCase().includes(lowercasedQuery) : false
    )
  );
}

export function handleSort(sortBy: string, order: 'asc' | 'desc', data: any[]) {
  return [...data].sort((a, b) => {
    const aValue = sortBy.split('.').reduce((obj, key) => obj[key], a);
    const bValue = sortBy.split('.').reduce((obj, key) => obj[key], b);

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      return order === 'asc' ? (aValue === bValue ? 0 : aValue ? 1 : -1) : (aValue === bValue ? 0 : aValue ? -1 : 1);
    } else if (aValue instanceof Date && bValue instanceof Date) {
      return order === 'asc' ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime();
    }

    return 0;
  });
}

export function initializePagination(itemsPerPage, currentPage, data) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return data.slice(indexOfFirstItem, indexOfLastItem);
}

export function extractHeaders(data: any[]): string[] {
  if (data.length === 0) return [];

  return Object.keys(data[0]).flatMap((header) => {
    const value = data[0][header];
    if (typeof value === 'object' && value !== null) {
      return Object.keys(value).map((subKey) => `${header}.${subKey}`);
    } else {
      return header;
    }
  });
}

export const darkenColor = (hex: string, percent: number) => {
  let num = parseInt(hex.slice(1), 16);
  let r = (num >> 16) - Math.round((num >> 16) * percent);
  let g = ((num >> 8) & 0x00FF) - Math.round(((num >> 8) & 0x00FF) * percent);
  let b = (num & 0x0000FF) - Math.round((num & 0x0000FF) * percent);

  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}