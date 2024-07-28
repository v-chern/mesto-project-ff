// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsListNode = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, removeCardFunc) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', removeCardFunc)
    return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(event) {
    const cardElement = event.target.parentElement;
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
function showCards() {

}

initialCards.forEach((item) => {
    const card = createCard(item, removeCard);
    cardsListNode.append(card);
});