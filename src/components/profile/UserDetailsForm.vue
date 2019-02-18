<template>
  <div class="row w-100">
    <div class="col-8 col-md-3 d-flex flex-column justify-content-center align-items-center">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
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
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
</style>
