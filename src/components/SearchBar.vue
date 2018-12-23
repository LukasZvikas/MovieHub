/* eslint-disable */
<template>
  <div>
    <input @input="onInputChange">
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

