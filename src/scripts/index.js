//@todo: refactor code to modules

import '../pages/index.css';
import { initialCards } from '../components/cards';
import { openModal, closeModal } from '../components/modal';
import { createCard, removeCard, likeCard } from '../components/card';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

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

// Обработка клика по изображению
function showImage(cardData) {
    const showImgPopup = document.querySelector('.popup_type_image');
    const popupImgElem = showImgPopup.querySelector('.popup__image');
    popupImgElem.src = cardData.link;
    popupImgElem.alt = 'Детальное изображение места' + cardData.name;
    showImgPopup.querySelector('.popup__caption').textContent = cardData.name;
    openModal(showImgPopup);
}

// Обработка формы редактирования профиля
function handleProfileEditForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closeModal();
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
    closeModal();
}

// Вывести карточки на страницу
// Создание и вывод карточек на страницу
initialCards.forEach((item) => {
    const card = createCard(cardTemplate, item, removeCard, likeCard, showImage);
    cardsListNode.append(card);
});

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDesc.textContent;
    openModal(profileEditPopup);
});

addCardButton.addEventListener('click', () => {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    openModal(addCardPopup);
})

profileEditForm.addEventListener('submit', handleProfileEditForm);
addCardForm.addEventListener('submit', handleAddCardForm);