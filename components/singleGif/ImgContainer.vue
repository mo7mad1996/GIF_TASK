<template>
  <div class="img-container">
    <div>
      <img
        :src="img.url"
        :alt="alt"
        ref="img"
        @loadend="in_load = !in_load"
        :class="{ in_load }"
      />

      <Loading v-if="in_load" />
    </div>
  </div>
</template>

<script>
// components
import Loading from "~/components/singleGif/Loading";

export default {
  name: "ImgContainer",
  props: ["img", "alt"],
  mounted() {
    if (process.client) {
      this.$refs.img.scrollIntoView();
    }
  },
  data() {
    return {
      in_load: true,
    };
  },
  components: { Loading },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100vh;
  object-fit: contain;
  z-index: 2;
}

.img-container > div {
  position: relative;
}
.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
img.in_load {
  opacity: 0;
}
</style>
