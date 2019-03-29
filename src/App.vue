/* eslint-disable */
<template>
  <div class="container-fluid">
    <Header/>
    <div style="margin-top: 6rem">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import { getAuthToken, removeAuthToken } from "./utilities/localStorage";
import { mapMutations } from "vuex";
export default {
  components: {
    Header
  },
  created() {
    this.getUser();
  },
  methods: {
    ...mapMutations(["setUserAuth", "setUserData", "logout"]),
    handleSuccess(data) {
      const checkToken = getAuthToken();
      if (checkToken) {
        this.setUserAuth();
        this.setUserData(data);
      }
    },
    handleError(error) {
      removeAuthToken();
      this.logout();
      this.$router.push("/");
    },
    getUser() {
      const url = new URL("http://localhost:5000/user");
      const token = getAuthToken();

      if (!token) return;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res =>
          res.json().then(res => {
            this.handleSuccess(res);
          })
        )
        .catch(error => this.handleError(error));
    }
  }
};
</script>


