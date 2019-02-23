<template>
  <v-app>
    <v-toolbar color="black" class="white--text">
      <!-- <v-toolbar-side-icon class="white--text"></v-toolbar-side-icon> -->
      <router-link to="/" class="toolbar-title">CHOSN WebApp</router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <!-- <v-btn flat class="white--text">Link One</v-btn>
        <v-btn flat class="white--text">Link Two</v-btn>
        <v-btn flat class="white--text">Link Three</v-btn> -->
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    data: () => ({

    }),
  }
</script>

<style>
.toolbar-title {
  color: inherit;
  text-decoration: underline;
  font-size: 150%;
  font-weight: normal;
}
</style>
