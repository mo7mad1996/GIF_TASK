<template>
  <div
    class="loading"
    :style="`background:#${background}; height: ${height}`"
    ref="loading"
  >
    {{ post.title }}
  </div>
</template>

<script>
export default {
  name: "Load",
  props: ["post"],
  data() {
    return {
      height: "0",
    };
  },
  computed: {
    background: () =>
      process.client
        ? Math.floor(Math.random() * 10 ** 6)
            .toString()
            .padStart(6, "0")
        : "",
  },
  mounted() {
    this.height =
      (+this.$refs.loading.getClientRects()[0].width *
        +this.post.images.downsized.height) /
        +this.post.images.downsized.width +
      "px";
  },
};
</script>

<style scoped>
.loading {
  color: #eee;

  position: relative;
  display: grid;
  place-items: center;
  text-align: center;
  margin: 10px;
  padding: 10px;

  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 0 5px #777;
}
.loading::after {
  content: "";
  height: 100%;
  position: absolute;
  width: 200px;
  background-image: linear-gradient(to left, #fff2, transparent);
  transform: skewX(15deg);

  animation: loading 2s infinite;
}

@keyframes loading {
  from {
    left: -100%;
  }
  to {
    left: 100%;
  }
}
</style>
