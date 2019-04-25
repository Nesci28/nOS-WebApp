<template>
  <v-app>
    <div class="background"></div>
      <v-progress-circular
        :size="140"
        :width="14"
        v-if="loading"
        indeterminate
        color="rgb(240, 226, 150)"
        class="middle"
      ></v-progress-circular>
    <div class="text pa-5">
      <h3 class="white--text" v-on:click="changelogLink">changelog : 
          <h3 style="cursor: pointer" class="linkText blue--text">{{ changelog }}</h3>
          <br /> 
      </h3>
      <h3 v-if="version" class="white--text">version : {{ version }} <br /></h3>
      <h3 v-if="link" class="white--text" v-on:click="gdrive">link : 
        <h3 style="cursor: pointer" class="linkText blue--text">{{ link }}</h3>
        <br />
      </h3>
      <h3 v-if="md5" class="white--text" style="overflow-wrap: break-word;">md5 : {{ md5 }} <br /></h3>
    </div>
    <v-img contain :src=logo v-bind:style="{ width: size }" class="logo"></v-img>
  </v-app>
</template>

<script>
const axios = require('axios');

export default {
  name: 'App',
  data() {
    return {
      urlGet: '',
      changelog: "https://github.com/Nesci28/nOS/blob/master/Changelog.md",
      API: null,
      version: null,
      link: null,
      md5: null,
      loading: true,
      logo: require("../assets/logo.png"),
      size: null
    }
  },
  methods: {
    gdrive() {
      window.open(this.link, "_blank"); 
    },
    changelogLink() {
      window.open("https://github.com/Nesci28/nOS/blob/master/Changelog.md", "_blank"); 
    },
    calculateSize(width) {
      if (width > 400) this.size = "60%"
      else this.size = "90%"
    }
  },
  mounted() {
    let width = window.innerWidth
    this.calculateSize(width)
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        let width = window.innerWidth
        this.calculateSize(width)
      });
    })
  },
  async created() {
    if (window.location.href.includes('localhost')) {
      this.urlGet = "http://localhost:5000/db"
    } else if (window.location.href.includes('192.168')) {
      this.urlGet = "http://192.168.0.127:5000/db"
    } else {
      this.urlGet = "https://nos-server.now.sh/db"
    }
    
    this.loading = true
    this.API = await axios.get(this.urlGet)
    this.loading = false
    this.API = this.API.data[0]
    this.link = this.API.download
    this.md5 = this.API.md5
  }
}
</script>

<style scoped>
.logo{
  margin: 0 auto;
}
.text{
  margin: 5%;
  border: 5px solid white;
  background: rgba(0,0,0,0.75);
  z-index: 1;
}
.linkText{
  overflow-wrap: break-word;
  text-decoration: underline;
}
</style>

