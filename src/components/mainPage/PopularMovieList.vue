<template>
  <div class="container">
    <div class="row">
    <PopularListItem v-for="movie in movies" :key="movie.id" :movie="movie"/>
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
  }
};
</script>

<style>
</style>
