/* eslint-disable */
// v-bind:videos="videos" also valid
<template>
  <div>
    <SearchBar @termChange="onTermChange"></SearchBar>
    <VideoList :videos="videos"/>
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
const API_KEY = "AIzaSyDLHKoMgoZ5X7_y97ARpDEOPBxp_Jui7hA";

export default {
  components: {
    SearchBar,
    VideoList
  },
  data: function() {
    return {
      videos: ""
    };
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
        .then(res =>
          res.json().then(res => {
            this.videos = res.items;
          })
        )
        .catch(error => console.log("ERROR", error));
    }
  }
};
</script>