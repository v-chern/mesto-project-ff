function closeModal(modalElem) {
    modalElem.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleModalEsc);
}

function handleModalEsc(evt) {
    if (evt.key === 'Escape') {
        const modalElem = document.querySelector('.popup_is-opened');
        if (modalElem) {
            closeModal(modalElem);
        }
    }
}

function openModal(modalElem) {
    modalElem.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleModalEsc);
}

export {openModal, closeModal};