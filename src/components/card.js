// Функция создания карточки
function createCard(cardTemplate, cardData, removeCardFunc, likeCardFunc, showImageFunc) {
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

export {createCard, removeCard, likeCard};