<template>
  <div class="row justify-content-center align-items-center auth image back-image">
    <form @submit.prevent="handleSubmit" class="form col-10 col-md-6 col-lg-4 px-4 py-4">
      <h2 class="p-2 d-flex text-center">Create new account</h2>
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
          name="password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          @input="onPasswordChange"
        >
        <div
          class="text-center text-danger"
          style="height: 1.5rem; margin: 0.4rem"
        >{{errors.password}}</div>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password Confirm</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password Confirm"
          @input="onPasswordConfirmChange"
        >
        <div
          class="text-center text-danger"
          style="height: 1.5rem; margin: 0.4rem
"
        >{{errors.password}}</div>
      </div>

      <button :disabled="passwordMatchValidation" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { validateEmail, validatePassword } from "./validations";
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      errors: {}
    };
  },
  computed: {
    passwordMatchValidation() {
      if (
        this.password === this.passwordConfirm &&
        (this.password.length &&
          this.passwordConfirm.length &&
          this.email.length) > 0
      ) {
        return false;
      }
      return true;
    }
  },
  methods: {
    onEmailChange(e) {
      this.email = e.target.value;
    },
    onPasswordChange(e) {
      this.password = e.target.value;
    },
    onPasswordConfirmChange(e) {
      this.passwordConfirm = e.target.value;
    },
    handleSubmit() {
      if (!validateEmail(this.email)) {
        const err = { email: "Please, enter a valid email" };
        this.errors = { ...err };
      }
      if (!validatePassword(this.password)) {
        const err = { password: "Password must at least 5 characters long" };
        this.errors = { ...this.errors, ...err };
      } else {
        const url = new URL("http://localhost:5000/user/signup");

        fetch(url, {
          method: "POST",
          body: JSON.stringify({ email: this.email, password: this.password }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res =>
            res.json().then(res => {
              if (res.error === "This email is in use") {
                const err = { email: res.error };
                this.errors = { ...err };
              }
              console.log("RES", res);
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
.auth {
  width: 100%;
  height: 100vh;
}
.row {
  margin-left: 0;
}
</style>



