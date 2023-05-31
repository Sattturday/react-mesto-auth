import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({ isOpen, onClose, onConfirm, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();

    onConfirm();
  }

  return (
    <PopupWithForm
      name='confirmation'
      title='Вы уверены?'
      buttonText='Да'
      loadingText='Удаление...'
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isLoading={isLoading}
      isValid={true}
    />
  );
}

export default ConfirmationPopup;
