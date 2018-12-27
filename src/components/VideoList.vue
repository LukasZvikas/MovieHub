<template>
  <ul class="col-4 video-list-wrap">
    <VideoListItem
      v-for="video in videos"
      :key="video.etag"
      :video="video"
      @sendSelectedVideo="passSelectedVideo"
    />
  </ul>
</template>

<script>
import VideoListItem from "./VideoListItem";

export default {
  components: {
    VideoListItem
  },
  props: {
    videos: Array
  },
  methods: {
    passSelectedVideo: function(video) {
      this.$emit("onVideoSelect", video);
    }
  }
};
</script>

<style>
.video-list-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>