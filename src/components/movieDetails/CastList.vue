<template>
  <div style="margin: 2rem 0">
    <div class="movie-overview-heading mb-1">Top Billed Cast</div>
    <div class="row">
      <div
        class="shadow-sm col-auto col-sm-auto  col-md-auto d-flex justify-content-center"
        v-for="(item, index) in cast"
        :key="index"
      >
        <cast-list-item
          :profile_path="item.profile_path"
          :name="item.name"
          :character="item.character"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CastListItem from "./CastListItem";
export default {
  components: {
    CastListItem
  },
  props: {
    cast: Array
  }
};
</script>

<style lang="scss">
.movie-overview-heading {
  text-align: center;
  color: whitesmoke;
  font-size: 2rem;
  background-color: $primary;
}
</style>
