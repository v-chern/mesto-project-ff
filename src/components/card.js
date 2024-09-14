// Проверка, что карточка лайкнута пользователем
function isCardLikedByUser(userId, cardLikes) {
    let retVal = false;
    cardLikes.forEach((item) => {
        if (item._id === userId) {
            retVal = true;
        }
    });
    return retVal;
}

// Функция создания карточки
function createCard(connConfig, userId, 
                    cardTemplate, cardData, 
                    cardsAPI,
                    showImageFunc,
                    cardForRemovalFunc) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImgElement = cardElement.querySelector('.card__image');
    const likesCntElement = cardElement.querySelector('.card__like-counter');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardImgElement.src = cardData.link;
    cardImgElement.alt = 'Изображение, отражающее красоту места ' + cardData.name;
    likesCntElement.textContent = cardData.likes.length;
    if (isCardLikedByUser(userId, cardData.likes, cardData)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }
    cardElement.querySelector('.card__title').textContent = cardData.name;
    if (cardData.owner._id === userId) {
        cardDeleteButton.addEventListener('click', () => {
            cardForRemovalFunc(cardElement, cardData._id);
        });
    } else {
        cardDeleteButton.classList.add('card__delete-button_inactive');
    }
    cardLikeButton.addEventListener('click', () => {
        handleCardLike(connConfig, cardsAPI, cardLikeButton, likesCntElement, cardData._id);
    });
    cardImgElement.addEventListener('click', () => {
        showImageFunc(cardData);
    });
    return cardElement;
}

// Удаление карточки
function deleteCard(connConfig, cardsAPI, cardObj, deleteCardElem, closeModalFunc) {
    cardsAPI.deleteCard(connConfig, cardObj.id)
        .then((res) => {
            cardObj.element.remove();
            cardObj.element = null;
            cardObj.id = null;
            closeModalFunc(deleteCardElem);
        })
        .catch((err) => {
            console.log(`Ошибка удаления карточки ${err}`);
        })
}

// Функция лайка карточки
function handleCardLike(connConfig, cardsAPI, cardLikeButton, likesCntElem, cardId) {
    const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
    if (isLiked) {
        cardsAPI.removeLike(connConfig, cardId)
            .then((res) => {
                cardLikeButton.classList.remove('card__like-button_is-active');
                likesCntElem.textContent = res.likes.length;
            })
            .catch((err) => {
                console.log(`Ошибка удаления лайка карточки ${err}`);
            })
    } else {
        cardsAPI.addLike(connConfig, cardId)
        .then((res) => {
            cardLikeButton.classList.add('card__like-button_is-active');
            likesCntElem.textContent = res.likes.length;
        })
        .catch((err) => {
            console.log(`Ошибка лайка карточки ${err}`);
        })
    }
}

export { createCard, deleteCard };