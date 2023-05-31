import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const activeLikeButtonClassName = 'cards__like-icon_active';

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleTrashClick() {
    onCardDelete(card);
  }

  return (
    <li className='cards__item'>
      <img
        className='cards__image'
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />

      {isOwn && (
        <button
          className='cards__delete'
          type='button'
          onClick={handleTrashClick}
        ></button>
      )}
      <div className='cards__info'>
        <h2 className='cards__title'>{card.name}</h2>
        <div className='cards__like'>
          <button
            className={
              'cards__like-icon ' + (isLiked && activeLikeButtonClassName)
            }
            type='button'
            onClick={handleCardLike}
          ></button>
          <p className='cards__like-counter'>{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
