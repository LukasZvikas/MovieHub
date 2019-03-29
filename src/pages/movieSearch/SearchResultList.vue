<template>
  <div data-test="movie-search-background-image" class="p-2 w-100" :class="showBackgoundImage">
    <div v-if="searchResult.length !== 0 && this.searchQuery.length">
      <div
        class="search-term"
        data-test="movie-search-query-result-heading"
      >Movies matching: "{{searchQuery}}"</div>
      <div class="row">
        <movie-list-item v-for="(item, index) in searchResult" :key="index" :movie="item"/>
      </div>
    </div>
    <div v-else-if="isFilterByDate && this.searchResult.length > 0" :class="showBackgoundImage">
      <div class="search-term" data-test="movie-search-query-result-heading">
        <div class="font-weight-bold">{{displayDate.year}}</div>
        <div class="text-center heading-1 p-0" style="font-size: 2.5rem;">{{displayDate.month}}</div>
      </div>
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
        :heading="'Discover movies here'"
        :textBody="'Our database stores pretty much every movie ever made. Give it a shot!'"
      />
    </div>
  </div>
</template>

<script>
import MovieListItem from "../../components/MovieListItem";
import SearchHeading from "./SearchHeading";
import { months } from "../../utilities/months";
import { mapGetters } from "vuex";
export default {
  components: {
    MovieListItem,
    SearchHeading
  },
  props: {
    searchResult: Array,
    searchQuery: String,
    isFilterByDate: Boolean
  },
  computed: {
    ...mapGetters(["getSearchDate"]),
    showBackgoundImage() {
      if (this.searchQuery.length !== 0 && this.searchResult.length === 0) {
        return "image back-img-not-found";
      }
      return this.searchResult.length === 0
        ? "image back-img-initial"
        : "movie-list";
    },
    displayDate() {
      const date = this.getSearchDate;
      const year = date.slice(0, 4);
      const elements = date.split("");
      const month = months(elements[elements.length - 1]);
      return { year, month };
    }
  }
};
</script>

<style lang="scss">
.search-term {
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 1rem;
}
.search-text-wrap {
  position: relative;
  top: 4rem;
}

.back-img-not-found {
  @include image("../../assets/images/homeAlone.jpg", rgba(255, 47, 47, 0.6));
}
.back-img-initial {
  @include image("../../assets/images/revenant.jpg", rgba(25, 20, 20, 0.6));
}
.movie-list {
  width: 100%;
  height: 100%;
}
</style>


