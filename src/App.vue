/* eslint-disable */
// v-bind:videos="videos" also valid

<template>
  <div class="container-fluid">
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";
import { getAuthToken, removeAuthToken } from "./utils/localStorage";
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
      if (checkToken) {
        this.setUserAuth();
      }
    },
    handleError(error) {
      removeAuthToken();
      this.$router.push("/");
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
            this.handleSuccess(res.token);
          })
        )
        .catch(error => handleError(error));
    }
  }
};
</script>


