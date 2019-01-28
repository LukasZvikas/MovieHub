import { keys } from "../keys";

export const fetchMovieDetails = (urlProp, parameters = {}) => {
  console.log("prop", urlProp);
  console.log("param", parameters);

  const url = new URL(`https://api.themoviedb.org/3/movie/${urlProp}`);

  const params = {
    api_key: keys.TMDB_API_KEY,
    ...parameters
  };
  url.search = new URLSearchParams(params);

  fetch(url)
    .then(res =>
      res.json().then(res => {
        console.log("RESPONSE", res);
        return res;
      })
    )
    .catch(err => {
      return err;
    });
};
