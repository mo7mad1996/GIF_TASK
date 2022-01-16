<template>
  <nuxt-link :to="`/gif/${post.id}?from=giphy`" class="link_giphy">
    <div class="img-continer" v-show="!in_load">
      <img
        :src="post.images.downsized.url"
        :alt="post.title"
        @loadend="in_load = !in_load"
      />

      <div class="favourite" @click.prevent.stop>
        <button @click="__like">
          <fa :icon="[liked ? 'fas' : 'far', 'heart']" />
        </button>
      </div>
    </div>
    <Load :post="post" v-if="in_load" />
  </nuxt-link>
</template>

<script>
// components
import Load from "~/components/home/GiphyCard/load";

export default {
  props: ["post"],
  name: "GiphyCard",
  data() {
    return {
      in_load: true,
      liked: false,
      click: false,
    };
  },
  components: {
    Load,
  },
  computed: {
    in_like() {
      if (process.client) {
        if (this.getCookie("favourite")) {
          let like_list = JSON.parse(this.getCookie("favourite"));

          return !!like_list.find((el) => el.id == this.post.id);
        }
        return false;
      }
    },
  },

  methods: {
    setCookie(name, value) {
      if (process.client) {
        document.cookie = name + "=" + value + ";path=/";
      }
    },
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
    __like() {
      this.liked = !this.liked;
      this.click = true;
    },
  },

  watch: {
    liked() {
      if (this.liked) {
        if (this.getCookie("favourite")) {
          if (this.click) {
            let newData = Array.from(JSON.parse(this.getCookie("favourite")));
            newData.unshift({
              id: this.post.id,
              from: this.post.from,
            });
            this.setCookie("favourite", JSON.stringify(newData));
          }
        } else {
          this.setCookie(
            "favourite",
            JSON.stringify([
              {
                id: this.post.id,
                from: this.post.from,
              },
            ])
          );
        }
      } else {
        if (this.getCookie("favourite")) {
          let lastData = JSON.parse(this.getCookie("favourite")),
            newData = lastData.filter((el) => el.id != this.post.id);

          this.setCookie("favourite", JSON.stringify(newData));
        }
      }
    },
  },

  mounted() {
    this.liked = this.in_like;
  },
};
</script>

<style scoped>
.img-continer {
  transform: perspective(500px);
  transition: 0.3s;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;

  position: relative;
}
.img-continer:hover {
  transform: perspective(500px) translateZ(100px);
  z-index: 2;
}
.img-continer:hover .favourite {
  bottom: 10px;
}

.img-continer img {
  object-fit: cover;
  width: 100%;
  color: #555;
}

.link_giphy {
  text-decoration: none;
  position: relative;
  display: block;
}
.link_giphy .favourite {
  position: absolute;
  bottom: -70px;
  right: 10px;
  transition: 0.4s;
}
.link_giphy .favourite button {
  border: 1px solid red;
  color: red;
  background: rgba(255, 0, 0, 0.2);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1em;
  display: grid;
  place-items: center;
}
</style>
