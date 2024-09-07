function showValidationError (inputElement, errorElement, errorMessage) {
    inputElement.classList.add('popup__input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
}

function hideValidationError (inputElement, errorElement) {
    inputElement.classList.remove('popup__input-error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__error_visible');
}

function checkInputValidity (inputElement, errorElement) {
    if (!inputElement.validity.valid) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        }
        else {
            inputElement.setCustomValidity('');
        }
        showValidationError(inputElement, errorElement, inputElement.validationMessage);
    } else {
        hideValidationError(inputElement, errorElement);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement) {
    const inactiveClass = 'popup__button_disabled';
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveClass);
    } else {
        buttonElement.classList.remove(inactiveClass)
    }
}

export { checkInputValidity, toggleButtonState };