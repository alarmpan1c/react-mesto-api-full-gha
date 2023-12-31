import { useEffect, useState } from "react"
import api from "../utils/api"

function Heart({ heartCards, myId, cardPicId }) {
    //const cardLikeButtonClassName = (`${isLiked ? `elements__button-heart_black` : `element__button-heart`}`)
    const [countOfHeart, setCountOfHeart] = useState(heartCards.length)
    const [blackOrWhite, setBlackOrWhite] = useState('white')

    useEffect(() => {
        setBlackOrWhite(heartCards.some(items => myId === items) ? 'black' : 'white')
    }, [heartCards, myId])

    function handleLikeClick() {
        if (blackOrWhite === 'black') {
            api.eraseHeartonServer(cardPicId, localStorage.jwt)
                .then(res => {

                    setBlackOrWhite('white')
                    setCountOfHeart(res.likes.length)
                })
                .catch((err) => ('Ошибка удления лайка на сервере'))
        }
        else {
            api.addHeartonServer(cardPicId, localStorage.jwt)
                .then(res => {

                    setBlackOrWhite('black')
                    setCountOfHeart(res.likes.length)
                })
                .catch((err) => ('Ошибка установки лайка на сервере'))
        }
    }

    return (
        <>
            <button className={`elements__button-heart ${(blackOrWhite === 'black') && 'elements__button-heart_black'}`} type="button" aria-label="Лайк" onClick={handleLikeClick} />
            <p className="element__count">{countOfHeart}</p>
        </>
    )
}
export default Heart;