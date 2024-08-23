import React from 'react';

interface Alert {
  id: string;
  text: string;
  type: 'accepted' | 'error';
}

interface AlertBlockProps {
  alerts: Alert[];
  onClose: (id: string) => void;
}

const typeToClassMap = {
  accepted: 'border-blue-500',
  error: 'border-red-500',
};

const AlertBlock: React.FC<AlertBlockProps> = ({ alerts, onClose }) => {
  return (
    <div className="space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`relative flex items-center justify-between text-[#252525] p-4 w-64 mb-2 text-sm font-light leading-5 tracking-wide rounded-lg border-2 shadow-md ${typeToClassMap[alert.type]} bg-white`}
        >
          <span>{alert.text}</span>
          <button
            className="ml-auto text-gray-500 hover:text-blue-500 transition-colors duration-200"
            onClick={() => onClose(alert.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              width="19"
              height="16"
              className="fill-current"
            >
              <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3 54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlertBlock;