<template>
  <v-app>
    <div class="background"></div>
    <div class="text pa-5">
      <h3 class="white--text" v-on:click="changelogLink">changelog : 
          <h3 style="cursor: pointer" class="linkText blue--text">{{ changelog  }}</h3>
          <br /> 
      </h3>
      <h3 v-if="version" class="white--text">version : {{ version }} <br /></h3>
      <h3 v-if="link" class="white--text" v-on:click="gdrive">link : 
        <h3 style="cursor: pointer" class="linkText blue--text">{{ link }}</h3>
        <br />
      </h3>
      <h3 v-if="md5" class="white--text">md5 : {{ md5 }} <br /></h3>
    </div>
  </v-app>
</template>

<script>
const axios = require('axios');

export default {
  name: 'App',
  data() {
    return {
      urlGet: 'https://nos-server.now.sh/db',
      // urlGet: 'http://localhost:5000/db',
      changelog: "https://github.com/Nesci28/nOS/blob/master/Changelog.md",
      API: null,
      version: null,
      link: null,
      md5: null
    }
  },
  methods: {
    gdrive() {
      window.open(this.link, "_blank"); 
    },
    changelogLink() {
      window.open("https://github.com/Nesci28/nOS/blob/master/Changelog.md", "_blank"); 
    }
  },
  async created() {
    this.API = await axios.get(this.urlGet)
    this.API = this.API.data[0]
    this.link = this.API.download
    this.md5 = this.API.md5
  }
}
</script>

<style scoped>
.text{
  margin: 5%;
  border: 5px solid white;
  background: rgba(0,0,0,0.75);
  z-index: 1;
}
.linkText{
  text-decoration: underline;
}
</style>

