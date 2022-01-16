<template>
  <div class="layout">
    <!-- NavBar -->
    <NavBar />

    <!-- main -->
    <b-container>
      <Nuxt />
    </b-container>
  </div>
</template>

<script>
import NavBar from "~/components/NavBar";

export default {
  components: {
    NavBar,
  },
};
</script>
