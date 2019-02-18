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
      <div class="form-group" style="margin-bottom: 1.9rem">
        <label>Gender</label>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios2"
            value="option2"
          >
          <label class="form-check-label" for="exampleRadios2">Male</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios2"
            value="option2"
          >
          <label class="form-check-label" for="exampleRadios2">Female</label>
        </div>
      </div>

      <div class="form-group row d-flex flex-column" style="margin-bottom: 1.9rem">
        <label>Birthdate</label>
        <div class="d-flex justify-content-around">
          <select class="custom-select col-3">
            <option selected>Month</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <select class="custom-select col-3">
            <option selected>Day</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <select class="custom-select col-3">
            <option selected>Year</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
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
