function getFromServer(url, headers) {
    return fetch(url, {
        headers: {
          authorization: headers.authorization
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

function postOnServer(url, headers, data) {
    return fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    })    
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

function patchOnServer(url, headers, data) {
    return fetch(url, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(data)
    })    
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

function putOnServer(url, headers) {
    return fetch(url, {
        method: 'PUT',
        headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

function deleteFromServer(url, headers) {
    return fetch(url, {
        method: 'DELETE',
        headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

const userDetailsAPI = {
    getUserDetails(config) {
        const url = config.baseUrl + '/users/me';
        return getFromServer(url, config.headers);
    },

    updateUserDetails(config, userDetails) {
        const url = config.baseUrl + '/users/me';
        return patchOnServer(url, config.headers, userDetails);
    },

    updateUserAvatar(config, userAvatarDetails) {
        const url = config.baseUrl + '/users/me/avatar'
        return patchOnServer(url, config.headers, userAvatarDetails);
    }
};

const cardsAPI = {
    getCards (config) {
        const url = config.baseUrl + '/cards';
        return getFromServer(url, config.headers);
    },
    
    addNewCard(config, cardData) {
        const url = config.baseUrl + '/cards';
        return postOnServer(url, config.headers, cardData);
    },
    
    deleteCard(config, cardId) {
        const url = config.baseUrl + '/cards/' + cardId;
        return deleteFromServer(url, config.headers)
    },
    
    addLike(config, cardId) {
        const url = config.baseUrl + '/cards/likes/' + cardId;
        return putOnServer(url, config.headers)
    },
    
    removeLike(config, cardId) {
        const url = config.baseUrl + '/cards/likes/' + cardId;
        return deleteFromServer(url, config.headers)
    }
}

export { 
    userDetailsAPI,
    cardsAPI
};