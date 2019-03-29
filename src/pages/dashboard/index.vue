<template>
  <div class="dashboard-wrap">
    <image-heading/>
    <carousel-list :movies="popularMovies" :title="'Popular Movies'" :caroID="'carousel-1'"/>
    <carousel-list :movies="comingSoon" :title="'Coming Soon'" :caroID="'carousel-2'"/>
  </div>
</template>

<script>
import CarouselList from "./CarouselList";
import ImageHeading from "./ImageHeading";
import fetchFactory from "../../utilities/fetch";
export default {
  components: {
    CarouselList,
    ImageHeading
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
      const urlPath = `https://api.themoviedb.org/3/movie/${listType}`;

      const params = {
        sort_by: "popularity.desc",
        region: "US"
      };

      const response = await fetchFactory({ urlPath, params });
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
