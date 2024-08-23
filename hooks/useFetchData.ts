import { useEffect, useState } from 'react';

export function useFetchData(type: string) {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (type) {
      import(`../data/${type}.json`)
        .then((module) => {
          setData(module.default);
          setFilteredData(module.default);
        })
        .catch((error) => console.error('Ошибка загрузки данных:', error));
    }
  }, [type]);

  return { data, filteredData, setFilteredData };
}