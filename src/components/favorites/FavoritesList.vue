<template>
  <div class="row">
    <div
      class="favorites__list-item card col-sm-5 grow d-flex justify-content-start align-items-start p-2"
      :style="setBackgroundImage(movie.backdrop_path)"
      v-for="(movie, index) in movies"
      :key="index"
      @click="showMovieDetails(movie.id)"
      data-test="favorites-list-item-wrapper"
    >
      <template v-if="!getPosterPath(movie.backdrop_path)">
        <div
          class="d-flex justify-content-center align-items-center flex-column position-absolute h-100 w-100"
          style="top: 0; left:0;"
        >
          <image-icon/>

        </div>
      </template>
      <favorites-list-item :title="movie.title" :vote_average="movie.vote_average"/>
    </div>
  </div>
</template>

<script>
import FavoritesListItem from "./FavoritesListItem";
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
import ImageIcon from "../svg/ImageIcon";
export default {
  components: {
    FavoritesListItem,
    ImageIcon
  },
  props: {
    movies: Array,
    itemShadeOnHover:
      "linear-gradient(59deg, rgba(25,20,20,0.7) 53%, rgba(25, 20, 20, 0.8) 76%),"
  },

  methods: {
    getPosterPath(path) {
      return generatePosterPath(path);
    },
    setBackgroundImage(path) {
      return path
        ? {
            "background-image": `linear-gradient(59deg, rgba(25,20,20,0.3), rgba(25, 20, 20, 0.3)), url(${this.getPosterPath(
              path
            )})`,
            "background-repeat": "no repeat",
            "background-position": "center",
            "background-size": "cover"
          }
        : "background-color: #000";
    },
    showMovieDetails(id) {
      this.$router.push({ path: `/movie/${id}` });
    }
  }
};
</script>

<style lang="scss">
.favorites__list-item {
  height: 14rem;
  margin: 1rem;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $primary;
}

.grow {
  transition: all 0.2s ease-in-out;
}
.grow:hover {
  transform: scale(1.05);
}
</style>
