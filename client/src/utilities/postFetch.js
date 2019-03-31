import { getAuthToken } from "./localStorage";

export default async ({ urlPath, body, parameters = {} }) => {
  const url = new URL(urlPath);

  const token = getAuthToken();

  const params = {
    ...parameters
  };
  url.search = new URLSearchParams(params);

  try {
    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ ...body }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const data = await result.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};
