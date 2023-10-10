function GeneralPop({ name, children, isOpen, onClose }) {

    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
            <div className={`${name === 'expand' ? 'popup__expand-image' : 'popup__container'} ${(name === 'successful' || name === 'error') && 'popup__registration-container'}`} 
                onClick={(evt) => evt.stopPropagation()}>
                <button
                    className="popup__button-close"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                />
                {children}
            </div>
        </div>
    )
}

export default GeneralPop;

