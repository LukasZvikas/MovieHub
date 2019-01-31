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

const search_data = {
  results: [
    {
      adult: false,
      backdrop_path: "/wqtaHWOEZ3rXDJ8c6ZZShulbo18.jpg",
      id: 332562,
      overview:
        "Seasoned musician Jackson Maine discovers—and falls in love with—struggling artist Ally. She has just about given up on her dream to make it big as a singer—until Jack coaxes her into the spotlight. But even as Ally's career takes off, the personal side of their relationship is breaking down, as Jack fights an ongoing battle with his own internal demons.",
      poster_path: "/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg",
      release_date: "2018-10-03",
      title: "A Star Is Born",
      vote_average: 7.5
    }
  ]
};

export default async (urlProp, parameters = {}) => {
  if (urlProp === "https://api.themoviedb.org/3/movie/")
    return await new Promise(resolve => {
      resolve(data);
    });
  else if (
    urlProp === "https://api.themoviedb.org/3/movie//credits" ||
    "https://api.themoviedb.org/3/movie/popular" ||
    "https://api.themoviedb.org/3/movie/upcoming"
  ) {
    console.log("this is it", urlProp);
    return await new Promise(resolve => {
      resolve(search_data);
    });
  }
};
