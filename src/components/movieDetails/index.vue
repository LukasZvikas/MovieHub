<template>
  <div class="movie-overview container-fluid">
    <MovieDescription
      :title="title"
      :description="description"
      :backdrop_path="backdrop_path"
      :poster_path="poster_path"
      :release_date="release_date"
      :genres="genres"
      :vote_average="vote_average"
    />
    <div class="movie-overview-heading">Top Billed Cast</div>
    <div class="row bg-dark">
      <div
        class="shadow-sm"
        style="padding: 0 1rem 1rem 1rem "
        v-for="(item, index) in cast"
        :key="index"
      >
        <div style=" position: relative;
    height: 15rem;
    width: 9rem;">
          <img
            class="card-img-top img-fluid"
            style="    object-fit: cover;     height: 13rem;
    width: 9rem;"
            :src="getPosterPath(item.profile_path)"
          >

          <div class="card-title" style="height: 2rem">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieDescription from "./MovieDescription";
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
import { keys } from "../../keys";

export default {
  components: {
    MovieDescription
  },
  data() {
    return {
      poster_path: "",
      description: "",
      backdrop_path: "",
      title: "",
      cast: [],
      genres: [],
      release_date: "",
      vote_average: 0
    };
  },
  created() {
    this.fetchMovieDetails();
    this.fetchMovieCredits();
  },

  methods: {
    getPosterPath(path) {
      return generatePosterPath(path);
    },
    getIdFromUrl() {
      const path = window.location.pathname.split("/");
      return path[path.length - 1];
    },
    fetchMovieDetails() {
      const movie_id = this.getIdFromUrl();

      const url = new URL(`https://api.themoviedb.org/3/movie/${movie_id}`);

      const params = {
        api_key: keys.TMDB_API_KEY
      };
      url.search = new URLSearchParams(params);

      fetch(url)
        .then(res =>
          res.json().then(res => {
            this.poster_path = res.poster_path;
            this.description = res.overview;
            this.title = res.title;
            this.backdrop_path = res.backdrop_path;
            this.release_date = res.release_date;
            this.genres = res.genres;
            this.vote_average = res.vote_average;
            console.log("Res", res);
          })
        )
        .catch(err => {
          console.log("err", err);
        });
    },

    fetchMovieCredits() {
      const movie_id = this.getIdFromUrl();

      const url = new URL(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits`
      );

      const params = {
        api_key: keys.TMDB_API_KEY
      };
      url.search = new URLSearchParams(params);

      fetch(url)
        .then(res =>
          res.json().then(res => {
            console.log("Res", res);
            this.cast = res.cast.slice(0, 4);
          })
        )
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>

<style lang="scss">
.movie-overview {
  background-color: $primary;
}
.movie-overview-heading {
  text-align: center;
  color: whitesmoke;
  font-size: 2rem;
  padding: 2rem;
  background-color: $primary;
}
.card-title {
  background-color: whitesmoke;
}
.wrp {
}
.flex-fill {
  flex: 1;
}
</style>
