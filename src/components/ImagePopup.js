import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Popup from './Popup';

function ImagePopup({ card }) {
  const checkCard = card !== null;
  const app = useContext(AppContext);

  return (
    <Popup isOpen={card} name='image' onClose={app.closeAllPopups}>
      <img
        className='popup__image'
        src={checkCard ? card.link : '#'}
        alt={checkCard ? card.name : ''}
      />
      <p className='popup__caption'>{checkCard ? card.name : ''}</p>
    </Popup>
  );
}

export default ImagePopup;
