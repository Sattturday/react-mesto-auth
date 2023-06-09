import { useEffect } from 'react';

const Popup = ({ isOpen, name, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    document.body.classList.add('page_hidden');

    return () => {
      document.removeEventListener('keydown', closeByEscape);
      document.body.classList.remove('page_hidden');
    };
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen && ' popup_opened'} popup_type_${name}`}
      onClick={handleOverlay}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        {children}
        <button className='popup__close' type='button' onClick={onClose} />
      </div>
    </div>
  );
};

export default Popup;
