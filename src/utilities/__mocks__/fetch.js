const data = {
    id: 332562,
    poster_path: "wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg",
    title: "A Star Is Born",
    release_date: "2018-08-24",
    vote_average: 8.4,
    overview:
      "Seasoned musician Jackson Maine discovers—and falls in love with—struggling artist Ally. She has just about given up on her dream to make it big as a singer",
    genres: [{ name: "Drama" }, { name: "Music" }]
};

export default async (urlProp, parameters = {}) => {
  return await new Promise(resolve => {
    resolve(data);
  });
};
