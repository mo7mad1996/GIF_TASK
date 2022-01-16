<template>
  <b-row>
    <b-col
      md="6"
      lg="4"
      xl="3"
      v-for="(post, ndx) in posts"
      :key="ndx"
      :title="post.from == 'giphy' ? post.title : post.content_description"
    >
      <GiphyCard :post="post" v-if="post.from == 'giphy'" />
      <TenorCard :post="post" v-if="post.from == 'tenor'" />
    </b-col>
  </b-row>
</template>

<script>
// components
import GiphyCard from "~/components/home/GiphyCard/index";
import TenorCard from "~/components/home/TenorCard/index";

export default {
  data: () => ({
    like_list: [],
    posts: [],
  }),
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
  },
  mounted() {
    this.like_list = JSON.parse(this.getCookie("favourite")) || [];

    // get posts
    this.like_list.forEach((el) => {
      this.$store.commit(el.from + "/update_uri_id", el.id);
      this.$axios.$get(this.$store.getters[el.from + "/API_ID"]).then((res) => {
        if (el.from == "giphy") {
          this.posts.push(Object.assign(res.data, el));
        } else {
          this.posts.push(Object.assign(res.results[0], el));
        }
      });
    });
  },

  components: {
    GiphyCard,
    TenorCard,
  },
};
</script>
