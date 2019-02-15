<template>
  <div class="profile__recommended-list h-100 row d-flex flex-direction-column">
    <movie-list-item v-for="(movie, index) in recommended" :key="index" :movie="movie"/>
  </div>
</template>

<script>
import fetchFactory from "../../utilities/fetch";
import { mapGetters } from "vuex";
import MovieListItem from "../reusable/MovieListItem";

export default {
  components: {
    MovieListItem
  },
  props: {
    movie_id: Number
  },
  data() {
    return {
      recommended: []
    };
  },
  created() {
    const usersFavorites = this.getUserData.favorites;
    const randomId = this.createRandomSuggestion(usersFavorites);
    console.log("rand", randomId);
    this.getRecommendedMovies(usersFavorites[randomId]);
  },
  computed: {
    ...mapGetters(["getUserData"])
  },
  methods: {
    createRandomSuggestion(arr) {
      return Math.abs(Math.floor(Math.random() * arr.length - 1));
    },
    async getRecommendedMovies(movie_id) {
      const url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations`;

      const response = await fetchFactory(url);

      console.log(response);

      this.recommended = response.results.slice(0, 4);
    }
  }
};
</script>

<style lang="scss">
.profile__recommended-list {
  height: 12rem;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $primary;
}
</style>
