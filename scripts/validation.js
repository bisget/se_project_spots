const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

const showInputError = (formEl, inputEl, errorMessage) => {
    const errorMsgID = inputEl.id + "-error";
    const errorMsgEl = formEl.querySelector("#" + errorMsgID);
    errorMsgEl.textContent = errorMessage;
    inputEl.classList.add(modal__input_type_error);
};

const hideInputError = (formEl, inputEl) => {
    const errorMsgID = inputEl.id + "-error";
    const errorMsgEl = formEl.querySelector("#" + errorMsgID);
    errorMsgEl.textContent = "";
    inputEl.classList.remove(modal__input_type_error);
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

const toggleButtonState = (inputList, ButtonEl) => {
if (hasInvalidInput(inputList)) {
    disabledButton(buttonEl);
} else {
buttonEl.disabled = false;
buttonEl.classList.remove("modal__button_disabled");}
};

const disabledButton = (buttonEl) => {
    buttonEl.disabled = true;
buttonEl.classList.add("modal__button_disabled");
};

const resetValidation = (formEl, inputList) => {
    inputList.forEach((input) => {
        hideInputError(formEl, input);
    })
};

const setEventListeners = (formEl) => {
const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
const ButtonElement = formEl.querySelector(".modal__button");

toggleButtonState(inputList, ButtonElement);

inputList.forEach((inputEl) => {
     inputEl.addEventListener("input", () => {
        checkInputValidity(formEl, inputEl);
        toggleButtonState(inputList, ButtonElement);
    });
});
};
   

const enableValidation = () => {
const formList = (document.querySelectorAll("modal__form"));
formList.forEach((formEl) => {
    setEventListeners(formEl);
});
};

enableValidation();