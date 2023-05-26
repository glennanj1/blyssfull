
import { useState } from 'react';
import { Transition } from '@headlessui/react';

const Popup = ({ type, subject, message }) => {
  const [show, setShow] = useState(true);

  const getBackgroundColor = (type) => {
    switch(type) {
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
        return 'bg-gray-500';
      case 'error':
        return 'bg-red-500';
      case 'success':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Transition
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`fixed top-0 inset-x-0 p-2 ${getBackgroundColor(type)} text-white z-50`}>
        <div className="max-w-3xl mx-auto">
          <div className="p-2 rounded-lg shadow-lg flex items-center justify-between">
            <div>
              <p className="font-medium">{subject}</p>
              <p className="text-sm">{message}</p>
            </div>
            <button
              onClick={() => setShow(false)}
              className="ml-3 flex-shrink-0"
            >
              <span className="sr-only">Dismiss</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
}

export default Popup;
