<template>
  <div style="    display: grid;
    grid-template-columns: 30% 70%;
    height: 100vh;">
    <SearchBar @termChange="onTermChange"/>
    <div style="overflow: auto; margin: 2rem;">
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
  methods: {
    onTermChange(searchTerm) {
      this.searchQuery = searchTerm;

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
            console.log("RESPONSE is", res);
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
