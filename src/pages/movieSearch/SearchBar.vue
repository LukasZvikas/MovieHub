<template>
  <div class="input-group mb-1 search-bar">
    <div class="search-bar items-wrap">
      <input
        class="form-control"
        @input="onInputChange"
        placeholder="Search movies"
        @focus="onInputFocusChange"
        @blur="onInputFocusChange"
      >
      <div class="search-icon position-absolute d-flex justify-content-center align-items-center">
        <template v-if="isFocused">
          <magnifying-glass :fill="'#dc143c'"/>
        </template>
        <template v-else>
          <magnifying-glass :fill="'#a2a2a2'"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import MagnifyingGlass from "../../components/svg/MagnifyingGlass";
export default {
  components: {
    MagnifyingGlass
  },
  data() {
    return {
      isFocused: false
    };
  },
  methods: {
    onInputFocusChange() {
      this.isFocused = !this.isFocused;
    },
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
  background: $primary;

  &.items-wrap {
    height: 3rem;
    width: 17rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
  }

  .search-icon {
    right: 5px;
  }
}
</style>
