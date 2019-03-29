<template>
  <div class="heading-2 p-2 heading-bg-color">
    <div
      class="text-center font-weight-bold pb-1 heading-1"
      data-test="movie-search-heading"
      style="padding-top: 0!important"
    >{{heading}}</div>
    <div class="search-text-body" data-test="movie-search-body">{{textBody}}</div>
  </div>
</template>

<script>
export default {
  props: {
    heading: String,
    textBody: String
  }
};
</script>

<style>
.search-text-heading {
  color: #fff;
  font-size: 3rem;
  text-align: center;
}

.heading-bg-color {
  background-color: rgba(25, 20, 20, 0.7);
}

.search-text-body {
  color: #fff;
  font-size: 1.6rem;
  text-align: center;
}
</style>
