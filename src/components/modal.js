function openModal(modalElem) {
    modalElem.classList.add('popup_is-opened');
    //listener to close popup
    modalElem.querySelector('.popup__close').addEventListener('click', closeModal);
    modalElem.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeModal();
        }
    });
}

function closeModal() {
    const modalElem = document.querySelector('.popup_is-opened');
    if (modalElem) {
        modalElem.classList.remove('popup_is-opened');
    }
}

export {openModal, closeModal};