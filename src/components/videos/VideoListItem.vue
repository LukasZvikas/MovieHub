<template>
  <div class="card videos" @click="onVideoSelect">
    <div class="card-body-wrap">
      <div class="card-image-wrap">
        <img class="card-image" :src="getThumbnail">
      </div>
      <li class="card-body">{{video.snippet.title}}</li>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    video: Object
  },
  computed: {
    getThumbnail() {
      return this.video.snippet.thumbnails.high.url;
    }
  },
  methods: {
    onVideoSelect: function() {
      this.$emit("sendSelectedVideo", this.video);
    }
  }
};
</script>

<style>
.card.videos {
  margin: 1rem 0 1rem 0;
}
.card-body-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
}
.card-body {
  list-style-type: none;
}
.card-image-wrap {
  width: 100%;
}
.card-image {
  width: 100%;
  height: 100%;
}
</style>
