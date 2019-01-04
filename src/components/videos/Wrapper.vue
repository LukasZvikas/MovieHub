<template>
  <div>
    <SearchBar @termChange="onTermChange"></SearchBar>
    <div class="row">
      <Player :selectedVideo="selectedVideo"/>
      <VideoList :videos="videos" @onVideoSelect="onSelectedVideo"/>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import Player from "./Player";
import { keys } from "../../keys";

export default {
  components: {
    SearchBar,
    VideoList,
    Player
  },
  data: function() {
    return {
      videos: "",
      selectedVideo: null
    };
  },
  methods: {
    onSelectedVideo: function(video) {
      console.log("video", video);
      this.selectedVideo = video;
    },
    onTermChange: function(searchTerm) {
      const url = new URL("https://www.googleapis.com/youtube/v3/search");

      const params = {
        part: "snippet",
        key: keys.YT_API_KEY,
        type: "video",
        q: searchTerm
      };
      url.search = new URLSearchParams(params);
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

<style>
.row {
  display: flex;
  padding: 0 3rem 3rem 3rem;
  justify-content: center;
}
.main-content-wrap {
  display: flex;
}
</style>
