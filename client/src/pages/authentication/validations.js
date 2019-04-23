export const validateEmail = email => {
  if (
    !email.match(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    return false;
  }
  return true;
};

export const validatePassword = password => {
  if (password.length <= 5) {
    return false;
  }
  return true;
};
