export  const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  errorSelectorTemplate: '.popup__span-error_type_',
  disableButtonClass: 'popup__button-submit_invalid',
  inputErrorClass: 'popup__input_invalid',
  textErrorClass: 'popup__span-error_type'
};

export  const info = {
  selectorName: '.profile__title',
  selectorJob: '.profile__about',
  selectorPhoto: '.profile__avatar'
}

//-----------------------------------ОБЩИЕ---------------------------------------------------------
export  const popupEditOpenButton = document.querySelector('.profile__button-edit');
export  const popupAddOpenButton = document.querySelector('.profile__button-add');
export  const popupEditor = document.querySelector('.popup');
export  const popupEditorForm = popupEditor.querySelector('.popup__form');
export  const elementsOutputShedule = '.elements';
//-----------------------------------Всплывающее окно ДОБАВЛЕНИЯ КАРТОЧКИ-----------------------
export  const popupAdd = document.querySelector('.popyp-add-place');
export  const popupAddForm = popupAdd.querySelector('.popup__form');
//----------------------------------Селектора--------------------------------------------------
export  const popupChangeAvatar = document.querySelector('.popyp-change-avatar');
export  const popupChangeAvatarForm = popupChangeAvatar.querySelector('.popup__form');
export  const popupAvatarEdit = document.querySelector('.profile__avatar-button');
export  const popupEraseImage = document.querySelector('.popyp-erase-image');
export  const popupEraseImageForm = popupEraseImage.querySelector('.popup__form');
export  const mySelectorTemplate = '#template';
export  const popupSelectorEdit = '.popup';
export  const popupSelectorAdd = '.popyp-add-place'; 
export  const popupSelectorPicture = '.popup-expand';
export  const popupSelectorAvatar = '.popyp-change-avatar';
export  const popupSelectorErase = '.popyp-erase-image';