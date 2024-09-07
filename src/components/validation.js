function showValidationError(valConfig, inputElement, errorElement, errorMessage) {
    inputElement.classList.add(valConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(valConfig.errorVisibilityClass);
}

function hideValidationError(valConfig, inputElement, errorElement) {
    inputElement.classList.remove(valConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(valConfig.errorVisibilityClass);
}

function checkInputValidity(valConfig, inputElement, errorElement) {
    if (!inputElement.validity.valid) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        }
        else {
            inputElement.setCustomValidity('');
        }
        showValidationError(valConfig, inputElement, errorElement, inputElement.validationMessage);
    } else {
        hideValidationError(valConfig, inputElement, errorElement);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
}

function toggleButtonState(valConfig, inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(valConfig.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(valConfig.inactiveButtonClass)
    }
}

function setValidationListeners(valConfig, form, formInputs, formButton) {
    toggleButtonState(valConfig, formInputs, formButton);
    formInputs.forEach((inputElement) => {
        const errorElement = form.querySelector(`.${inputElement.id}-error`);
        inputElement.addEventListener('input', () => {
            toggleButtonState(valConfig, formInputs, formButton);
            checkInputValidity(valConfig, inputElement, errorElement);
        });
    });
}

function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        const formInputsArr = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
        const formSubmitButton = formElement.querySelector(validationConfig.submitButtonSelector);
        setValidationListeners(validationConfig, formElement, formInputsArr, formSubmitButton);
    });
}

function clearValidation(formElement, validationConfig) {
    const formInputsArr = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    formInputsArr.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        hideValidationError(validationConfig, inputElement, errorElement);
    });
    const formSubmitButton = formElement.querySelector(validationConfig.submitButtonSelector);
    formSubmitButton.classList.add(validationConfig.inactiveButtonClass);
}

export { enableValidation, clearValidation };