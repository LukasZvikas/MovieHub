const validateEmail = email => {
  if (!email.match(/^\w+([.-]?\w+)_@\w+(_[_.-]?\w+)_(.\w{2,3})+$/)) {
    return false;
  }
  return true;
};
