import React, { useState } from 'react';
import RegularInput from '../UI/RegularInput';
import RegularButton from '../UI/RegularButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: any) => void;
  data: any;
  type: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, data }) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  const secondKey = Object.keys(formData)[1];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-30"></div>
      <div className="bg-white p-6 rounded shadow-lg w-96 relative z-50">
        <button onClick={onClose} className="absolute top-2 right-2">
          <img src="/svg/close-icon.svg" alt="Close" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit</h2>
        <div className="mb-4">
          <label className="block text-gray-700">{secondKey}</label>
          <RegularInput
            name={secondKey}
            value={formData[secondKey]}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <RegularButton
            onClick={handleSave}
            color="#05a1ff"
            textColor="#fff"
            svgIcon="/svg/save.svg"
          >
            Save
          </RegularButton>
          <RegularButton onClick={onClose} color="#c6d1d9" textColor="#142d63">
            Cancel
          </RegularButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;