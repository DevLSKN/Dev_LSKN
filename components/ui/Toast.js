import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, onConfirm }) => {
  useEffect(() => {
    if (type !== 'confirm') {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  const handleConfirmClick = () => {
    if (typeof onConfirm === 'function') {
      onConfirm();
    }
    onClose();
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'confirm': return 'bg-blue-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={type !== 'confirm' ? onClose : undefined}></div>
      <div className={`${getBackgroundColor()} p-4 rounded-lg text-white shadow-lg max-w-md mx-4 relative`}>
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <span className="mr-2 text-lg">{message}</span>
            {type !== 'confirm' && (
              <button 
                onClick={onClose}
                className="ml-2 text-white hover:text-gray-200 text-xl"
              >
                ×
              </button>
            )}
          </div>
          {type === 'confirm' && (
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={handleConfirmClick}
                className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100 font-medium"
              >
                Confirmar
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toast;