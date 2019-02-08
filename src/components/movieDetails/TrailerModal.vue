<template>
  <div class="modal-container d-flex h-100">
    <div class="modal-video d-flex justify-content-center align-items-center">
      <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.modal-container {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(24,24,24,0.8);
}
.modal-video {
  height: 850px;
  width: 950px;
  margin: auto;
}
</style>
