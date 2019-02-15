<template>
  <div data-test="movie-search-background-image" :class="showBackgoundImage">
    <div v-if="searchResult.length !== 0 || searchResult === undefined">
      <div
        class="search-term"
        data-test="movie-search-query-result-heading"
      >Movies matching: "{{searchQuery}}"</div>
      <div class="row">
        <movie-list-item v-for="(item, index) in searchResult" :key="index" :movie="item"/>
      </div>
    </div>
    <div
      v-else-if="this.searchQuery.length !== 0 && this.searchResult.length === 0"
      class="search-text-wrap"
    >
      <SearchHeading
        :heading="'Ooops!'"
        :textBody="'It appears that the movie your are looking for is not available.'"
      />
    </div>
    <div v-else class="search-text-wrap">
      <SearchHeading
        :heading="'Discover movies here!'"
        :textBody="'Our database stores pretty much every movie ever made. Give it a shot and you will see!'"
      />
    </div>
  </div>
</template>

<script>
import MovieListItem from "../reusable/MovieListItem"
import SearchHeading from "./SearchHeading";
export default {
  components: {
    MovieListItem,
    SearchHeading
  },
  props: {
    searchResult: Array,
    searchQuery: String
  },
  computed: {
    showBackgoundImage() {
      if (this.searchQuery.length !== 0 && this.searchResult.length === 0) {
        return "image back-img-not-found";
      }
      return this.searchQuery.length === 0
        ? "image back-img-initial"
        : "movie-list";
    }
  }
};
</script>

<style lang="scss">
.search-term {
  font-size: 1.4rem;
  text-align: center;
  margin-top: 1rem;
}
.search-text-wrap {
  position: relative;
  top: 4rem;
}

.back-img-not-found {
  @include image("../homeAlone.jpg", rgba(255, 47, 47, 0.6));
}
.back-img-initial {
  @include image("../revenant.jpg", rgba(25, 20, 20, 0.6));
}
.movie-list {
  width: 100%;
  height: 100%;
}
</style>


