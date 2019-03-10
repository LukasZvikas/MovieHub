<template>
  <div class="row w-100">
    <form
      @submit.prevent="handleSubmit"
      class="col-8 col-md-3 d-flex flex-column justify-content-center align-items-center"
    >
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          @input="onEmailChange"
        >
        <div class="text-center text-danger" style="height: 1.5rem; margin-top: 0.4rem
"></div>
      </div>

      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          @input="onPasswordChange"
        >
        <div class="text-center text-danger" style="height: 1.5rem; margin-top: 0.4rem
"></div>
      </div>

      <div class="form-group">
        <label for="exampleInputPassword1">Password Confirm</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password Confirm"
        >
        <div class="text-center text-danger" style="height: 1.5rem; margin: 0.4rem
"></div>
      </div>
      <button class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
import { validateEmail } from "../authentication/validations";
import { mapMutations } from "vuex";
import { setAuthToken, getAuthToken } from "../../utilities/localStorage";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      successMessage: ""
    };
  },
  methods: {
    ...mapMutations(["setUserAuth"]),

    onEmailChange(e) {
      this.email = e.target.value;
    },
    onPasswordChange(e) {
      this.password = e.target.value;
    },
    handleSuccess(token) {
      if (!token) return;
      setAuthToken(token);
      this.setUserAuth();
    },
    handleSubmit() {
      const url = new URL("http://localhost:5000/update");
      if (!validateEmail(this.email)) {
        const err = { email: "Please, enter a valid email" };
        this.errors = { ...err };
      } else {
        fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            token: getAuthToken()
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res =>
            res.json().then(res => {
              console.log("RESSSS", res);
              //this.handleSuccess(res.token);
            })
          )
          .catch(error => console.log("ERROR", error));
      }
    }
  }
};
</script>

<style lang="scss">
</style>
