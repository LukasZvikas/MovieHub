
<template>
  <div :style="setBackgroundImage">
    <div class="wrp row" style="width:80%">
      <div
        class="col-sm-12 col-md-4"
        style="  
    object-fit: cover;
    display: flex;
    justify-content: center; align-items: center;"
      >
        <img
          style="     height: 100%;
    width: 100%; padding: 1rem;
    object-fit: cover;"
          :src="getPosterPath(poster_path)"
        >
      </div>

      <div class="col-sm-12 col-md-8 movie-overview-description">
        <div class="movie-overview-title">{{title}}</div>
        <div>{{description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
export default {
  props: {
    title: String,
    description: String,
    backdrop_path: String,
    poster_path: String
  },
  computed: {
    setBackgroundImage() {
      return {
        "background-image": `linear-gradient(59deg, rgba(25,20,20,0.5) 53%, rgba(25, 20, 20, 0.8) 76%), url(${this.getPosterPath(
          this.backdrop_path
        )})`,
        "background-repeat": "no repeat",
        "background-position": "center",
        "background-size": "cover",
        display: "flex",
        "justify-content": "center"
      };
    }
  },
  methods: {
    getPosterPath(path) {
      return generatePosterPath(path);
    }
  }
};
</script>

<style lang="scss">
.movie-overview-description {
  text-align: center;
  color: $white;
  padding: 0 2rem 2rem 2rem;
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
}
.movie-overview-title {
  font-size: 2rem;
}

.wrp {
}
</style>
