<template>
  <b-navbar toggleable="lg" type="dark" variant="info" sticky>
    <nuxt-link to="/" class="navbar-brand">Logo</nuxt-link>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <nuxt-link to="/favorite" class="nav-link">Favorite</nuxt-link>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form @submit.prevent="search">
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Search"
            v-model="search_text"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">
            <fa icon="search" />
          </b-button>
        </b-nav-form>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <nuxt-link class="dropdown-item" to="/upload">upload</nuxt-link>
          <nuxt-link class="dropdown-item" to="/favorite">favorite</nuxt-link>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  data: () => {
    return {
      search_text: "",
    };
  },
  methods: {
    search() {
      this.$router.push("/search/" + this.search_text);
    },
  },
};
</script>
