<template>
  <div class="row" style="height: 90vh">
    <div class="col-sm-12 col-md-3 bg-dark">
      <SearchBar @termChange="onTermChange"/>
      <DatePicker @dateChange="onDateChange"/>
    </div>
    <div class="col-sm-12 col-md-9" :style="determineClass">
      <SearchResultList :searchResult="searchResult" :searchQuery="searchQuery"/>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar";
import DatePicker from "./DatePicker";
import SearchResultList from "./SearchResultList";
import { keys } from "../../keys";
import fetchFactory from "../../utilities/fetch";
export default {
  components: {
    SearchBar,
    SearchResultList,
    DatePicker
  },
  data() {
    return {
      searchResult: [],
      searchQuery: ""
    };
  },
  computed: {
    determineClass() {
      return this.searchQuery.length === 0
        ? ""
        : "background: whitesmoke; overflow: auto;";
    }
  },

  methods: {
    async onTermChange(searchTerm) {
      this.searchQuery = searchTerm;
      if (this.searchQuery.length === 0) {
        this.searchResult = [];
        return;
      }

      const url = "https://api.themoviedb.org/3/search/movie";
      const params = {
        language: "en-US",
        query: searchTerm,
        page: 1,
        include_adult: false
      };
      const response = await fetchFactory(url, params);
      this.searchResult = response.results;
    },
    async onDateChange(date) {
      // this.searchQuery = searchTerm;
      // if (this.searchQuery.length === 0) {
      //   this.searchResult = [];
      //   return;
      // }
      const fromDate = `${date._i}/1`.replace(/\//g, "-");
      const toDate = `${date._i}/28`.replace(/\//g, "-");
      console.log("HAHAHAHA", fromDate, toDate);
      const url = `https://api.themoviedb.org/3/discover/movie`;
      const params = {
        language: "en-US",
        region: "US",
        page: 1,
        include_adult: false,
        "primary_release_date.gte": fromDate,
        "primary_release_date.lte": toDate
      };
      const response = await fetchFactory(url, params);
      console.log("RESPONSE", response.results);
      this.searchResult = response.results;
    }
  }
};
</script>

<style>
</style>
