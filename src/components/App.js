import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import { login, register, checkToken } from '../utils/auth';
import api from '../utils/api';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoToolTip';
import Layout from './Layout';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import PageNotFound from './PageNotFound';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

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

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      setIsLoadingContent(true);
      api
        .getUserInfo()
        .then(setCurrentUser)
        .catch((err) => console.error(err))
        .finally(() => setIsLoadingContent(false));

      api
        .getInitialCards()
        .then((res) => setCards(res))
        .catch((err) => console.error(err))
        .finally(() => setIsLoadingContent(false));
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  // открытие и закрытие попапов
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

  // обновление аватара и инфо юзера
  function handleUpdateAvatar(data) {
    function makeRequest() {
      return api.updateAvatar(data).then(setCurrentUser);
    }
    handleSubmit(makeRequest, false);
  }

  function handleUpdateUser(data) {
    function makeRequest() {
      return api.setUserInfo(data).then(setCurrentUser);
    }
    handleSubmit(makeRequest, false);
  }

  // добавление и удаление карточек, лайки
  function handleAddPlaceSubmit(data) {
    function makeRequest() {
      return api.addCard(data).then((newCard) => setCards([newCard, ...cards]));
    }
    handleSubmit(makeRequest, false);
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
    handleSubmit(makeRequest, false);
  }

  function handleConfirmDelete() {
    const cardId = deletedCard._id;

    function makeRequest() {
      return api.deleteCard(cardId).then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
      });
    }
    handleSubmit(makeRequest, false);
  }

  // авторизация
  function handleRegister(values) {
    function makeRequest() {
      return register(values).then(() => {
        navigate('/sign-in');
      });
    }
    handleSubmit(makeRequest, true);
  }

  function handleLogin(values) {
    function makeRequest() {
      return login(values).then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setUserEmail(values.email);
          setLoggedIn(true);
          navigate('/react-mesto-auth');
          return data;
        } else {
          return;
        }
      });
    }
    handleSubmit(makeRequest, false);
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    function makeRequest() {
      return checkToken(token).then((data) => {
        setUserEmail(data.data.email);
        setLoggedIn(true);
        navigate('/react-mesto-auth');
      });
    }
    if (token) {
      handleSubmit(makeRequest, false);
    }
  }

  // отправка запросов
  function handleSubmit(request, showInfo) {
    setIsLoading(true);
    request()
      .then(() => {
        closeAllPopups();
        if (showInfo) {
          handleSuccess();
        }
      })
      .catch((err) => {
        console.log(err);
        handleError();
      })
      .finally(() => setIsLoading(false));
  }

  // обработка ошибок запросов
  function handleError() {
    return setInfoMessage({
      text: 'Что-то пошло не так! Попробуйте ещё раз.',
      isSuccess: false,
    });
  }

  // обработка успешной регистрации
  function handleSuccess() {
    return setInfoMessage({
      text: 'Вы успешно зарегистрировались!',
      isSuccess: true,
    });
  }

  // выход из приложения
  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail('');
  }

  return (
    <AppContext.Provider
      value={{
        loggedIn,
        userEmail,
        isLoading,
        isLoadingContent,
        closeAllPopups,
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/' element={<Layout onLogout={handleLogout} />}>
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

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmationPopup
          isOpen={deletedCard}
          onConfirm={handleConfirmDelete}
        />

        <ImagePopup card={selectedCard} />

        <InfoTooltip message={infoMessage} />
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
