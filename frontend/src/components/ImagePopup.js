import GeneralPop from "./GeneralPop";

function ImagePopup({ cardPic, isOpen, onClose  }) {

  return (
    <GeneralPop
      name='expand'
      onClose={onClose}
      isOpen={isOpen}
    >


      
      <figure
        className="picture">
        <img className="picture__image" src={cardPic.link} alt={cardPic.name} />
        <figcaption className="picture__caption">
          {cardPic.name}
        </figcaption>
      </figure>
    </GeneralPop>
  )
}

export default ImagePopup;