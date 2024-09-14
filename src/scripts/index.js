import '../pages/index.css';
import { openModal, closeModal } from '../components/modal';
import { createCard } from '../components/card';
import { enableValidation, clearValidation } from '../components/validation';
import { userDetailsAPI, cardsAPI } from '../components/api';

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
        authorization: '68a7de7a-4657-4ffc-8eeb-1ef94cb920e6',
        'Content-Type': 'application/json'
    }
}

// Активный пользователь
let currentUser = null;

// Массив карточек
let initialCards = null;

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardsListNode = document.querySelector('.places__list');
//profile edit popup nodes
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileImg = document.querySelector('.profile__image');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = profileEditPopup.querySelector('.popup__form');
const nameInput = profileEditForm.querySelector('.popup__input_type_name');
const jobInput = profileEditForm.querySelector('.popup__input_type_description');

//avatar edit nodes
const avatarEditButton = document.querySelector('.profile__image_edit-button');
const avatarEditPopup = document.querySelector('.popup_type_avatar');
const avatarEditForm = avatarEditPopup.querySelector('.popup__form');
const avatarUrlInput = avatarEditPopup.querySelector('.popup__input_type_url');

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

// Функции

//todo: change to cardsAPI
const cardFunctions = {
    "deleteCard": cardsAPI.deleteCard,
    "likeCard": cardsAPI.addLike,
    "dislikeCard": cardsAPI.removeLike
}

// Обработка клика по изображению
function showImage(cardData) {
    popupImgElem.src = cardData.link;
    popupImgElem.alt = 'Детальное изображение места' + cardData.name;
    popupImgCap.textContent = cardData.name;
    openModal(showImgPopup);
}

// Отображение данных пользователя
function showUserDetails(user) {
    profileTitle.textContent = user.name;
    profileDesc.textContent = user.about;
    profileImg.src = user.avatar;
}

// Отображение карточек
function showCards(cardsArray, currentUser) {
    cardsArray.forEach((item) => {
        const card = createCard(serverConfig, currentUser._id, 
            cardTemplate, item, cardFunctions, showImage);
        cardsListNode.append(card);
    });
}

// Обработка формы редактирования профиля
function handleProfileEditForm(evt) {
    evt.preventDefault();
    userDetailsAPI.updateUserDetails(serverConfig, {
        name: nameInput.value,
        about: jobInput.value
    })
        .then((res) => {
            profileTitle.textContent = res.name;
            profileDesc.textContent = res.about;
            closeModal(profileEditPopup);
        })
        .catch((err) => {
            console.log(`Ошибка обновления данных пользователя: ${err}`);
        });
}

// Обработка формы обновления аватара
function handleChangeAvatarForm(evt) {
    evt.preventDefault();
    userDetailsAPI.updateUserAvatar(serverConfig, {
        avatar: avatarUrlInput.value
    })
        .then((res) => {
            profileImg.src = res.avatar;
            closeModal(avatarEditPopup);
        })
        .catch((err) => {
            console.log(`Ошибка обновления аватара: ${err}`);
        });
}

// Обработка формы добавления карточки
function handleAddCardForm(evt) {
    evt.preventDefault();
    cardsAPI.addNewCard(serverConfig, {
        name: cardNameInput.value,
        link: cardLinkInput.value
    })
        .then((res) => {
            const card = createCard(serverConfig, currentUser._id, cardTemplate, res, cardFunctions, showImage);
            cardsListNode.prepend(card);
            evt.target.reset();
            closeModal(addCardPopup);
        })
}

//Добавление листенеров
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDesc.textContent;
    clearValidation(profileEditForm, validationConfig);
    openModal(profileEditPopup);
});

avatarEditButton.addEventListener('click', () => {
    avatarUrlInput.value = '';
    clearValidation(avatarEditForm, validationConfig);
    openModal(avatarEditPopup);
});

addCardButton.addEventListener('click', () => {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    clearValidation(addCardForm, validationConfig);
    openModal(addCardPopup);
})

profileEditForm.addEventListener('submit', handleProfileEditForm);
avatarEditPopup.addEventListener('submit', handleChangeAvatarForm);
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
});

// Активация валидации
enableValidation(validationConfig); 

// Загрузка начальных данных
Promise.all([userDetailsAPI.getUserDetails(serverConfig), cardsAPI.getCards(serverConfig)])
    .then((res) => {
        currentUser = res[0];
        initialCards = Array.from(res[1]);
        showUserDetails(currentUser);
        showCards(initialCards, currentUser);
    })
    .catch((err) => {
          console.log(`Ошибка загрузки данных: ${err}`);
    }); 