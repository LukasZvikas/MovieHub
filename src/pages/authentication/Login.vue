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

    <form @submit.prevent="handleSubmit" class="form col-10 col-md-6 col-lg-4 px-4 py-5">
      <h2
        class="text-center mb-2 heading-1"
        style="padding-bottom: 1!important; font-size: 2.6rem;"
      >Login to your account</h2>
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
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          @input="onPasswordChange"
        >
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
      errors: []
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
    handleError() {
      this.errors.auth =
        "An error occured trying to create your account. Please try again";
    },
    handleSuccess(token) {
      if (!token) return;
      setAuthToken(token);
      this.setUserAuth();
      this.$router.push("/");
    },
    handleSubmit() {
      const url = new URL("http://localhost:5000/user/signin");
      if (!validateEmail(this.email)) {
        this.errors.push({ email: "Please, enter a valid email" });
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
              if (res.error) {
                this.errors = [];
                this.errors.push(res.error);
              } else this.handleSuccess(res.token);
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
  @include image("../../assets/images/pacific.jpg", rgba(0, 0, 0, 0.7));
}
</style>
