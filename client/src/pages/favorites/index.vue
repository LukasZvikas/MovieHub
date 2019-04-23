<template>
  <div class="bg-dark h-100" :style="determineMargin">
    <div class="text-center font-weight-bold heading-1">Your Favorites</div>
    <div v-if="!movies.length" class="w-100 d-flex justify-content-center">
      <div class="heading-2" style="margin: 0 2rem 0 2rem;">You don't have any movies on your favorites list yet</div>
    </div>
    <template v-else>
      <favorites-list :movies="movies"/>
    </template>
  </div>
</template>

<script>
import FavoritesList from "./FavoritesList";
import fetchFactory from "../../utilities/fetch";
import SearchHeading from "../movieSearch/SearchHeading";

export default {
  components: { FavoritesList, SearchHeading },
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
  computed: {
    determineMargin() {
      if (this.movies.length) {
        return "margin-bottom: 5rem";
      }
      return "margin-bottom: 21rem";
    }
  },

  methods: {
    async findUsersFavoriteMovies() {
      const urlPath = "/user/getList/favorites";

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
