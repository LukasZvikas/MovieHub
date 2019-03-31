export const generatePosterPath = poster_path => {
  return poster_path
    ? `http://image.tmdb.org/t/p/original/${poster_path}`
    : false;
};
