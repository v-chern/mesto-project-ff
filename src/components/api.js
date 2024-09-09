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

function putOnServer(url, headers, data) {
    return fetch(url, {
        method: 'PUT',
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

function deleteFromServer(url, headers) {
    return fetch(url, {
        method: 'DELETE',
        headers,
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

function getUserDetails (config) {
    const url = config.baseUrl + '/users/me'
    return getFromServer(url, config.headers);
}

function getCards (config) {
    const url = config.baseUrl + '/cards'
    return getFromServer(url, config.headers);
}

export { getUserDetails, getCards };