import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { login, register, checkToken } from '../utils/auth';
import api from '../utils/api';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoToolTip';
import Loading from './Loading';
import Layout from './Layout';
// import PageNotFound from './PageNotFound';

const Main = lazy(() => import('./Main'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const PageNotFound = lazy(() => import('./PageNotFound'));

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    deletedCard ||
    infoMessage;

  const navigate = useNavigate();

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
    tokenCheck();
  }, [navigate]);

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

  // открытие/закрытие попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
    setInfoMessage(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    setDeletedCard(card);
  }

  function handleInfoMessage(message) {
    setInfoMessage(message);
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

  // авторизация
  function handleRegister(values) {
    register(values)
      .then(() => {
        navigate('/sign-in');
        setInfoMessage({
          text: 'Вы успешно зарегистрировались!',
          isSuccess: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setInfoMessage({
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
          isSuccess: false,
        });
      });
  }

  function handleLogin(values) {
    login(values)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setUserEmail(values.email);
          setLoggedIn(true);
          navigate('/react-mesto-auth');
          return data;
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoMessage({
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
          isSuccess: false,
        });
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');

    if (token) {
      checkToken(token)
        .then((data) => {
          setUserEmail(data.data.email);
          setLoggedIn(true);
          navigate('/react-mesto-auth');
        })
        .catch(console.error);
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path='/'
            element={<Layout userEmail={userEmail} onLogout={handleLogout} />}
          >
            <Route
              index
              element={
                loggedIn ? (
                  <Navigate to='/react-mesto-auth' />
                ) : (
                  <Navigate to='/sign-in' replace />
                )
              }
            />
            <Route
              path='react-mesto-auth'
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path='sign-up'
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              path='sign-in'
              element={
                <Login
                  handleLogin={handleLogin}
                  handleInfoMessage={handleInfoMessage}
                />
              }
            />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>

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

      <InfoTooltip message={infoMessage} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
