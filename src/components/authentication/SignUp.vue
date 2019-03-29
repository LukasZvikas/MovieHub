<template>
  <div class="row justify-content-center align-items-center auth image back-image">
    <template v-if="errors.length">
      <div class="auth-message-modal bg-danger">
        <template v-for="(error, index) in errors">
          <div
            :key="index"
            class="d-flex justify-content-center align-items-center h-100 text-center p-2"
          >{{ error }}</div>
        </template>
      </div>
    </template>
    <template v-else-if="successMessage">
      <div class="auth-message-modal bg-success">
        <div class="d-flex justify-content-center align-items-center h-100 text-center p-2">
          {{ successMessage }} You can
          <router-link to="/login" class="nav-link text-black font-weight-bold px-2">Login</router-link>now
        </div>
      </div>
    </template>

    <form @submit.prevent="handleSubmit" class="form col-10 col-md-6 col-lg-4 px-4 py-4">
      <h2 class="pb-2 d-flex text-center">Create a new account</h2>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          @input="onEmailChange"
        >
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
      errors: [],
      successMessage: ""
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
      if (!validatePassword(this.password)) {
        this.errors = [];
        this.errors.push("Password must be at least 5 characters long");
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
              if (res.error) {
                this.errors = [];
                this.errors.push(res.error);
              } else this.successMessage = res.success;
            })
          )
          .catch(error => {
            console.log("ERR", error);
          });
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
