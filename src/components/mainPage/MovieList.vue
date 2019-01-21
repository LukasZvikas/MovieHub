<template>
  <div class="movie-list-wrapper">
    <div style="color: #fff; display:flex; justify-content: center; font-size: 2.2rem;">
      <div style="padding: 0.4rem 1rem; font-weight: bold; border: 1px solid #c69963;">{{title}}</div>
    </div>
    <div :id="caroID" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        {{window.width}}
        <MovieListItem
          v-for="(movieItem, index) in sliceMovieArray(movies)"
          :class="{active: index===0}"
          :key="index"
          :movies="movieItem"
        />
      </div>
      <a class="carousel-control-prev" :href="`#${caroID}`" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" :href="`#${caroID}`" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
import MovieListItem from "./MovieListItem";
export default {
  components: {
    MovieListItem
  },
  props: {
    movies: Object,
    title: String,
    caroID: Number
  },
  data() {
    return {
      window: {
        width: window.innerWidth
      }
    };
  },
  mounted() {
    console.log("params", this.$router.params)
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    sliceMovieArray: function(arr) {
      let count = arr.length;
      let from = 0;
      let to = this.columnSetter();
      const newArr = [];

      while (count > 0) {
        if (this.window.width >= 720) {
          newArr.push(arr.slice(from, to));
          from = from + 4;
          to = to + 4;
          count = count - 4;
        } else if (this.window.width <= 720) {
          newArr.push(arr.slice(from, to));
          from = from + 2;
          to = to + 2;
          count = count - 2;
        } else if (this.window.width <= 540) {
          newArr.push(arr.slice(from, to));
          from = from + 1;
          to = to + 1;
          count = count - 1;
        }
      }
      return newArr;
    },
    columnSetter() {
      switch (true) {
        case this.window.width >= 1120:
          return 4;
          break;
        case this.window.width >= 960:
          return 3;
          break;
        case this.window.width <= 540:
          return 1;
          break;
        case this.window.width <= 960:
          return 2;
          break;
      }
    },
    handleResize() {
      this.window.width = window.innerWidth;
    }
  }
};
</script>

<style>
.movie-list-wrapper:first-child {
  margin-top: 2rem;

}
</style>
