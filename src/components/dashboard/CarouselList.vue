<template>
  <div class="movie-list-wrapper">
    <div class="d-flex justify-content-center align-items-center">
      <div class="heading-2" :data-test="caroID">{{title}}</div>
    </div>
    <div :id="caroID" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <CarouselListItem
          v-for="(movieItem, index) in sliceMovieArray(movies)"
          :class="{active: index===0}"
          :key="index"
          :movies="movieItem"
          data-test="carousel"
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
import CarouselListItem from "./CarouselListItem";
export default {
  components: {
    CarouselListItem
  },
  props: {
    movies: Array,
    title: String,
    caroID: String
  },
  data() {
    return {
      window: {
        width: window.innerWidth
      }
    };
  },
  mounted() {
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
        } else if (this.window.width < 720) {
          newArr.push(arr.slice(from, to));
          from = from + 2;
          to = to + 2;
          count = count - 2;
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
        case this.window.width < 960:
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

<style lang='scss'>
.movie-list-wrapper:first-child {
  margin-top: 2rem;
}
</style>
