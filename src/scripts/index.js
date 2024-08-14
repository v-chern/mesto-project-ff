//@todo: refactor code to modules

import '../pages/index.css';
import { initialCards } from '../components/cards';
import { openModal, closeModal } from '../components/modal';

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
nameInput.value = profileTitle.textContent;
jobInput.value = profileDesc.textContent;

//add card nodes
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');

// Функция создания карточки
function createCard(cardData, removeCardFunc, likeCardFunc, showImageFunc) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImgElement = cardElement.querySelector('.card__image');
    cardImgElement.src = cardData.link;
    cardImgElement.alt = 'Изображение, отражающее красоту места ' + cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        removeCardFunc(cardElement);
    });
    cardElement.querySelector('.card__like-button').addEventListener('click', () => {
        likeCardFunc(cardElement);
    });
    cardImgElement.addEventListener('click', () => {
        showImageFunc(cardData);
    });
    return cardElement;
}

// Функция удаления карточки
function removeCard(cardElement) {
    cardElement.remove();
}

// Функция лайка карточки
function likeCard(cardElement) {
    cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
}

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
    const card = createCard({
        name: evt.target.querySelector('.popup__input_type_card-name').value,
        link: evt.target.querySelector('.popup__input_type_url').value
    }, removeCard, likeCard, showImage);
    cardsListNode.prepend(card);
    evt.target.reset();
    closeModal();
}

// Вывести карточки на страницу
// Создание и вывод карточек на страницу
initialCards.forEach((item) => {
    const card = createCard(item, removeCard, likeCard, showImage);
    cardsListNode.append(card);
});

profileEditButton.addEventListener('click', () => {
    openModal(profileEditPopup);
});

addCardButton.addEventListener('click', () => {
    openModal(addCardPopup);
})

//@todo: обработчик события нажатия клавиши Esc добавляется на document при открытии модального окна и удаляется при закрытии.
document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        closeModal();
    }
});

profileEditForm.addEventListener('submit', handleProfileEditForm);
addCardForm.addEventListener('submit', handleAddCardForm);