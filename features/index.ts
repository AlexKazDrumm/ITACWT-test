import { addAlert } from '../utils';

export async function updateElementData(
  type: string,
  updatedItem: any,
  index: number,
  alerts: { id: string; text: string; type: 'accepted' | 'error' }[],
  setAlerts: React.Dispatch<React.SetStateAction<{ id: string; text: string; type: 'accepted' | 'error' }[]>>
): Promise<void> {
  try {
    const response = await fetch(`/api/updateData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, updatedData: updatedItem, index }),
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }

    addAlert('Данные успешно обновлены!', 'accepted', alerts, setAlerts);
    return response.json();
  } catch (error) {
    addAlert('Ошибка при обновлении данных', 'error', alerts, setAlerts);
    throw error;
  }
}