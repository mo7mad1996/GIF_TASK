<template>
  <div>
    <h1 class="h1 my-3">Search for <mark v-text="q" />.</h1>

    <b-row class="border br-2">
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

      <Loding v-if="giphy_in_fetch || tenor_in_fetch" />
    </b-row>
  </div>
</template>

<script>
// components
import GiphyCard from "~/components/home/GiphyCard/index";
import TenorCard from "~/components/home/TenorCard/index";
import Loding from "~/components/home/Loding";

// global options
// to access it in asyncData
const oprions_giphy = {
  limit: 10,
  offset: 0,
};

const oprions_tenor = {
  limit: 10,
};

export default {
  async asyncData({ $axios, store, params }) {
    // get query string to API
    let q_string = "";
    for (var k in oprions_giphy) {
      q_string += `&${k}=${oprions_giphy[k]}`;
    }
    q_string += `&q=${params.q}`; // added search string
    // feach data
    var giphy = await $axios.$get(store.getters["giphy/SEARCH_URI"] + q_string);

    // get query string to API
    q_string = "";
    for (var k in oprions_tenor) {
      q_string += `&${k}=${oprions_tenor[k]}`;
    }
    q_string += `&q=${params.q}`; // added search string
    // feach data
    var tenor = await $axios.$get(store.getters["tenor/SEARCH_URI"] + q_string);

    oprions_tenor.pos = tenor.next;

    // return data
    return {
      giphy: giphy.data,
      tenor: tenor.results,
    };
  },

  components: {
    GiphyCard,
    TenorCard,
    Loding,
  },
  data: () => ({
    oprions_giphy,
    oprions_tenor,

    tenor_in_fetch: false,
    giphy_in_fetch: false,
  }),

  computed: {
    posts() {
      return [].concat(
        this.giphy.filter((el) => (el.from = "giphy")),
        this.tenor.filter((el) => (el.from = "tenor"))
      );
    },
    q() {
      return this.$route.params.q;
    },
  },

  methods: {
    scroll(max, naw) {
      if (max - naw < 200) {
        // start get new data

        if (!this.giphy_in_fetch) {
          this.giphy_in_fetch = true;

          oprions_giphy.offset += 10;
          this.get_more_giphy();
        }

        if (!this.tenor_in_fetch) {
          this.tenor_in_fetch = true;

          this.get_more_tenor();
        }
      }
    },
    get_more_giphy() {
      // get query string to API
      let q_string = "";
      for (var k in oprions_giphy) {
        q_string += `&${k}=${oprions_giphy[k]}`;
      }
      q_string += `&q=${this.q}`; // added search string

      this.$axios
        .$get(this.$store.getters["giphy/SEARCH_URI"] + q_string)
        .then((res) => {
          res.data
            .filter((el) => (el.from = "giphy"))
            .forEach((post) => this.posts.push(post));
        })
        .finally(() => {
          this.giphy_in_fetch = false;
        });
    },
    get_more_tenor() {
      // get query string to API
      let q_string = "";
      for (var k in oprions_tenor) {
        q_string += `&${k}=${oprions_tenor[k]}`;
      }

      q_string += `&q=${this.q}`; // added search string
      this.$axios
        .$get(this.$store.getters["tenor/SEARCH_URI"] + q_string)
        .then((res) => {
          res.results
            .filter((el) => (el.from = "tenor"))
            .forEach((post) => this.posts.push(post));

          oprions_tenor.pos = res.next;
        })
        .finally(() => {
          this.tenor_in_fetch = false;
        });
    },
  },
  created() {
    // work in client side onely
    if (process.client) {
      onscroll = (e) => {
        this.scroll(document.scrollingElement.scrollTopMax, scrollY);
      };
    }
  },
};
</script>
