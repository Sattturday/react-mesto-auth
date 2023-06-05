import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoToolTip';
import { checkToken } from '../utils/auth';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // авторизация
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('asdf');
  const [loginPopupMessage, setLoginPopupMessage] = useState(null);

  const navigate = useNavigate();

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    deletedCard;

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then(setCurrentUser)
      .catch((err) => console.error(err));

    api
      .getInitialCards()
      .then((res) => setCards(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => document.removeEventListener('keydown', closeByEscape);
    }
  }, [isOpen]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    setDeletedCard(card);
  }

  function handleLoginPopupMessage(message) {
    setLoginPopupMessage(message);
  }

  function handleUpdateAvatar(data) {
    function makeRequest() {
      return api.updateAvatar(data).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateUser(data) {
    function makeRequest() {
      return api.setUserInfo(data).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit(data) {
    function makeRequest() {
      return api.addCard(data).then((newCard) => setCards([newCard, ...cards]));
    }
    handleSubmit(makeRequest);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    function makeRequest() {
      return api.toggleLikeCard(card._id, isLiked).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    }
    handleSubmit(makeRequest);
  }

  function handleConfirmDelete() {
    const cardId = deletedCard._id;

    function makeRequest() {
      return api.deleteCard(cardId).then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
      });
    }
    handleSubmit(makeRequest);
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
  }

  // авторизация
  function handleLogin(email) {
    setLoggedIn(true);
    setUserEmail(email);
  }

  function handleRegister() {}

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');

    if (token) {
      checkToken(token)
        .then((data) => {
          handleLogin(data.data.email);
          navigate('/react-mesto-auth');
        })
        .catch(console.error);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        userEmail={userEmail}
        link='/sign-in'
        linkText='Выйти'
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path='/'
          element={
            loggedIn ? (
              <Navigate to='/react-mesto-auth' />
            ) : (
              <Navigate to='/sign-in' replace />
            )
          }
        />
        <Route
          path='/react-mesto-auth'
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          }
        />
        <Route
          path='/sign-up'
          element={<Register onSubmit={handleRegister} />}
        />
        <Route path='/sign-in' element={<Login handleLogin={handleLogin} />} />
      </Routes>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <ConfirmationPopup
        isOpen={deletedCard}
        onClose={closeAllPopups}
        onConfirm={handleConfirmDelete}
        isLoading={isLoading}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      {/* <InfoTooltip message={loginPopupMessage} onClose={closeAllPopups} /> */}
    </CurrentUserContext.Provider>
  );
}

export default App;
