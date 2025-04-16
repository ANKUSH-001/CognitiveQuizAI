import { useEffect } from 'react';
import { X } from 'lucide-react';

const PopupModal = ({ isOpen, onClose, children, isLoading }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 left-70 sm:right-15 flex justify-evenly items-center backdrop-blur-sm  bg-opacity-1">
      <div className=" bg-opacity-0 rounded-xl shadow-lg -p-1 w-full max-w-5xl relative h-[90vh] overflow-y-auto">
        {/* Close button (only shown after loading is done) */}
        {!isLoading && (
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-red-800 hover:text-red-600"
          >
            <X size={44} />
          </button>
        )}

        {/* Show loader or content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-full border-t-2 border-b-2 border-red-800" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default PopupModal;
