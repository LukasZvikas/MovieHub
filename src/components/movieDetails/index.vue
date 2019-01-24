<template>
  <div class="movie-overview">
    <div class="movie-description-wrap">
      <div class="container" style="box-shadow: none">
        <div class="row">
          <div
            class="col-sm-12 col-md-4"
            style="  
    object-fit: cover;
    display: flex;
    justify-content: center;"
          >
            <img
              class="img-fluid"
              style="    height: 100%;
    width: 100%;
    object-fit: cover;"
              :src="getPosterPath(poster_path)"
            >
          </div>
          <div class="col-sm-12 col-md-8 movie-overview-description" :style="setBackgroundImage">
            <div class="movie-overview-title">{{title}}</div>
            <div style="height: 100%; width:100%">{{description}}</div>
          </div>
          <div class="col-md-12">
            <div class="row">
              <div
                class="col-sm-4 col-md-2 shadow-sm"
                style="margin: 0.5rem;  width: 10rem;    height: 18rem;"
                v-for="(item, index) in cast"
                :key="index"
              >
                <div style="height: 14.5rem;">
                  <img
                    class="card-img-top"
                    style="    object-fit: cover;
    height: 100%;
    width: 100%;"
                    :src="getPosterPath(item.profile_path)"
                  >
                </div>
                <div class="card-title">{{item.name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { keys } from "../../keys";
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
export default {
  data() {
    return {
      poster_path: "",
      description: "",
      backdrop_path: "",
      title: "",
      cast: []
    };
  },
  created() {
    this.fetchMovieDetails();
    this.fetchMovieCredits();
  },
  computed: {
    setBackgroundImage() {
      return {
        "background-image": `linear-gradient(59deg, rgba(25,20,20,0.5) 53%, rgba(25, 20, 20, 0.8) 76%), url(${this.getPosterPath(
          this.backdrop_path
        )})`,
        "background-repeat": "no repeat",
        "background-position": "center",
        "background-size": "cover"
      };
    }
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
  display: flex;
  justify-content: center;
  background-color: $primary;
}
.movie-description-wrap {
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  width: 60rem;
}
.movie-overview-description {
  text-align: center;
  padding: 2rem;
  background-color: whitesmoke;
  color: $white;
}
.movie-overview-title {
  font-size: 2rem;
}
</style>
