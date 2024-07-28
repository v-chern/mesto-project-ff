// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const cardsListNode = document.querySelector('.places__list');

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