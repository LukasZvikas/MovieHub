<template>
  <div class="profile__recommended-list h-100 row d-flex flex-direction-column">
    <recommended-list-item v-for="(movie, index) in recommended" :key="index" :movie_data="movie"/>
  </div>
</template>

<script>
import fetchFactory from "../../utilities/fetch";
import { mapGetters } from "vuex";
import RecommendedListItem from "./RecommendedListItem";

export default {
  components: {
    RecommendedListItem
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
    this.getRecommendedMovies(this.getUserData.favorites[0]);
  },
  computed: {
    ...mapGetters(["getUserData"])
  },
  methods: {
    async getRecommendedMovies(movie_id) {
      const url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations`;

      const response = await fetchFactory(url);
      console.log(response.results);
      this.recommended = response.results.slice(0, 4);
    },

    setBackgroundImage(path) {
      return {
        "background-image": `linear-gradient(59deg, rgba(25,20,20,0.3), rgba(25, 20, 20, 0.3)), url(${this.getPosterPath(
          path
        )})`,
        "background-repeat": "no repeat",
        "background-position": "center",
        "background-size": "cover"
      };
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
