import { useContext } from "react"
import CurrentUserContext from "../context/CurrentUserContexts"
import Heart from "./Heart"

function Card({ cardPic, onCardClick, onDeletePlace }) {

    const currentUser = useContext(CurrentUserContext)
    console.log(currentUser)
    return (
        <div className="elements__card">
            {/*<button className="elements__button-trash" type="button" aria-label="Удалить" onClick={onDeletePlace}/>*/}
            {currentUser._id === cardPic.owner && <button className="elements__button-trash" type="button" aria-label="Удалить" onClick={() => onDeletePlace(cardPic._id)} />}
            <img className="elements__image" src={`${cardPic.link}`} alt={cardPic.name} onClick={() => onCardClick({ link: cardPic.link, name: cardPic.name })} />

            <div className="elements__description">
                <h2 className="elements__name" >
                    {cardPic.name}
                </h2>
                <div className="elements__container">
                    <Heart    heartCards = {cardPic.likes}  myId = {currentUser._id}  cardPicId = {cardPic._id}/>
                </div>
            </div>
        </div>

    )
}

export default Card;