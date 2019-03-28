import { keys } from "../keys";
import { getAuthToken } from "./localStorage";

export default async ({ urlPath, parameters = {}, toApi = false }) => {
  const url = new URL(urlPath);

  console.log("URL", url);

  const params = {
    api_key: keys.TMDB_API_KEY,
    ...parameters
  };
  url.search = new URLSearchParams(params);

  const headers = determineHeaders(toApi);

  try {
    const result = await fetch(url, {
      headers
    });
    const data = await result.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

function determineHeaders(toApi) {
  const headers = {};
  toApi
    ? headers
    : (headers.Authorization = `Bearer ${getAuthToken() || null}`);
  return headers;
}
