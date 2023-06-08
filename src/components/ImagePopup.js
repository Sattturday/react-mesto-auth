import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { usePopupClose } from '../hooks/usePopupClose';

function ImagePopup({ card }) {
  const checkCard = card !== null;

  const app = useContext(AppContext);
  usePopupClose(card, app.closeAllPopups);

  return (
    <div
      className={'popup popup_for_full-image' + (checkCard && ' popup_opened')}
    >
      <figure className='popup__container-image'>
        <button
          className='popup__close'
          type='button'
          onClick={app.closeAllPopups}
        />
        <img
          className='popup__full-image'
          src={checkCard ? card.link : '#'}
          alt={checkCard ? card.name : ''}
        />
        <figcaption className='popup__caption'>
          {checkCard ? card.name : ''}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
