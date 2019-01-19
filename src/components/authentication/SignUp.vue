<template>
  <div class="row justify-content-center align-items-center auth image">
    <form @submit.prevent="handleSubmit" class="form col-md-4 col-xs-12">
      <div class="h3">Create new account</div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          name="email"
          type="email"
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
        >
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: ""
    };
  },
  methods: {
    onEmailChange(e) {
      this.email = e.target.value;
      console.log("email", this.email);
    },
    onPasswordChange(e) {
      this.password = e.target.value;
      console.log("pass", this.password);
    },
    onPasswordConfirmChange(e) {
      this.passwordConfirm = e.target.value;
    },
    handleSubmit() {
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
            console.log("RES", res);
          })
        )
        .catch(error => console.log("ERROR", error));
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
  height: 100vh;
}
.row {
  margin-left: 0;
}
</style>



