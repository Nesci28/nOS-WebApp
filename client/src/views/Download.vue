<template>
  <v-app>
    <div class="background"></div>
    <div class="text pa-5">
      <span class="white--text" v-on:click="changelogLink">changelog : 
          <span style="cursor: pointer" class="linkText blue--text">{{ changelog  }}</span>
          <br /> 
      </span>
      <span v-if="version" class="white--text">version : {{ version }} <br /></span>
      <span v-if="link" class="white--text" v-on:click="gdrive">link : 
        <span style="cursor: pointer" class="linkText blue--text">{{ link }}</span>
        <br />
      </span>
      <span v-if="md5" class="white--text">md5 : {{ md5 }} <br /></span>
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
    this.API = await axios.post(this.urlGet, {})
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

