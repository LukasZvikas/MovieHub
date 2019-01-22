<template>
  <div style="color: #000">
    {{searchResult.length}}
    <div v-if="searchResult.length !== 0">
      <div style="font-size: 1.4rem; text-align: center;">Movies matching: "{{searchQuery}}"</div>
    </div>
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
    searchResult: Array,
    searchQuery: String
  }
};
</script>

<style>
</style>
