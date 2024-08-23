import { useRouter } from 'next/router';

interface ListElementProps {
  type: { name: string; title: string };
  count: number;
}

export default function ListElement({ type, count }: ListElementProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${type.name.toLowerCase()}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer p-4 mb-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-old-design flex justify-between items-center"
    >
      <span className="text-gray-400 font-semibold text-[16px] max-w-[50%] truncate">
        {type.title}
      </span>
      <span className="bg-[#E0FDEC] text-[#14C06A] pt-3 px-3.5 pb-2 rounded-md flex flex-col h-fit">
        <span className="text-[16px] font-bold">{count} el.</span>
      </span>
    </div>
  );
}