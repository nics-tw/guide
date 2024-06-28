import { PasswordInput } from './password-input.mjs';

// Find the HTML element that you want to use as the password input
const passwordInputEl = document.querySelector('.govuk-password-input');

// Create an instance of the PasswordInput component
const passwordInput = new PasswordInput(passwordInputEl);
