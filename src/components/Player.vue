
<template>
  <div class="col-6 video-player-wrapper">
      <div class="video-player" v-if="selectedVideo">
        <div class="embed-responsive embed-responsive-16by9">
          <iframe class="embed-responsive-item" :src="getVideoURL" frameborder="0"></iframe>
        </div>
        <div class="card player">
          <h5>{{ selectedVideo.snippet.title }}</h5>
          <div class>{{ selectedVideo.snippet.description }}</div>
        </div>
      </div>
    </div>
</template>


<script>
export default {
  props: {
    selectedVideo: Object
  },
  computed: {
    getVideoURL: function() {
      const url = this.selectedVideo.id.videoId;
      return `https://youtube.com/embed/${url}`;
    }
  }
};
</script>


<style>
.card.player {
  margin: 0;
  padding: 1rem;
}
.video-player-wrapper {
  display: flex;
  justify-content: center;
  margin: 1rem 0 1rem 0;
}
.video-player {
  height: 30%;
  width: 100%;
}
</style>
