import React from 'react';
import AlertBlock from './AlertBlock';
import { Alert } from '../../utils';

interface NotifierProps {
  alerts: Alert[];
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
}

const Notifier: React.FC<NotifierProps> = ({ alerts, setAlerts }) => {
  const handleClose = (id: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="fixed top-0 right-0 z-[9999] p-5">
      <AlertBlock alerts={alerts} onClose={handleClose} />
    </div>
  );
};

export default Notifier;