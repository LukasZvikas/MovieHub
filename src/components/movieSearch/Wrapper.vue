<template>
  <div class="row" style="height: 100vh">
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
      return this.searchQuery.length === 0 ? "" : "background: whitesmoke; overflow: auto;";
    }
  },

  methods: {
    onTermChange(searchTerm) {
      this.searchQuery = searchTerm;
      if (this.searchQuery.length === 0) {
        this.searchResult = [];
        return;
      }

      const url = new URL("https://api.themoviedb.org/3/search/movie");

      const params = {
        api_key: keys.TMDB_API_KEY,
        language: "en-US",
        query: searchTerm,
        page: 1,
        include_adult: false
      };
      url.search = new URLSearchParams(params);

      fetch(url)
        .then(res =>
          res.json().then(res => {
            console.log("res", res.results)
            this.searchResult = res.results;
          })
        )
        .catch(err => {
          console.log("ERROR IS", err);
        });
    }
  }
};
</script>

<style>
</style>
