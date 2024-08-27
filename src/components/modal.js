function closeModal() {
    const modalElem = document.querySelector('.popup_is-opened');
    if (modalElem) {
        modalElem.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', handleModalEsc);
    }
}

function handleModalEsc(evt) {
    if (evt.key === 'Escape') {
        closeModal();
    }
}

function openModal(modalElem) {
    modalElem.classList.add('popup_is-opened');
    //listeners to close popup
    modalElem.querySelector('.popup__close').addEventListener('click', closeModal);
    modalElem.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal();
        }
    });
    document.addEventListener('keydown', handleModalEsc);
}

export {openModal, closeModal};