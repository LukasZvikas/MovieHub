<template>
  <ul>
    <VideoListItem v-for="video in videos" :key="video.etag" :video="video"/>
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
  mount: {
  }
};
</script>

<style>
</style>