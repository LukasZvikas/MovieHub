<template>
  <div class="bg-dark h-100">
    <div class="text-center font-weight-bold heading-1">Your Watchlist</div>
    <watch-list :movies="watchlist"/>
  </div>
</template>

<script>
import fetchFactory from "../../utilities/fetch";
import WatchList from "./WatchList";

export default {
  components: {
    WatchList
  },
  data() {
    return {
      watchlist: []
    };
  },
  created() {
    this.getUpcomingMovies("upcoming");
  },
  methods: {
    async getUpcomingMovies(listType) {
      const url = `https://api.themoviedb.org/3/movie/${listType}`;

      const params = {
        sort_by: "popularity.desc",
        region: "US",
        page: 1
      };

      const response = await fetchFactory(url, params);
      console.log("rresss", response);
      this.watchlist = response.results.slice(0, 5);
    }
  }
};
</script>

<style>
</style>
