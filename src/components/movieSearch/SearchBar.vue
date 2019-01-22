<template>
  <div
    class="input-group mb-3 search-bar-wrap"
    style="  display: flex;
    align-items: flex-start;
    height: 100vh;
    background: #001226;"
  >
    <div class="search-bar-items-wrap">
      <input class="form-control" @input="onInputChange" placeholder="Search movies">
      <div class="search-bar-circle"></div>
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
.search-bar-circle {
  border-radius: 50%;
  background-color: $secondary;
  width: 3.2rem;
  height: 3.2rem;
  position: absolute;
  right: 0;
  box-shadow: 0 2rem 3rem rgba(0, 0, 0, 1);
}
.search-bar-items-wrap {
  height: 3rem;
  width: 16rem;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-top: 2rem;
}
</style>
