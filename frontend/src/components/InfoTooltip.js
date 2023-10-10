
import GeneralPop from './GeneralPop'


export default function InfoTooltip({ name, titleText, isOpen, onClose }) {

  return (
    <GeneralPop name={name} isOpen={isOpen} onClose={onClose}>
      <div className={`popup__registration-image ${name === 'error' ? 'popup__registration-image_type_error' : ''}`} />
      <h2 className="popup__registration-title">{titleText}</h2>
    </GeneralPop>
  )
}
