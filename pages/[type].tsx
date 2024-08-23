import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import { updateElementData } from '../features';
import { handleSearch, handleSort, initializePagination } from '../utils';
import DynamicTable from '../components/DynamicTable';
import FiltersRow from '../components/FiltersRow';
import PageHeader from '../components/UI/PageHeader';
import Loader from '../components/UI/Loader';
import Notifier from '../components/UI/Notifier';
import { types } from '../data/types';
import Link from 'next/link';

export default function TypePage() {
  const router = useRouter();
  const { type } = router.query;
  const { data, filteredData, setFilteredData } = useFetchData(type as string);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<{ id: string; text: string; type: 'accepted' | 'error' }[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [data]);

  const onSearch = (query: string) => {
    const filtered = handleSearch(query, data);
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const onSort = (sortBy: string, order: 'asc' | 'desc') => {
    const sortedData = handleSort(sortBy, order, filteredData);
    setFilteredData(sortedData);
    setCurrentPage(1);
  };

  const handleSave = async (updatedItem: any, index: number) => {
    try {
      await updateElementData(type as string, updatedItem, index, alerts, setAlerts);
      const updatedData = [...filteredData];
      updatedData[index] = updatedItem;
      setFilteredData(updatedData);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  if (loading) return <Loader />;

  const typeString = Array.isArray(type) ? type[0] : type;
  const typeInfo = types.find((t) => t.name.toLowerCase() === typeString?.toLowerCase());

  const currentItems = initializePagination(itemsPerPage, currentPage, filteredData);

  return (
    <div className="container mx-auto p-4">
      <Notifier alerts={alerts} setAlerts={setAlerts} />
      <Link href="/" className="text-[rgba(0,160,255,1)] text-[18px] font-[Trebuchet MS,Helvetica,sans-serif] mb-4 inline-block">
        ← Back
      </Link>
      <PageHeader title={typeInfo?.title || 'Loading...'} />
      <FiltersRow
        data={filteredData}
        onSearch={onSearch}
        onSort={onSort}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      >
        <div className="overflow-x-auto">
          <DynamicTable data={currentItems} onSave={handleSave} type={typeString} />
        </div>
      </FiltersRow>
    </div>
  );
}