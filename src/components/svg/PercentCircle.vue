<template>
  <div>
    <svg
      class="circle-chart"
      viewBox="0 0 36 36"
      width="70"
      height="70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      ></path>

      <path
        class="circle-chart__circle"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        :stroke="determineColor()"
        stroke-width="2"
        :stroke-dasharray="`${this.formatAverage(vote_average)} 100`"
        stroke-linecap="round"
      ></path>
      <g class="circle-chart__info">
        <text
          data-test="movie-overview-average"
          class="circle-chart__percent font-weight-bold"
          x="18"
          y="17"
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
    determineColor() {
      if (this.vote_average < 5.0) {
        return "#f70963";
      }
      return "#48AE48";
    },
    formatAverage(avg) {
      return avg
        ? avg
            .toString()
            .split(".")
            .join("")
        : "...";
    }
  }
};
</script>

<style>
.circle-bg {
  fill: none;
  stroke: rgba(46, 49, 49, 1);
  stroke-width: 4.2;
}
.circle-chart__circle {
  animation: circle-chart-fill 2s reverse;
  transform: rotate(-90deg);
  transform-origin: center;
  fill: none;
  stroke-width: 2.5;
}

@keyframes circle-chart-fill {
  to {
    stroke-dasharray: 0 100;
  }
}
</style>

