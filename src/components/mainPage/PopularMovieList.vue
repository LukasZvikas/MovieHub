<template>
  <div>
    <PopularListItem v-for="movie in movies" :key="movie.id" :movie="movie"/>
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
