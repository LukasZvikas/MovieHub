<template>
  <div class="bg-dark h-100">
    <div class="text-center font-weight-bold heading-1">Your Favorites</div>
    <favorites-list :movies="movies"/>
  </div>
</template>

<script>
import FavoritesList from "./FavoritesList";
import fetchFactory from "../../utilities/fetch";
export default {
  components: { FavoritesList },
  data() {
    return {
      movies: []
    };
  },
  created() {
    this.getPopularMovies("popular");
  },
  methods: {
    async getPopularMovies(listType) {
      const url = `https://api.themoviedb.org/3/movie/${listType}`;

      const params = {
        sort_by: "popularity.desc",
        region: "US"
      };

      const response = await fetchFactory(url, params);
      console.log("res", response);
      this.movies = response.results.slice(0, 4);
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
