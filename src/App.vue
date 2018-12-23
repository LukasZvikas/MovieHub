/* eslint-disable */
<template>
  <div>
    <SearchBar @termChange="onTermChange"></SearchBar>
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar";
const API_KEY = "AIzaSyDLHKoMgoZ5X7_y97ARpDEOPBxp_Jui7hA";

export default {
  components: {
    SearchBar
  },
  data: function() {
    return {};
  },
  methods: {
    onTermChange: function(searchTerm) {
      var url = new URL("https://www.googleapis.com/youtube/v3/search");

      console.log("URL1", url);
      var params = {
        part: "snippet",
        key: API_KEY,
        type: "video",
        q: searchTerm
      };
      url.search = new URLSearchParams(params);

      console.log("URL", url);
      fetch(url, {
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json().then(json => console.log("RES", json)))
        .catch(error => console.log("ERROR", error));
    }
  }
};
</script>