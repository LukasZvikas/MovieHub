<template>
  <div class="row auth">
    <form class="form col-md-4 col-xs-12">
      <div
        style="font-size: 1.6rem; margin-bottom: 1.6rem; color: #fff; text-align: center"
      >Create new account</div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
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
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style>
.form-group {
  width: 100%;
}

.form-wrapper {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.form {
  width: 100%;
  color: #fff;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #001226;
  border: 1px solid #ffc815;
}
.btn-primary {
  background-color: #ffc815;
  border-color: #ffc815;
  margin: 2rem;
}

.row {
  width: 100%;
}
.auth {
    margin: 5.3rem 0 0 0; width: 100%;     height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
