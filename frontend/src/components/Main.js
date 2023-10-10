import { memo, useContext } from "react"
//import api from "../utils/api"
import Card from "./Card"
import Register from "./Register"
import Login from "./Login"
import CurrentUserContext from "../context/CurrentUserContexts"
//import { memo, useContext } from "react"

const Main = memo(({name,  onAddPlace, onEditProfile, onEditAvatar,  onDeletePlace, onCardClick, cards, handleLogin , handleRegister}) => {
    // const [userName, setUserName] = useState('')
    // const [userDescription, setUserDescription] = useState('')
    // const [userAvatar, setUserAvatar] = useState('')

    const currentUser = useContext(CurrentUserContext)

    return (
        <main className="content">
            {name === 'main' ? 
                <>
                    <section className="profile">
                        <button type="button" className="profile__avatar-button" onClick={onEditAvatar}>
                            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
                        </button>
                        <div className="profile__info">
                            <div className="profile__container">
                                <h1 className="profile__title" >{currentUser.name} </h1>
                                <button
                                    className="profile__button-edit"
                                    type="button"
                                    aria-label="Редактировать профиль"
                                    onClick={onEditProfile}
                                />
                            </div>
                            <p className="profile__about" >{currentUser.about} </p>
                        </div>
                        <button
                            className="profile__button-add"
                            type="button"
                            aria-label="Добавить место"
                            onClick={onAddPlace}
                        />
                    </section>
                    <section className="elements">
                        {
                            cards.map((info) => {
                                return (
                                    <Card
                                        key={info._id}
                                        cardPic={info}
                                        onCardClick={onCardClick}
                                        onDeletePlace={onDeletePlace}
                                        cards={cards}
                                    //onCardLike={onCardLike}
                                    />
                                )
                            })
                        }
                    </section>
                </>
                  : 
                 name === 'signup' ?
                    <Register handleRegister={handleRegister} />
                     : 
                     <Login handleLogin={handleLogin} /> 
             } 
        </main>
    )
})

export default Main;