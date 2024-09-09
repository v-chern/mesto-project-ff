import '../pages/index.css';
import { initialCards } from '../components/cards';
import { openModal, closeModal } from '../components/modal';
import { createCard, removeCard, likeCard } from '../components/card';
import { enableValidation, clearValidation } from '../components/validation';
import { getUserDetails, getCards } from '../components/api';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Настройки валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorVisibilityClass: 'popup__error_visible'
};

// Настройки подключения к серверу
const serverConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
    headers: {
        authorization: '',
        'Content-Type': 'application/json'
    }
}

getCards(serverConfig)
    .then((result) => {
    console.log(result);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    }); 

// DOM узлы
const cardsListNode = document.querySelector('.places__list');
//profile edit popup nodes
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = profileEditPopup.querySelector('.popup__form');
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');

//add card nodes
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

//img popup
const showImgPopup = document.querySelector('.popup_type_image');
const popupImgElem = showImgPopup.querySelector('.popup__image');
const popupImgCap = showImgPopup.querySelector('.popup__caption');

//popups collection
const popups = document.querySelectorAll('.popup');

// Обработка клика по изображению
function showImage(cardData) {
    popupImgElem.src = cardData.link;
    popupImgElem.alt = 'Детальное изображение места' + cardData.name;
    popupImgCap.textContent = cardData.name;
    openModal(showImgPopup);
}

// Обработка формы редактирования профиля
function handleProfileEditForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closeModal(profileEditPopup);
}

// Обработка формы добавления карточки
function handleAddCardForm(evt) {
    evt.preventDefault();
    const card = createCard(cardTemplate, {
            name: cardNameInput.value,
            link: cardLinkInput.value
        }, removeCard, likeCard, showImage);
    cardsListNode.prepend(card);
    evt.target.reset();
    closeModal(addCardPopup);
}

//Добавление листенеров
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDesc.textContent;
    clearValidation(profileEditForm, validationConfig);
    openModal(profileEditPopup);
});

addCardButton.addEventListener('click', () => {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    clearValidation(addCardForm, validationConfig);
    openModal(addCardPopup);
})

profileEditForm.addEventListener('submit', handleProfileEditForm);
addCardForm.addEventListener('submit', handleAddCardForm);

popups.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal(item);
        }
    });

    item.querySelector('.popup__close').addEventListener('click', () => {
        closeModal(item);
    });

    console.log();
});

// Активация валидации
enableValidation(validationConfig); 

// Создание и вывод карточек на страницу
initialCards.forEach((item) => {
    const card = createCard(cardTemplate, item, removeCard, likeCard, showImage);
    cardsListNode.append(card);
});