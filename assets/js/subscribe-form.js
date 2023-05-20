"use strict";

const emailInput = document.getElementById("email");
const errorLabel = document.getElementById("subscribe-form__label--error");

const form = document.getElementById("subscribe-form");
const submitButton = document.getElementById("subscribe-form__submit");

emailInput.addEventListener("input", validateEmail);

form.addEventListener("submit", submitForm);
submitButton.addEventListener("click", handleButtonClick);

function validateEmail() {
  const email = emailInput.value.trim();

  localStorage.setItem("email", email);

  if (email === "") {
    resetInputStyles();
    hideErrorLabel();
  } else if (!validator.isEmail(email)) {
    setInvalidInput();
    showErrorLabel("Please provide a valid email");
  } else {
    setValidInput();
    hideErrorLabel();
  }
}

function resetInputStyles() {
  emailInput.classList.remove("subscribe-form__input--error");
  emailInput.classList.remove("subscribe-form__input--valid");
}

function setInvalidInput() {
  emailInput.classList.toggle("subscribe-form__input--error", true);
  emailInput.classList.toggle("subscribe-form__input--valid", false);
}

function setValidInput() {
  emailInput.classList.toggle("subscribe-form__input--error", false);
  emailInput.classList.toggle("subscribe-form__input--valid", true);
}

function showErrorLabel(message) {
  errorLabel.classList.toggle("subscribe-form__label--error", true);
  errorLabel.textContent = message;
}

function hideErrorLabel() {
  errorLabel.classList.toggle("subscribe-form__label--error", false);
  errorLabel.textContent = "";
}

function submitForm(event) {
  event.preventDefault();

  if (emailInput.classList.contains("subscribe-form__input--valid")) {
    setTimeout(() => {
      showNotification(
        "Success! Email submitted. Stay tuned for updates and exclusive deals from our new fashion store. Thank you for joining us!"
      );
    }, 750);

    emailInput.value = "";

    resetInputStyles();
    hideErrorLabel();

    localStorage.removeItem("email");
  }
}

function handleButtonClick() {
  if (!emailInput.classList.contains("subscribe-form__input--valid")) {
    emailInput.focus();
  }

  submitForm;
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notification__text");

  notificationText.textContent = message;
  notification.classList.toggle("show", true);

  setTimeout(() => {
    notification.classList.toggle("show", false);
  }, 8000);
}

window.onload = function () {
  const savedEmail = localStorage.getItem("email");

  if (savedEmail) {
    emailInput.value = savedEmail;
    validateEmail();
  }
};
