
<template>
  <div data-test="movie-overview-description-wrapper" :style="setBackgroundImage">
    <div class="movie-overview-description-width row">
      <div class="col-sm-12 col-md-4 movie-overview-poster-wrap">
        <img
          data-test="movie-overview-poster"
          class="movie-overview-poster p-1 h-100 w-100"
          :src="getPosterPath(movie_details.poster_path)"
        >
      </div>

      <div class="col-sm-12 col-md-8 movie-overview-description p-2 d-flex justify-content-center">
        <div class="movie-overview-title font-weight-bolder d-flex align-items-center mb-2">
          <h1 data-test="movie-overview-title" style="margin-right: 0.5rem">{{movie_details.title}}</h1>
          <span
            class="font-weight-regular movie-overview-release-date"
            data-test="movie-overview-release-date"
          >({{sliceDate(movie_details.release_date)}})</span>
        </div>
        <div class="row d-flex justify-content-start align-items-center">
          <div class="col-sm-auto col-md-auto d-flex align-items-center mr-1 mb-4 mb-sm-0">
            <h6 class="font-weight-bold mr-1">
              <div>User</div>
              <div>Score</div>
            </h6>
            <PercentCircle :vote_average="movie_details.vote_average"/>
          </div>
          <div
            class="movie-overview-add-favorites d-flex justify-content-center align-items-center mr-1"
          >
            <Bookmark class="svgclass" :fill="'#fff'"/>
          </div>
          <div
            class="movie-overview-add-favorites d-flex justify-content-center align-items-center"
            @click="addMovieToFavorites"
            data-test="movie-overview-favorites-button"
          >
            <Favorite class="svgclass" :fill="determineFill"/>
          </div>
        </div>
        <div class="mb-2">
          <h3 class="font-weight-bold mt-2">Overview</h3>
          <div data-test="movie-overview-body">{{movie_details.overview}}</div>
        </div>
        <div class="row">
          <div
            data-test="movie-overview-genre"
            class="movie-overview-genres m-1 col-4 col-md-4 p-1"
            v-for="(item, index) in movie_details.genres"
            :key="index"
          >{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PercentCircle from "../svg/PercentCircle";
import Bookmark from "../svg/Bookmark";
import Favorite from "../svg/Favorite";
import { getAuthToken } from "../../utilities/localStorage";
import { generatePosterPath } from "../../utilities/tmdbPosterPath";
import postFetchFactory from "../../utilities/postFetch";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    PercentCircle,
    Bookmark,
    Favorite
  },

  props: {
    movie_details: Object
  },
  computed: {
    ...mapGetters(["isFavorite"]),
    setBackgroundImage() {
      return {
        "background-image": `linear-gradient(59deg, rgba(25,20,20,0.7) 53%, rgba(25, 20, 20, 0.8) 76%), url(${this.getPosterPath(
          this.movie_details.backdrop_path
        )})`,
        "background-repeat": "no repeat",
        "background-position": "center",
        "background-size": "cover",
        display: "flex",
        "justify-content": "center"
      };
    },
    determineFill() {
      const favorited = this.isFavorite;
      if (favorited) return "#f70963";
      return "#fff";
    }
  },
  methods: {
    ...mapMutations(["addToFavorites", "removeFromFavorites"]),
    getPosterPath(path) {
      return generatePosterPath(path);
    },
    sliceDate(date) {
      return date ? date.slice(0, 4) : "...";
    },
    async addMovieToFavorites() {
      const token = getAuthToken();
      const { id } = this.movie_details;
      const movieData = { token, movie_id: id };

      const response = await postFetchFactory(
        "http://localhost:5000/user/add_to_favorites",
        movieData
      );

      if (response.status === "added") this.addToFavorites();
      else if (response.status === "removed") this.removeFromFavorites();
    }
  }
};
</script>

<style lang="scss">
.movie-overview-description {
  color: $white;
  display: flex;
  flex-direction: column;
}

.movie-overview-poster-wrap {
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.movie-overview-release-date {
  color: grey;
  font-size: 1.5rem;
}
.movie-overview-poster {
  object-fit: cover;
}
.movie-overview-add-favorites {
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  background-color: rgba(1, 1, 1, 0.6);
  border: 2px solid $white;

  &:hover {
    background-color: $white;
  }
  &:hover > .svgclass {
    fill: $black;
  }
}
.movie-overview-genres {
  background: $primary;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $secondary;
}

.movie-overview-description-width {
  width: 80%;
}
</style>
