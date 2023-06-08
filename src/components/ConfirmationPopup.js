import PopupWithForm from './PopupWithForm';

function ConfirmationPopup({ isOpen, onConfirm }) {
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
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isValid={true}
    />
  );
}

export default ConfirmationPopup;
