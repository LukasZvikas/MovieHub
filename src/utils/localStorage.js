const AUTH_TOKEN = "auth_token";

export const getAuthToken = () => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN);
    return token ? token : null;
  } catch {
    return null;
  }
};

export const setAuthToken = token => {
  try {
    localStorage.setItem(AUTH_TOKEN, token);
    return token;
  } catch (err) {
    return err;
  }
};

export const removeAuthToken = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN);
    return;
  } catch {
    return null;
  }
};
