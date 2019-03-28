import { getAuthToken } from "./localStorage";

export default async ({ urlPath, movieDetails, parameters = {} }) => {
  const url = new URL(urlPath);

  console.log("deee", movieDetails);

  const token = getAuthToken();

  console.log("token", token)

  const params = {
    ...parameters
  };
  url.search = new URLSearchParams(params);

  try {
    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ ...movieDetails }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    const data = await result.json();

    console.log("data", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
