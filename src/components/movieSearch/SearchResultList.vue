<template>
  <div style="color: #000">this is results
    <div class="row">
      <SearchResultListItem v-for="(item, index) in searchResult" :key="index" :movie="item"/>
    </div>
  </div>
</template>

<script>
import SearchResultListItem from "./SearchResultListItem";
export default {
  components: {
    SearchResultListItem
  },
  props: {
    searchResult: Array
  }
};
</script>

<style>
</style>
