<template>
  <div class="row justify-content-center align-items-center auth image">
    <form @submit.prevent="handleSubmit" class="form col-md-4 col-xs-12">
      <div class="h3" style="margin-bottom: 2rem">Create new account</div>
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
import { setAuthToken } from "../../utils/localStorage";
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {}
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
              console.log("RES", res);
              this.handleSuccess(res.token);
            })
          )
          .catch(error => console.log("ERROR", error));
      }
    }
  }
};
</script>

<style>
.image {
  background: linear-gradient(
      59deg,
      rgba(16, 29, 44, 0.7) 53%,
      rgba(16, 29, 44, 0.7) 76%
    ),
    url("../pacific.jpg") no-repeat center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.auth {
  width: 100%;
  height: 90%;
}
.row {
  margin-left: 0;
}
</style>
