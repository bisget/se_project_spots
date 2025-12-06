const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

const showInputError = (formEl, inputEl, errorMessage) => {
    const errorMsgID = inputEl.id + "-error";
    const errorMsgEl = formEl.querySelector("#" + errorMsgID);
    errorMsgEl.textContent = errorMessage;
    inputEl.classList.add(config.inputErrorClass);
};

const hideInputError = (formEl, inputEl) => {
    const errorMsgID = inputEl.id + "-error";
    const errorMsgEl = formEl.querySelector("#" + errorMsgID);
    errorMsgEl.textContent = "";
    inputEl.classList.remove(config.inputErrorClass);
};


const checkInputValidity = (formEl, inputEl) => {
if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
} else {
    hideInputError(formEl, inputEl); }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    })
}

const toggleButtonState = (inputList, buttonEl) => {
if (hasInvalidInput(inputList)) {
    disableButton(buttonEl);
} else {
buttonEl.disabled = false;
buttonEl.classList.remove("config.inactiveButtonClass");}
};

const disableButton = (buttonEl, config) => {
    buttonEl.disabled = true;
buttonEl.classList.add("config.inactiveButtonClass");
};

const resetValidation = (formEl, inputList) => {
    inputList.forEach((input) => {
        hideInputError(formEl, input);
    })
};

const setEventListeners = (formEl, config) => {
const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
const ButtonElement = formEl.querySelector(config.submitButtonSelector);

toggleButtonState(inputList, ButtonElement, config);

inputList.forEach((inputEl) => {
     inputEl.addEventListener("input", () => {
        checkInputValidity(formEl, inputEl, config);
        toggleButtonState(inputList, ButtonElement, config);
    });
});
};
   

const enableValidation = (config) => {
const formList = (document.querySelectorAll(config.formSelector));
formList.forEach((formEl) => {
    setEventListeners(formEl, config);
});
};

enableValidation(settings);