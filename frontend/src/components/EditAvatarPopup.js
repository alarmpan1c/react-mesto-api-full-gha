import { useRef } from "react"
import PopupWithForm from "./PopupWIthForm"
import useFormValidation from "../hooks/ValidationForm"

export default function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {

    const { dataInput, validText, validState, solidLine, handleTransitForm, eraseInpup } = useFormValidation()
    const input = useRef()

    function handleSubmite(evt) {
        evt.preventDefault()
        onUpdateAvatar({ avatar: input.current.value }, eraseInpup)
    }

    function eraseFromForm() {
        onClose()
        eraseInpup()
    }

    return (
        <PopupWithForm
            name='edit_avatar'
            title='Обновить аватар'
            subtitle='Сохранить'
            isOpen={isOpen}
            onClose={eraseFromForm}
            onSubmit={handleSubmite}
            validState={validState}
        >
            <div className="popup__content">
                <input
                    ref={input}
                    className={`popup__input popup__input_type_url  ${solidLine.avatar === undefined || solidLine.avatar ? '' : 'popup__input_invalid'}`}
                    name="avatar"
                    value={dataInput.avatar ? dataInput.avatar : ""}
                    type="url"
                    id="avatar"
                    placeholder="Ссылка на картинку"
                    onChange={handleTransitForm}
                    required
                />
                <span className="popup__span-error popup__span-error_type_avatar" >{validText.avatar}</span>
            </div>

        </PopupWithForm>
    )
}