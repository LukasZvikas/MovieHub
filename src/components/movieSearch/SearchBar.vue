<template>
  <div class="input-group mb-3 search-bar">
    <div class="search-bar items-wrap">
      <input class="form-control" @input="onInputChange" placeholder="Search movies">
      <div class="search-bar circle"></div>
    </div>
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

<style lang="scss">
.search-bar {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  background: #001226;

  &.circle {
    border-radius: 50%;
    background-color: $secondary;
    width: 3.2rem;
    height: 3.2rem;
    position: absolute;
    right: 0;
    box-shadow: 0 2rem 3rem rgba(0, 0, 0, 1);
  }

  &.items-wrap {
    height: 3rem;
    width: 16rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }
}
</style>
