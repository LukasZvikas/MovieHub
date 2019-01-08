<template>
  <div>
    <div style="color: #fff; text-align: center; font-size: 2.2rem;">Popular Movies</div>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        {{window.width}}
        <PopularListItem
          v-for="(movieItem, index) in sliceMovieArray(movies)"
          :class="{active: index===0}"
          :key="index"
          :movies="movieItem"
        />
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<script>
import PopularListItem from "./PopularListItem";
export default {
  components: {
    PopularListItem
  },
  props: {
    movies: Object
  },
  data() {
    return {
      window: {
        width: window.innerWidth
      }
    };
  },
  mounted: function() {
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
          from = from + to;
          to = to + to;
          count = count - to;
        } else if (this.window.width <= 720) {
          newArr.push(arr.slice(from, to));
          from = from + to;
          to = to + to;
          count = count - to;
        } else if (this.window.width < 540) {
          newArr.push(arr.slice(from, to));
          from = from + to;
          to = to + to;
          count = count - to;
        }
      }
      return newArr;
    },
    columnSetter: function() {
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
    handleResize: function() {
      this.window.width = window.innerWidth;
    }
  }
};
</script>

<style>
.carousel {
  margin: 2rem;
}
</style>
