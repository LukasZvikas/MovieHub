<template>
  <div class="row" style="height: 90vh">
    <div class="col-sm-12 col-md-3 bg-dark">
      <SearchBar @termChange="onTermChange"/>
      <DatePicker @dateChange="onDateChange"/>
    </div>
    <div class="col-sm-12 col-md-9" :style="determineClass">
      <SearchResultList
        :searchResult="searchResult"
        :searchQuery="searchQuery"
        :isFilterByDate="isFilterByDate"
      />
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
      searchQuery: "",
      isFilterByDate: true
    };
  },
  computed: {
    determineClass() {
      return this.searchResult.length === 0
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

      const urlPath = "https://api.themoviedb.org/3/search/movie";
      const parameters = {
        language: "en-US",
        query: searchTerm,
        page: 1,
        include_adult: false
      };
      const response = await fetchFactory({ urlPath, parameters, toApi: true });
      console.log("this.reposne", response);
      this.searchResult = response.results;
    },
    async onDateChange(date) {
      const fromDate = `${date._i}/1`.replace(/\//g, "-");
      const toDate = `${date._i}/28`.replace(/\//g, "-");

      const urlPath = `https://api.themoviedb.org/3/discover/movie`;
      const parameters = {
        language: "en-US",
        region: "US",
        page: 1,
        include_adult: false,
        "primary_release_date.gte": fromDate,
        "primary_release_date.lte": toDate
      };
      const response = await fetchFactory({ urlPath, parameters, toApi: true });
      console.log("RESPONSE", response.results);
      this.searchResult = response.results;
    }
  }
};
</script>

<style>
</style>
