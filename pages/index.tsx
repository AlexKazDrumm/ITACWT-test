import { types } from '../data/types';
import { useState, useEffect } from 'react';
import { loadCounts } from '../utils';
import ListElement from '../components/UI/ListElement';
import PageHeader from '../components/UI/PageHeader';
import DynamicColumnsContainer from '../components/DynamicColumnsContainer';

export default function Home() {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [numColumns, setNumColumns] = useState(5);

  useEffect(() => {
    async function fetchCounts() {
      const newCounts = await loadCounts();
      setCounts(newCounts);
    }

    fetchCounts();

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setNumColumns(1);
      } else {
        setNumColumns(5);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-14">
      <main className="py-5">
        <div className="flex flex-col gap-5 mb-[53px]">
          <PageHeader title={'Select data type'} />
          <DynamicColumnsContainer numColumns={numColumns}>
            {types.map((type) => (
              <ListElement key={type.name} type={type} count={counts[type.name] || 0} />
            ))}
          </DynamicColumnsContainer>
        </div>
      </main>
    </div>
  );
}