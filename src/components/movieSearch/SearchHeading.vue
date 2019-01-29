
<template>
  <div>
    <div class="search-text-heading" data-test="text-heading">{{heading}}</div>
    <div class="search-text-body" data-test="text-body">{{textBody}}</div>
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

.search-text-body {
  color: #fff;
  font-size: 1.6rem;
  text-align: center;
  margin: 1.6rem 5rem;
}
</style>
