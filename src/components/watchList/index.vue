<template>
  <div class="bg-dark h-100">
    <div class="text-center font-weight-bold heading-1">Your Watchlist</div>
    <watch-list :movies="movies"/>
  </div>
</template>

<script>
import WatchList from "./WatchList";
import postFetchFactory from "../../utilities/postFetch";
import fetchFactory from "../../utilities/fetch";
import { getAuthToken } from "../../utilities/localStorage";

export default {
  components: {
    WatchList
  },
  data() {
    return {
      movies: []
    };
  },
  async created() {
    const response = await this.findUsersWatchlistMovies();
    
    await response.forEach(async movie_id => {
      const movieDetails = await fetchFactory(
        `https://api.themoviedb.org/3/movie/${movie_id}`
      );

      this.movies.push(movieDetails);
    });
  },
  methods: {
    async findUsersWatchlistMovies() {
      const url = "http://localhost:5000/user/get_user_watchlist";

      const token = getAuthToken();

      const response = await postFetchFactory(url, {
        token,
        type: "watchlist"
      });

      return response.data;
    }
  }
};
</script>

<style>
</style>
