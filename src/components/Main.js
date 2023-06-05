import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import Footer from './Footer';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className='content'>
        <section className='profile' aria-label='Профиль'>
          <div className='profile__info'>
            <div className='profile__avatar'>
              <button
                className='profile__avatar-edit'
                type='button'
                onClick={onEditAvatar}
              ></button>
              <img
                className='profile__avatar-image'
                src={currentUser.avatar}
                alt='Аватар'
              />
            </div>
            <h1 className='profile__info-name'>{currentUser.name}</h1>
            <button
              className='profile__button profile__button_edit'
              type='button'
              onClick={onEditProfile}
            ></button>
            <p className='profile__info-job'>{currentUser.about}</p>
          </div>
          <button
            className='profile__button profile__button_add'
            type='button'
            onClick={onAddPlace}
          ></button>
        </section>

        <section className='elements' aria-label='Места'>
          <ul className='cards'>
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
