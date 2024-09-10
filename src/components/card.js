// Функция создания карточки
function createCard(connConfig, userId, 
                    cardTemplate, cardData, 
                    cardFuncs,
                    showImageFunc) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImgElement = cardElement.querySelector('.card__image');
    const likesCntElement = cardElement.querySelector('.card__like-counter');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardImgElement.src = cardData.link;
    cardImgElement.alt = 'Изображение, отражающее красоту места ' + cardData.name;
    likesCntElement.textContent = cardData.likes.length;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    if (cardData.owner._id === userId) {
        cardDeleteButton.addEventListener('click', () => {
            handleCardRemoval(connConfig, cardFuncs.deleteCard, cardElement, cardData._id);
        });
    } else {
        cardDeleteButton.classList.add('card__delete-button_inactive');
    }
    cardLikeButton.addEventListener('click', () => {
        handleCardLike(connConfig, cardFuncs, cardLikeButton, likesCntElement, cardData._id);
    });
    cardImgElement.addEventListener('click', () => {
        showImageFunc(cardData);
    });
    return cardElement;
}

// Функция удаления карточки
function handleCardRemoval(connConfig, deleteCardFunc, cardElement, cardId) {
    deleteCardFunc(connConfig, cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.log(`Ошиба удаления карточки ${err}`);
        })
}

// Функция лайка карточки
function handleCardLike(connConfig, cardFuncs, cardLikeButton, likesCntElem, cardId) {
    const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
    if (isLiked) {
        cardFuncs.dislikeCard(connConfig, cardId)
            .then((res) => {
                cardLikeButton.classList.remove('card__like-button_is-active');
                likesCntElem.textContent = res.likes.length;
            })
            .catch((err) => {
                console.log(`Ошиба удаления лайка карточки ${err}`);
            })
    } else {
        cardFuncs.likeCard(connConfig, cardId)
        .then((res) => {
            cardLikeButton.classList.add('card__like-button_is-active');
            likesCntElem.textContent = res.likes.length;
        })
        .catch((err) => {
            console.log(`Ошиба лайка карточки ${err}`);
        })
        cardLikeButton.classList.add('card__like-button_is-active');
    }
    
}

export {createCard};