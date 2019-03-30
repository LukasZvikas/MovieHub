<template>
  <div class="bg-dark h-100">
    <template v-if="!movies">
      <div></div>
    </template>
    <template v-else>
      <div class="text-center font-weight-bold heading-1">Your Favorites</div>
      <favorites-list :movies="movies"/>
    </template>
  </div>
</template>

<script>
import FavoritesList from "./FavoritesList";
import fetchFactory from "../../utilities/fetch";

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

    await response.forEach(async movie_id => {
      const movieDetails = await fetchFactory({
        urlPath: `https://api.themoviedb.org/3/movie/${movie_id}`,
        toApi: true
      });

      this.movies.push(movieDetails);
    });
  },
  methods: {
    async findUsersFavoriteMovies() {
      const urlPath = "http://localhost:5000/user/get_user_favorites";

      const response = await fetchFactory({
        urlPath,
        parameters: {
          type: "favorites"
        }
      });
      return response.data;
    }
  }
};
</script>

<style lang="scss">
</style>
