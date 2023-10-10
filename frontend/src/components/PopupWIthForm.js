import GeneralPop from "./GeneralPop";
//import { createContext } from "react";

function PopupWithForm({name, title,  subtitle, children, isOpen, onClose, validState = true, onSubmit }) {

   // const SendContext = createContext();
   // const isSend = useContext(SendContext);

    return (
        <GeneralPop
            name={name}
            onClose={onClose}
            isOpen={isOpen}
        >
            <form className="popup__form" name={`form-profile_${name}`} noValidate="" onSubmit={onSubmit}>
                <h2 className="popup__title">{title}</h2>
                <div className="popup__content">
                </div>
                {children}
                <button 
                //{className={`popup__button-submit ${validState ? '' : 'popup__button-submit_invalid'}`}}
                className={
                    `${name === 'signin' || name === 'signup' ? 'login__button' : 'popup__button-submit'}
                  
                    ${validState ? '' : (name === 'signin' || name === 'signup' ? 'login__button_disable' : 'popup__button-submit_invalid')}`
                  }


                    type="submit"

                >
                    {subtitle}
                </button>
            </form>

        </GeneralPop>
    )
}

export default PopupWithForm;

