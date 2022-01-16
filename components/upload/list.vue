<template>
  <b-row>
    <b-col md="6" lg="4" xl="3" v-for="item in list" :key="item.img">
      <ImageComponent :item="item" />
    </b-col>
  </b-row>
</template>

<script>
// components
import ImageComponent from "~/components/upload/Image";

export default {
  name: "UploadList",
  props: ["update"],
  methods: {
    getCookie(name) {
      if (process.client) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");

        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == " ") c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
        }
        return null;
      }
    },
    update_list() {
      this.list = JSON.parse(this.getCookie("my_gifs"));
    },
    test() {
      console.log("test");
    },
  },
  data: () => ({
    list: [],
  }),
  mounted() {
    this.update_list();
  },
  watch: {
    update() {
      this.update_list();
    },
  },
  components: { ImageComponent },
};
</script>
