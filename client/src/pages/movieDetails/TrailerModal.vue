<template>
  <div
    :class="`trailer-modal-container d-flex h-100 ${checkTrailerState}`"
    data-test="trailer-modal-container"
  >
    <div
      class="trailer-modal-content-wrapper d-flex justify-content-center align-items-center flex-column"
    >
      <div class="trailer-modal-heading">
        <div class="trailer-modal-heading-exit" @click="closeAndStopTrailer">
          <div class="trailer-modal-heading-exit-line"></div>
          <div class="trailer-modal-heading-exit-line"></div>
        </div>
      </div>
      <div class="embed-responsive embed-responsive-16by9">
        <iframe
          class="embed-responsive-item"
          :src="`https://www.youtube.com/embed/${trailer_id}?rel=0`"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    trailer_id: String
  },
  computed: {
    ...mapGetters(["isTrailerShown"]),
    checkTrailerState() {
      const trailerState = this.isTrailerShown;
      if (!trailerState) return "hidden";

      if (document.querySelector("iframe"))
        document.querySelector("iframe").src = `https://www.youtube.com/embed/${
          this.trailer_id
        }?rel=0`;
      return "visible";
    }
  },
  methods: {
    ...mapMutations(["closeTrailer"]),
    closeAndStopTrailer() {
      if (document.querySelector("iframe"))
        document.querySelector("iframe").src = "";
      this.closeTrailer();
    }
  }
};
</script>

<style lang="scss">
.trailer-modal-container {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(24, 24, 24, 0.8);
  z-index: 100;
}
.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.visible {
  visibility: visible;
  opacity: 1;
  transition: visibility 0s, opacity 0.5s ease-out;
}
.trailer-modal-content-wrapper {
  height: 850px;
  width: 950px;
  margin: auto;
}
.trailer-modal-heading {
  background-color: $black;
  width: 100%;
  height: 2.6rem;
  display: flex;
  justify-content: flex-end;
}

.trailer-modal-heading-exit {
  display: flex;
  align-items: center;
  padding-right: 1.5rem;
}

.trailer-modal-heading-exit:hover > .trailer-modal-heading-exit-line {
  background: $white;
}
.trailer-modal-heading-exit > div:first-child {
  transform: rotate(45deg);
}
.trailer-modal-heading-exit > div:last-child {
  transform: rotate(-45deg);
}
.trailer-modal-heading-exit-line {
  width: 2px;
  height: 20px;
  background: #a2a2a2;
  position: absolute;
}
</style>
