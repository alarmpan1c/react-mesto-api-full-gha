//import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWIthForm";
import useFormValidation from "../hooks/ValidationForm";
import CurrentUserContext from "../context/CurrentUserContexts";
import { useContext, useEffect } from "react";

export default function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {

    const { dataInput, validText, validState, solidLine, handleTransitForm, eraseInpup, initialInput  } = useFormValidation()
    
    const currentUser = useContext(CurrentUserContext)
    useEffect(() => {
        initialInput(currentUser.name, "name")
        initialInput(currentUser.about, "job")
    }, [currentUser, initialInput])

    function handleSubmite(evt) {
        evt.preventDefault()
        onUpdateUser({ name: dataInput.name, job: dataInput.job }, eraseInpup)
    }

    function eraseFromForm() {
        onClose()
        eraseInpup({ name: currentUser.name, job: currentUser.about })
    }

    return (

        <PopupWithForm
            name='edit_profile'
            title='Редактировать профиль'
            isOpen={isOpen}
            subtitle='Сохранить'
            onClose={eraseFromForm}
            onSubmit={handleSubmite}
            validState={validState}
        >

            <div className="popup__content">
                <input
                    className={`popup__input popup__input_type_name ${solidLine.name === undefined || solidLine.name ? '' : 'popup__input_invalid'}`}
                    name="name"
                    type="text"
                    id="name"
                    value={dataInput.name ? dataInput.name : ""}
                    minLength={2}
                    maxLength={40}
                    placeholder="Имя"
                    onChange={handleTransitForm}
                    required
                />
                <span className="popup__span-error popup__span-error_type_name">{validText.name}</span>
            </div>

            <div className="popup__content">
                <input
                    className={`popup__input popup__input_type_job  ${solidLine.job === undefined || solidLine.job ? '' : 'popup__input_invalid'}`}
                    name="job"
                    type="text"
                    id="job"
                    value={dataInput.job ? dataInput.job : ""}
                    minLength={2}
                    maxLength={200}
                    placeholder="О себе"
                    onChange={handleTransitForm}
                    required
                />
                <span className="popup__span-error popup__span-error_type_job">{validText.job}</span>
            </div>
        </PopupWithForm>
    )
}