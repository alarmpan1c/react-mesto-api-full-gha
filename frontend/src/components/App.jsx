//import logo from './logo.svg';
import { createContext, useCallback, useEffect, useState } from "react";
import Main from "./Main";
import CurrentUserContext from "../context/CurrentUserContexts";
import api from "../utils/api";
import Header from "./Header";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import InfoTooltip from "./InfoTooltip";
import PopupWithForm from "./PopupWIthForm";
import ProtectedRoute from "./ProtectedRoute";
import CombinedHeaderMain from "./CombinedHeaderMain";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { getUserData, authorization, auth } from "../utils/auth"

function App() {
  const navigate = useNavigate()
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
  const [infoUser, setinfoUser] = useState('')
  const [cards, setCards] = useState([]);
  const [idCardForErase, setIdCardForErase] = useState('');
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isPictureOnPopup, setIsPictureOnPopup] = useState(false);
  const [isSend, setIsSend] = useState(false)
  const [selectedCard, setSelectedCard] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [isError, setIsError] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const closeAllPopup = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsError(false)
    setIsEditAvatarPopupOpen(false)
    setIsPictureOnPopup(false)
    setIsSuccessful(false)
    setIsDeletePopupOpen(false)
  }, [])

  const closeByEscape = useCallback((evt) => {
    if (evt.key === 'Escape') {
      closeAllPopup()
      document.removeEventListener('keydown', closeByEscape)
    }
  }, [closeAllPopup]
  )

  function listnerEscape() {
    document.addEventListener('keydown', closeByEscape)
  }

  const closeAllPopupForm = useCallback(() => {
    closeAllPopup()
    document.removeEventListener('keydown', closeByEscape)
  }, [closeAllPopup, closeByEscape])

  const SendContext = createContext()

  useEffect(() => {
    handleCheck(localStorage.jwt);
    }
, [])

  function handleCheck(jwt) {
    if (jwt) {
      getUserData(jwt)
        .then(data => {
          setinfoUser(data.email)
          setCurrentUser(data)
          setLoggedIn(true)
          navigate('/')
        })
  }
  };

  function handleDeleteClick(IDofCard) {
    setIsDeletePopupOpen(true)
    listnerEscape()
    setIdCardForErase(IDofCard)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsPictureOnPopup(true)
    listnerEscape()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    listnerEscape()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    listnerEscape()
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    listnerEscape()
  }

  useEffect(() => {
    if (loggedIn) {//загрузка карточек при усломии входа в систему
      //setSetupCard(true)
      //Вывод массива карточек с сервера
      Promise.all([api.getInfo(localStorage.jwt), api.getPicture(localStorage.jwt)])
        .then(([infoUser, infoPicture]) => {
          setCurrentUser(infoUser)
          setCards(infoPicture.reverse())

          //setSetupCard(false )
        })
        .catch((error => console.log('Ошибка при загрузке карточек с сервера', error)))
    }
  }, [loggedIn])

  function handleCardDelete(evt) {
    evt.preventDefault()
    api.eraseCardonServer(idCardForErase, localStorage.jwt)
      .then(res => {
        setCards(cards.filter(items => {
          return items._id !== idCardForErase
        }))
        closeAllPopupForm()
      })
      .catch((err) => console.log('Ошибка удаления карточки'))
  }

  function handleUpdataAvatar(data, eraseInpup) {
    api.setAvataronServer(data, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)

        closeAllPopupForm()

        eraseInpup()
      })
      .catch((error => console.log('Ошибка при загрузке данных аватара на сервера', error)))
  }

  function handleUpdataUser(data, eraseInpup) {
    api.setInfoonServer(data, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)

        closeAllPopupForm()

        eraseInpup()
      })
      .catch((error => console.log('Ошибка при загрузке данных пользователя на сервера', error)))
  }

  function handleAddPlaceSubmit(data, eraseInpup) {
    api.addCardonServer(data, localStorage.jwt)
      .then(res => {
        // res.owner = res.owner._id
        setCards([res, ...cards])
        closeAllPopupForm()
        eraseInpup()
      })
      .catch((error => console.log('Ошибка при загрузке данных карточки на сервера', error)))
  }

  function handleLogin(password, email) {
    setIsSend(true)
    authorization(password, email)
      .then(res => {
        console.log(res)
        localStorage.setItem('jwt', res.token)
        // setLoggedIn(true)
        handleCheck(res.token)
      })
      .catch(err => {
        setIsError(true)
        console.log(`Ошибка во время авторизации ${err}`)
      })
      .finally(() => {
        setIsSend(false)
        closeAllPopupForm(false)
      })
  }

  function handleRegister(password, email) {
    console.log(password, email)
    setIsSend(true)
    auth(password, email)
      .then(res => {
        setIsSuccessful(true)
        navigate('/sign-in')
      })
      .catch((err) => {
        setIsError(true)
        console.log(`Ошибка во время регистрации ${err}`)
      })
    //.finally(() => {
    //  setIsSend(false)
    //  closeAllPopupForm(false)
    //})
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <SendContext.Provider value={isSend}>
        <Routes>
          <Route path='/' element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path='/' element={<CombinedHeaderMain
              dataUser={infoUser}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onDeletePlace={handleDeleteClick}
              onCardClick={handleCardClick}
              cards={cards} />}
              currentUser={currentUser} />
            </Route>
            <Route path='/sign-up' element={
              <>
                <Header name='signup' setCurrentUser={setCurrentUser}  />
                <Main name='signup' handleRegister={handleRegister} />
              </>
            } />

            <Route path='/sign-in' element={
              <>
                <Header name='signin' />
                <Main name='signin' handleLogin={handleLogin} />
              </>
            } />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </SendContext.Provider>

      <Footer />

      <SendContext.Provider value={isSend}>

        <EditAvatarPopup
          onUpdateAvatar={handleUpdataAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopupForm}
        />

        <EditProfilePopup
          onUpdateUser={handleUpdataUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopupForm}

        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopupForm}
        />

        <PopupWithForm
          name='delete'
          title='Вы уверены?'
          subtitle='Да'
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopupForm}
          onSubmit={handleCardDelete}
        />
      </SendContext.Provider>

      {/* Открытие карточки - изоражение из карточки*/}
      <ImagePopup
        cardPic={selectedCard}
        onClose={closeAllPopupForm}
        isOpen={isPictureOnPopup}
      />

      <InfoTooltip
        name='successful'
        titleText={'Регистрация успешно завершена'}
        isOpen={isSuccessful}
        onClose={closeAllPopupForm}
      />

      <InfoTooltip
        name='error'
        titleText={'Регистрация не завершена'}
        isOpen={isError}
        onClose={closeAllPopupForm}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;