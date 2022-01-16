<template>
  <div :class="{ open }" @click="open = !open">
    <img
      :src="item.img"
      alt="my GIF"
      class="image"
      :class="{ loaded }"
      @loadend="loaded = !loaded"
    />
    <div class="loading" v-if="!loaded">
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageComponent",

  props: ["item"],
  data() {
    return {
      open: false,
      loaded: false,
    };
  },
};
</script>

<style scoped>
.image {
  display: block;
  width: 100%;
  margin-top: 10px;
}

.open {
  position: fixed;
  inset: 0;
  background: #2228;
  padding: 10px;
  z-index: 2;
  opacity: 0;
}

.image {
  opacity: 0;
}

.image.loaded {
  opacity: 1;
}

.open .image {
  width: 100%;
  height: 100%;
  margin: 0;
  object-fit: contain;
}

.loading {
  display: grid;
  place-items: center;
}
.circle {
  position: relative;
  width: 50px;
  height: 50px;
  border-top-color: #16a085;
}
.circle::before,
.circle::after,
.circle {
  border: 2px solid transparent;
  border-top-color: #16a085;
  border-radius: 50%;
  animation: rotate 1s linear infinite;
}
.circle::after,
.circle::before {
  position: absolute;
  content: "";
}
.circle::before {
  border-top-color: #f9c922;

  inset: 6px;
}
.circle::after {
  animation: rotate 2s linear infinite reverse;
  border-top-color: #e74c3c;
  inset: 2px;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  from {
    transform: rotate(360deg);
  }
}
</style>
