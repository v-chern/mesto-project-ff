function showSavingInProgress(formElement, isSaving) {
    const formButton = formElement.querySelector('.popup__button');
    if (isSaving) {
        formButton.textContent = 'Сохранение...'
    } else {
        formButton.textContent = 'Сохранить'
    }
}

export {showSavingInProgress};