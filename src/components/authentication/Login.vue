<template>
  <div class="row justify-content-center align-items-center auth image back-image">
    <form @submit.prevent="handleSubmit" class="form col-10 col-md-6 col-lg-4 px-4 py-5">
      <h2 class="text-center mb-2">Login to your account</h2>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          @input="onEmailChange"
        >
        <div
          class="text-center text-danger"
          style="height: 1.5rem; margin-top: 0.4rem
"
        >{{errors.email}}</div>
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
        <div
          class="text-center text-danger"
          style="height: 1.5rem; margin-top: 0.4rem
"
        >{{errors.password}}</div>
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { validateEmail } from "./validations";
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
  mounted() {
    if (getAuthToken()) {
      this.$router.push("/");
    }
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
      this.$router.push("/", () => {
        this.successMessage = "You have logged in successfully";
      });
    },
    handleSubmit() {
      const url = new URL("http://localhost:5000/user/signin");
      if (!validateEmail(this.email)) {
        const err = { email: "Please, enter a valid email" };
        this.errors = { ...err };
      } else {
        fetch(url, {
          method: "POST",
          body: JSON.stringify({ email: this.email, password: this.password }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res =>
            res.json().then(res => {
              this.handleSuccess(res.token);
            })
          )
          .catch(error => console.log("ERROR", error));
      }
    }
  }
};
</script>

<style lang="scss">
.back-image {
  @include image("../pacific.jpg", rgba(0, 0, 0, 0.7));
}
.row {
  margin-left: 0;
}
</style>
