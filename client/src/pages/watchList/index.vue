<template>
  <div class="bg-dark h-100" :style="determineMargin">
    <div class="text-center font-weight-bold heading-1">Your Watchlist</div>
    <div v-if="!movies.length" class="w-100 d-flex justify-content-center">
      <div
        class="heading-2"
        style="margin: 0 2rem 0 2rem;"
      >You don't have any movies on your watchlist list yet</div>
    </div>
    <template v-else>
      <watch-list :movies="movies"/>
    </template>
  </div>
</template>

<script>
import WatchList from "./WatchList";
import Spinner from "../../components/Spinner";
import fetchFactory from "../../utilities/fetch";
import { getAuthToken } from "../../utilities/localStorage";

export default {
  components: {
    WatchList,
    Spinner
  },
  data() {
    return {
      movies: []
    };
  },
  async created() {
    const response = await this.findUsersWatchlistMovies();

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
        return "margin-bottom: 2rem";
      }
      return "margin-bottom: 21rem";
    }
  },
  methods: {
    async findUsersWatchlistMovies() {
      const urlPath = `/user/getList/watchlist`;

      const token = getAuthToken();

      const response = await fetchFactory({
        urlPath
      });

      return response.data;
    }
  }
};
</script>

<style>
</style>
