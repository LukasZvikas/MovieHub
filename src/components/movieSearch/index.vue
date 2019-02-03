<template>
  <div class="row" style="height: 90vh">
    <div class="col-sm-12 col-md-3">
      <SearchBar @termChange="onTermChange"/>
    </div>
    <div class="col-sm-12 col-md-9" :style="determineClass">
      <SearchResultList :searchResult="searchResult" :searchQuery="searchQuery"/>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";
import { keys } from "../../keys";
import fetchFactory from "../../utilities/fetch";
export default {
  components: {
    SearchBar,
    SearchResultList
  },
  data() {
    return {
      searchResult: [],
      searchQuery: ""
    };
  },
  computed: {
    determineClass() {
      return this.searchQuery.length === 0
        ? ""
        : "background: whitesmoke; overflow: auto;";
    }
  },

  methods: {
    async onTermChange(searchTerm) {
      this.searchQuery = searchTerm;
      if (this.searchQuery.length === 0) {
        this.searchResult = [];
        return;
      }

      const url = "https://api.themoviedb.org/3/search/movie";
      const params = {
        language: "en-US",
        query: searchTerm,
        page: 1,
        include_adult: false
      };
      const response = await fetchFactory(url, params);
      this.searchResult = response.results;
    }
  }
};
</script>

<style>
</style>
