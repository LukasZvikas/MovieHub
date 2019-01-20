/* eslint-disable */
// v-bind:videos="videos" also valid

<template>
  <div class="container">
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";
import { getAuthToken } from "./utils/localStorage";
import { mapMutations } from "vuex";
export default {
  components: {
    Header
  },
  created() {
    this.getUser();
  },
  methods: {
    ...mapMutations(["setUserAuth"]),
    handleSuccess() {
      const checkToken = getAuthToken();
      console.log("token", checkToken);
      if (checkToken) {
        this.setUserAuth();
      }
    },
    getUser() {
      const url = new URL("http://localhost:5000/user");
      const token = getAuthToken();
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res =>
          res.json().then(res => {
            console.log("RES", res);
            this.handleSuccess(res.token);
          })
        )
        .catch(error => console.log("ERROR", error));
    }
  }
};
</script>


