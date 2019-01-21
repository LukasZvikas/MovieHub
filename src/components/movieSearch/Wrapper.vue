<template>
  <div>
    <SearchBar @termChange="onTermChange"/>
    <SearchResultList :searchResult="searchResult"/>
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
      searchResult: []
    };
  },
  methods: {
    onTermChange(searchTerm) {
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
