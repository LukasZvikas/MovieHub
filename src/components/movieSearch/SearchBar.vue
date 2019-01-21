<template>
  <div class="input-group mb-3 search-bar-wrap">
    <input class="form-control" @input="onInputChange">
  </div>
</template>

<script>
export default {
  methods: {
    onInputChange(e) {
      this.$emit("termChange", e.target.value);
    }
  }
};
</script>

<style>
</style>
