<template>
  <div>
    <svg
      class="circle-chart"
      viewBox="0 0 33.83098862 33.83098862"
      width="70"
      height="70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="circle-chart__background"
        stroke="whitesmoke"
        stroke-width="2"
        fill="none"
        cx="16.91549431"
        cy="16.91549431"
        r="15.91549431"
      ></circle>
      <circle
        class="circle-chart__circle"
        stroke="#f70963"
        stroke-width="2"
        :stroke-dasharray="`${this.formatAverage(vote_average)} 100`"
        stroke-linecap="round"
        fill="none"
        cx="16.91549431"
        cy="16.91549431"
        r="15.91549431"
      ></circle>
      <g class="circle-chart__info">
        <text
          class="circle-chart__percent font-weight-bold"
          x="16.91549431"
          y="16"
          alignment-baseline="central"
          text-anchor="middle"
          font-size="8"
          fill="#fff"
        >{{this.formatAverage(vote_average)}}%</text>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    vote_average: Number
  },
  methods: {
    formatAverage(avg) {
      return avg
        .toString()
        .split(".")
        .join("");
    }
  }
};
</script>

<style>
.circle-chart__circle {
  animation: circle-chart-fill 2s reverse;
  transform: rotate(-90deg);
  transform-origin: center;
}

@keyframes circle-chart-fill {
  to {
    stroke-dasharray: 0 100;
  }
}
</style>

