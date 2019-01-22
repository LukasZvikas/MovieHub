<template>
  <div :class="showBackgoundImage">
      <div v-if="searchResult.length !== 0 || undefined">
        <div
          style="font-size: 1.4rem; text-align: center; margin-top: 1rem;"
        >Movies matching: "{{searchQuery}}"</div>
        <div class="row">
          <SearchResultListItem v-for="(item, index) in searchResult" :key="index" :movie="item"/>
        </div>
      </div>
      <div
        v-else-if="this.searchQuery.length !== 0 && this.searchResult.length === 0"
        style="position: relative;top: 4rem;"
      >
        <div style="color: #fff; font-size: 3rem; text-align: center ">Ooops!</div>
        <div
          style="color: #fff; font-size: 1.6rem; text-align: center; margin: 1.6rem 5rem"
        >It appears that the movie your are looking for is not available.</div>
      </div>
      <div v-else style="position: relative;top: 4rem;">
        <div style="color: #fff; font-size: 3rem; text-align: center ">Discover movies here!</div>
        <div
          style="color: #fff; font-size: 1.6rem; text-align: center; margin: 1.6rem 5rem"
        >Our database stores pretty much every movie ever made. Give it a shot and you will see!</div>
      </div>
    </div>
</template>

<script>
import SearchResultListItem from "./SearchResultListItem";
export default {
  components: {
    SearchResultListItem
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
      return this.searchQuery.length === 0 ? "image back-img-initial" : "movie-list";
    }
  }
};
</script>

<style lang="scss">
.back-img-not-found {
  @include image("../homeAlone.jpg", rgba(255, 47, 47, 0.7));
}
.back-img-initial {
  @include image("../revenant.jpg", rgba(16, 29, 44, 0.7));
}
.movie-list {
  width: 100%;
  height: 100%;
}
</style>


