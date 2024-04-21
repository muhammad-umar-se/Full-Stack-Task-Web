import { REGEX } from './constants';

const IsEmailValid = (email: string) => {
    return REGEX.EMAIL_VALIDATION.test(email);
};

const IsPasswordValid = (password: string) => {
  const regEx = new RegExp(REGEX.PASSWORD_VALIDATION);
  if (!regEx.test(password)) {
    return false;
  }
  return true;
};

const GetPasswordStrength = (password: string) => {
  let calculatedStrength = 0;

  // Minimum length of 8 characters
  if (password.length >= 8) {
    calculatedStrength++;
  }

  // Contains at least 1 lower case
  if (new RegExp('[a-z]').test(password)) {
    calculatedStrength++;
  }

  // Contains at least 1 upper case
  if (new RegExp('[A-Z]').test(password)) {
    calculatedStrength++;
  }

  // Contains at least 1 number
  if (new RegExp('[0-9]').test(password)) {
    calculatedStrength++;
  }

  // Contains at least 1 special character
  if (new RegExp('[#?!@$%^&*-]').test(password)) {
    calculatedStrength++;
  }

  return calculatedStrength;
};

export {
  IsEmailValid,
  IsPasswordValid,
  GetPasswordStrength
};
