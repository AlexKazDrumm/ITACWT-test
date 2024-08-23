import { useState, useEffect } from 'react';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-100 z-50">
      <div className="text-center">
        <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 mb-4 animate-spin"></div>
        <p className="text-lg font-semibold text-blue-600">Loading...</p>
      </div>
    </div>
  );
}