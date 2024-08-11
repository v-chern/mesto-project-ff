import '../pages/index.css';
import { initialCards } from '../components/cards';
import { openModal, closeModal } from '../components/modal';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardsListNode = document.querySelector('.places__list');
//profile edit popup nodes
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
//add card nodes
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');

// Функция создания карточки
function createCard(cardData, removeCardFunc) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImgElement = cardElement.querySelector('.card__image');
    cardImgElement.src = cardData.link;
    cardImgElement.alt = 'Изображение, отражающее красоту места ' + cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        removeCardFunc(cardElement);
    });
    return cardElement;
}

// Функция удаления карточки
function removeCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу

// Создание и вывод карточек на страницу
initialCards.forEach((item) => {
    const card = createCard(item, removeCard);
    cardsListNode.append(card);
});

profileEditButton.addEventListener('click', () => {
    openModal(profileEditPopup);
});

addCardButton.addEventListener('click', () => {
    openModal(addCardPopup);
})

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        closeModal();
    }
});
