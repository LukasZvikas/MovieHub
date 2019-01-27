
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

      <div class="col-sm-12 col-md-8 movie-overview-description" style="padding: 1.5rem">
        <h1 class="movie-overview-title font-weight-bolder">
          {{title}}
          <span
            class="font-weight-light"
            style="    color: grey;
    font-size: 1.5rem;"
          >({{release_date.slice(0,4)}})</span>
        </h1>
        <div class="d-flex align-items-center">
          <h5>User Score</h5>
          <PercentCircle :vote_average="vote_average"/>
        </div>
        <h3>Overview</h3>
        <div>{{description}}</div>
        <div class="row">
          <div
            class="movie-overview-genres col-md-auto"
            v-for="(item, index) in genres"
            :key="index"
          >{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PercentCircle from "../svg/PercentCircle";
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
export default {
  components: {
    PercentCircle
  },
  props: {
    title: String,
    description: String,
    backdrop_path: String,
    poster_path: String,
    genres: Array,
    release_date: String,
    vote_average: Number
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
  color: $white;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  padding: 1.5rem;
}
.movie-overview-title {
}

.movie-overview-genres {
  background: $primary;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
}

.wrp {
}
</style>
