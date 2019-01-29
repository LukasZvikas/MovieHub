import { keys } from "../keys";

export default async (urlPath, parameters = {}) => {
  const url = new URL(urlPath);

  console.log("params", parameters);
  const params = {
    api_key: keys.TMDB_API_KEY,
    ...parameters
  };
  url.search = new URLSearchParams(params);

  try {
    const result = await fetch(url);
    const data = await result.json();
    console.log("DATA", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
