/* eslint-disable */
<template>
  <div class="input-group mb-3 search-bar-wrap">
    <input class="form-control" @input="onInputChange">
  </div>
</template>

<script>
export default {
  methods: {
    onInputChange: function(e) {
      this.$emit("termChange", e.target.value);
    }
  }
};
</script>

<style>
.search-bar-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
}

.input-group>.form-control {
  width: 35%;
  flex: none;
}
</style>


