<template>
  <div class="single">
    <ImgContainer :img="img" :alt="alt" />

    <a :href="img.url" class="download-btn" target="_blank" download>
      <div>
        <fa icon="download" />
      </div>
    </a>
    <ImgDetails :post="post" :img="img" />
  </div>
</template>

<script>
// components
import ImgContainer from "~/components/singleGif/ImgContainer";
import ImgDetails from "~/components/singleGif/ImgDetails";

export default {
  async asyncData({ params, query, $axios, store }) {
    store.commit(query.from + "/update_uri_id", params.id);

    var post = await $axios.$get(store.getters[query.from + "/API_ID"]);

    return {
      post:
        query.from === "giphy"
          ? Object.assign(query, post.data)
          : Object.assign(query, post.results[0]),
    };
  },
  components: {
    ImgContainer,
    ImgDetails,
  },
  computed: {
    img() {
      if (this.post.from == "giphy") {
        return this.post.images.downsized_large;
      } else {
        return this.post.media[0].gif;
      }
    },
    alt() {
      if (this.post.from == "giphy") {
        return this.post.title;
      } else {
        return this.post.content_description;
      }
    },
  },
  layout: "fluid",
};
</script>

<style scoped>
.single {
  position: relative;
}

.download-btn {
  position: sticky;
  font-size: 20px;
  color: black;
  margin: 20px;
  width: 60px;
  height: 60px;
  display: block;
  padding: 10px;
  bottom: 20px;
  left: 100px;
  color: rgb(221, 48, 48);
  overflow: hidden;
  border-radius: 50%;
}
.download-btn::after,
.download-btn div {
  inset: 3px;
  background: rgb(255, 255, 255);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  z-index: 2;
  border-radius: 50%;
}
.download-btn::after {
  content: "";
  inset: 0;
  background-image: conic-gradient(
    rgb(221, 48, 48),
    transparent,
    transparent,
    transparent,
    transparent
  );
  z-index: 1;
  animation: loop infinite 1s linear;
}
@keyframes loop {
  from {
    transform: scale(2) rotate(0deg);
  }
  to {
    transform: scale(2) rotate(-360deg);
  }
}
</style>
