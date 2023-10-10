import PopupWithForm from "./PopupWIthForm";
import ValidationForm from "../hooks/ValidationForm";

export default function AddPlacePopup({ onAddPlace, isOpen, onClose }) {

    const { dataInput, validText, validState, solidLine, handleTransitForm, eraseInpup } = ValidationForm()

    function handleSubmite(evt) {
        evt.preventDefault()
        onAddPlace({ place: dataInput.place, link: dataInput.link }, eraseInpup)
    }
    function eraseFromForm() {
        onClose()
        eraseInpup()
    }
    return (

        <PopupWithForm
            name='add_card'
            title='Новое место'
            subtitle='Создать'
            isOpen={isOpen}
            onClose={eraseFromForm}
            onSubmit={handleSubmite}
            validState={validState}
        >
            <div className="popup__content">
                <input
                    className={`popup__input popup__input_type_place ${solidLine.place === undefined || solidLine.place ? '' : 'popup__input_invalid'}`}
                    name="place"
                    type="text"
                    id="place"
                    value={dataInput.place ? dataInput.place : ""}
                    minLength={2}
                    maxLength={30}
                    placeholder="Название"
                    onChange={handleTransitForm}
                    required
                />
                <span className="popup__span-error popup__span-error_type_place"  >{validText.place}</span>
            </div>
            <div className="popup__content">
                <input
                    className={`popup__input popup__input_type_url ${solidLine.link === undefined || solidLine.link ? '' : 'popup__input_invalid'}`}
                    name="link"
                    type="url"
                    id="link"
                    value={dataInput.link ? dataInput.link : ""}
                    placeholder="Ссылка на картинку"
                    onChange={handleTransitForm}
                    required
                />
                <span className="popup__span-error popup__span-error_type_link" >{validText.link}</span>
            </div>

        </PopupWithForm>

    )

}