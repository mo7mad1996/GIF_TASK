<template>
  <b-col
    cols="12"
    class="loading_container"
    title="Loading more GIFs for you ♥♥..."
  >
    <div class="loading"></div>
  </b-col>
</template>

<script>
export default {
  name: "Loding",
};
</script>

<style scoped>
.loading_container {
  margin: 20px;
  display: grid;
  place-items: top center;
  height: 30px;
}

.loading {
  position: relative;
}
.loading,
.loading::before,
.loading::after {
  height: 30px;
  width: 5px;
  background: #444;
  animation: loading 0.6s infinite;
  box-shadow: 0 0 2px #3334;
}
.loading::before {
  left: 10px;
  animation-delay: 0.2s;
}
.loading::after {
  animation-delay: 0.4s;
  right: 10px;
}
.loading::before,
.loading::after {
  content: "";
  position: absolute;
}

@keyframes loading {
  from,
  to {
    height: 30px;
  }
  50% {
    height: 0;
  }
}
</style>
