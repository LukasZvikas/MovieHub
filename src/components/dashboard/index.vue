<template>
  <div class="dashboard-wrap">
    <CarouselList :movies="popularMovies" :title="'Popular Movies'" :caroID="'carousel-1'"/>
    <CarouselList :movies="comingSoon" :title="'Coming Soon'" :caroID="'carousel-2'"/>
  </div>
</template>

<script>
import CarouselList from "./CarouselList";
import { keys } from "../../keys";
import fetchFactory from "../../utilities/fetch";
export default {
  components: {
    CarouselList
  },
  data: function() {
    return {
      popularMovies: [],
      comingSoon: []
    };
  },
  created() {
    this.getPopularMovies("popular");
    this.getPopularMovies("upcoming");
  },
  methods: {
    async getPopularMovies(listType) {
      const url = `https://api.themoviedb.org/3/movie/${listType}`;

      const params = {
        sort_by: "popularity.desc",
        region: "US"
      };

      const response = await fetchFactory(url, params);
      switch (listType) {
        case "popular":
          this.popularMovies = response.results;
          break;
        case "upcoming":
          this.comingSoon = response.results;
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.dashboard-wrap {
  z-index: 2;
  overflow: auto;
  background: $primary;
}
</style>
