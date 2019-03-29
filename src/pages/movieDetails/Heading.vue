<template>
  <div class="font-weight-bolder d-flex align-items-center mb-2">
    <h1 class="movie-overview__title" data-test="movie-overview-title">{{title}}</h1>
    <div
      class="font-weight-regular movie-overview__release-date"
      data-test="movie-overview-release-date"
    >({{sliceDate(release_date)}})</div>
  </div>
</template>

<script>
export default {
  props: {
    release_date: String,
    title: String
  },
  methods: {
    sliceDate(date) {
      return date ? date.slice(0, 4) : "...";
    }
  }
};
</script>

<style>
</style>
