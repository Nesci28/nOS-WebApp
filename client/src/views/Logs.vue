<template>
  <v-app>
    <div class="background"></div>
      <span v-if="logs.Nvidia" v-html="logs.Nvidia" class="text pa-5">Nvidia</span>
      <span v-if="logs.Amd" v-html="logs.Amd" class="text pa-5"></span>
      <span v-if="!logs.Nvidia && !logs.Amd" class="text pa-5">Error - no logs detected</span>
  </v-app>
</template>

<script>
const axios = require('axios');
const Anser = require("anser");

export default {
  name: 'App',
  data() {
    return {
      id: 0,
      logs: {
        "Nvidia": null,
        "Amd": null,
        "error": "No logs detected"
      },
    }
  },
  methods: {
    logsParser(logs) {
      let logsArr = []
      logs = logs.split('\n')
      logs.forEach(log => {
        logsArr.push(Anser.ansiToHtml(log))
      })
      return logsArr.join("<br />")
    }
  },
  created() {
    if (!this.$store.state.username || !this.$store.state.password) {
      this.$router.push('/')
    } else {
      this.id = this.$route.params.id
      this.logs.Nvidia = this.$store.state.json.filter(ele => ele["Hostname"] == this.id)[0].Nvidia["Miner Log"]
      this.logs.Amd = this.$store.state.json.filter(ele => ele["Hostname"] == this.id)[0].Amd["Miner Log"]
      // console.log(this.id, nvidiaLogs, amdLogs)
      if (this.logs.Nvidia) {
        this.logs.Nvidia = this.logsParser(this.logs.Nvidia)
      }
      if (this.logs.Amd) {
        this.logs.Amd = this.logsParser(this.logs.Amd)
      }
    }
  }
}
</script>

<style scoped>
.text{
  padding: 10%;
  margin: 5%;
  width: 90%;
  border: 5px solid white;
  background: rgba(0,0,0,0.75);
  color: white;
  z-index: 1;
}
</style>

