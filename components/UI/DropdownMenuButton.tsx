import React, { useState, useRef, useEffect } from 'react';

interface DropdownMenuButtonProps {
  options: { label: string; onClick: () => void }[];
}

export default function DropdownMenuButton({ options }: DropdownMenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const gapRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node) &&
      gapRef.current &&
      !gapRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`p-2 rounded-md bg-gray-200 hover:bg-[#05a1ff] hover:text-white transition-colors duration-200 cursor-pointer flex items-center justify-center ${
          isOpen ? 'bg-blue-500 text-white' : ''
        }`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < rect.left - 10 ||
            e.clientX > rect.right + 10 ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
          ) {
            setIsOpen(false);
          }
        }}
      >
        <img
          src={isOpen ? '/svg/dots-white.svg' : '/svg/dots-black.svg'}
          alt="Menu"
          className="pointer-events-none"
        />
      </button>

      {isOpen && (
        <>
          <div
            ref={gapRef}
            className="absolute right-[64px] top-0 w-10 h-full pointer-events-none" // Область остается для промежутка
          />
          <div
            ref={menuRef}
            className="absolute right-[110%] top-0 mt-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg" // Открытие меню слева от кнопки
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
                className="px-4 py-2 cursor-pointer hover:text-blue-500 text-[14px]"
              >
                {option.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}