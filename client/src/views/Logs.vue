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
      <span v-if="logs.Nvidia" v-html="logs.Nvidia" class="text pa-5">Nvidia</span>
      <span v-if="logs.Amd" v-html="logs.Amd" class="text pa-5"></span>
      <span v-if="logs.error" class="text pa-5">Error - no logs detected</span>
  </v-app>
</template>

<script>
const axios = require('axios');
const Anser = require('anser');

export default {
  name: 'App',
  data() {
    return {
      id: 0,
      urlGet: '',
      logs: {
        "Nvidia": null,
        "Amd": null,
        "error": null
      },
      loading: true
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
    },
    async minerLogs() {
      let response = await axios.post(this.urlGet)
      this.id = this.$route.params.id
      this.logs.Nvidia = response.data.filter(ele => ele["Hostname"] == this.id)[0].Nvidia["Miner Log"]
      this.logs.Amd = response.data.filter(ele => ele["Hostname"] == this.id)[0].Amd["Miner Log"]
      // console.log(this.id, nvidiaLogs, amdLogs)
      if (this.logs.Nvidia) {
        this.logs.Nvidia = this.logsParser(this.logs.Nvidia)
      }
      if (this.logs.Amd) {
        this.logs.Amd = this.logsParser(this.logs.Amd)
      }
      if (!this.logs.Nvidia && !this.logs.Amd) this.logs.error = "Error - No logs detected!"
      this.APITimer = setTimeout(this.minerLogs, 30000)
    }
  },
  created() {
    if (window.location.href.includes('localhost')) {
      this.urlGet = "http://localhost:5000/db"
    } else if (window.location.href.includes('192.168')) {
      this.urlGet = "http://192.168.0.127:5000/db"
    } else {
      this.urlGet = "https://nos-server.now.sh/db"
    }

    this.loading = true
    axios.post(this.urlGet)
      .then(res => {
        this.loading = false
        if (res.data == "not logged in!") this.$router.push('/')
        else this.minerLogs()
    })
  },
  destroyed() {
    clearTimeout(this.APITimer);
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

