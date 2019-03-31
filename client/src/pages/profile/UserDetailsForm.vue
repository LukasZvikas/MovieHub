<template>
  <div class="row w-100">
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
        <div
          class="d-flex justify-content-center align-items-center h-100 text-center p-2"
        >{{ successMessage }}</div>
      </div>
    </template>
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
          :value="getUsersEmail"
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
      <button class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
import { validateEmail } from "../authentication/validations";
import { mapMutations, mapGetters } from "vuex";
import { setAuthToken, getAuthToken } from "../../utilities/localStorage";
import postFetchFactory from "../../utilities/postFetch";

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
    ...mapGetters(["getUserData"]),
    getUsersEmail() {
      this.email = this.getUserData.email;
      return this.email;
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
    onPasswordConfirmChange(e) {
      this.passwordConfirm = e.target.value;
    },
    handleSuccess(token) {
      if (!token) return;
      setAuthToken(token);
      this.setUserAuth();
    },
    async handleSubmit() {
      const urlPath = "/user/update";
      if (!this.email || !this.password) {
        this.errors = [];
        this.errors.push("Please fill up all of the fields");
      } else if (!validateEmail(this.email)) {
        this.errors = [];
        this.errors.push("Please enter a valid email");
      } else if (this.password !== this.passwordConfirm) {
        this.errors = [];
        this.errors.push("Your passwords must match");
      } else {
        this.errors = [];
        const body = { email: this.email, password: this.password };

        const response = await postFetchFactory({
          urlPath,
          body
        });
        this.successMessage = response.success;
      }
    }
  }
};
</script>

<style lang="scss">
</style>
