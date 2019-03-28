<template>
  <div class="input-group date-picker d-flex justify-content-center mb-2">
    <div class="date-picker__heading text-light">Look for movies by their release date month</div>
    <vue-monthly-picker
      @selected="onDateChange"
      v-model="selectedMonth"
      :monthLabels="months"
      placeholder="Select a month"
    ></vue-monthly-picker>
  </div>
</template>

<script>
import VueMonthlyPicker from "vue-monthly-picker";
import { mapMutations } from "vuex";
export default {
  components: {
    VueMonthlyPicker
  },
  data() {
    return {
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      selectedMonth: ""
    };
  },
  methods: {
    ...mapMutations(["setSearchDate"]),
    onDateChange() {
      this.$emit("dateChange", this.selectedMonth);
      this.setSearchDate(this.selectedMonth);
    }
  }
};
</script>

<style lang="scss">
input {
  @extend .form-control;
  width: 100%;
}

.date-picker {
  width: 17rem;
  margin: 0 auto;

  &__heading {
    text-align: center;
    padding: 0 2rem 1rem 2rem;
  }
}

.popover-container {
  width: 100%;
}
</style>
