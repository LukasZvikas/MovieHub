<template>
  <div class="bg-dark h-100">
    <div class="text-center font-weight-bold heading-1">Your Favorites</div>
    <favorites-list :movies="movies"/>
  </div>
</template>

<script>
import FavoritesList from "./FavoritesList";
import postFetchFactory from "../../utilities/postFetch";
import fetchFactory from "../../utilities/fetch";
import { getAuthToken } from "../../utilities/localStorage";

export default {
  components: { FavoritesList },
  data() {
    return {
      movie_ids: [],
      movies: []
    };
  },
  async created() {
    const response = await this.findUsersFavoriteMovies();
    console.log("respone", response);
    await response.forEach(async movie_id => {
      const movieDetails = await fetchFactory(
        `https://api.themoviedb.org/3/movie/${movie_id}`
      );

      console.log("movieDetails", movieDetails)
      this.movies.push(movieDetails);
    });
    console.log("movies", this.movies);
  },
  methods: {
    async findUsersFavoriteMovies() {
      const url = "http://localhost:5000/user/get_user_favorites";

      const token = getAuthToken();

      const response = await postFetchFactory(url, { token });

      return response.data;
    }
  }
};
</script>

<style lang="scss">
.heading-1 {
  background: linear-gradient(59deg, rgb(255, 28, 114) 0%, rgb(226, 2, 87) 54%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 3.5rem;
}
</style>
