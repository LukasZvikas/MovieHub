<template>
  <div>
    <div style="color: #fff; text-align: center; font-size: 2.2rem;">Popular Movies</div>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
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
  methods: {
    sliceMovieArray: function(arr) {
      console.log("arr", arr);
      let count = arr.length;
      let from = 0;
      let to = 4;
      const newArr = [];
      while (count > 0) {
        newArr.push(arr.slice(from, to));
        from = from + 4;
        to = to + 4;
        count = count - 4;
      }
      return newArr;
    }
  }
};
</script>

<style>
.carousel {
  margin: 2rem;
}
</style>
