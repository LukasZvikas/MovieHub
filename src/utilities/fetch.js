
import { getAuthToken } from "./localStorage";

export default async ({ urlPath, parameters = {}, toApi = false }) => {
  const url = new URL(urlPath);

  const params = {
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
    throw new Error(err);
  }
};

function determineHeaders(toApi) {
  const headers = {};
  toApi
    ? headers
    : (headers.Authorization = `Bearer ${getAuthToken() || null}`);
  return headers;
}
