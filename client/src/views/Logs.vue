<template>
  <v-app>
    <div class="background" />
    <v-progress-circular
      v-if="loading"
      :size="140"
      :width="14"
      indeterminate
      color="rgb(240, 226, 150)"
      class="middle"
    />
    <span v-if="logs.Nvidia" class="text pa-5" v-html="logs.Nvidia">Nvidia</span>
    <span v-if="logs.Amd" class="text pa-5" v-html="logs.Amd" />
    <span v-if="logs.error" class="text pa-5">Error - no logs detected</span>
  </v-app>
</template>

<script>
const axios = require("axios");
const Anser = require("anser");

export default {
  name: "App",
  data() {
    return {
      id: 0,
      urlGet: "",
      logs: {
        Nvidia: null,
        Amd: null,
        error: null
      },
      loading: true
    };
  },
  created() {
    if (!window.location.port) {
      this.urlGet =
        window.location.protocol +
        "//" +
        window.location.hostname +
        "/api/v2/db";
    } else {
      this.urlGet =
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":5000/api/v2/db";
    }

    this.loading = true;
    axios.post(this.urlGet).then(res => {
      this.loading = false;
      if (res.data == "not logged in!") this.$router.push("/");
      else this.minerLogs();
    });
  },
  destroyed() {
    clearTimeout(this.APITimer);
  },
  methods: {
    logsParser(logs) {
      const logsArr = [];
      logs = logs.split("\n");
      logs.forEach(log => {
        logsArr.push(Anser.ansiToHtml(log));
      });
      return logsArr.join("<br />");
    },
    async minerLogs() {
      const response = await axios.post(this.urlGet);
      this.id = this.$route.params.id;
      this.logs.Nvidia = response.data.filter(
        ele => ele.Hostname == this.id
      )[0].Nvidia["Miner Log"];
      this.logs.Amd = response.data.filter(
        ele => ele.Hostname == this.id
      )[0].Amd["Miner Log"];
      // console.log(this.id, nvidiaLogs, amdLogs)
      if (this.logs.Nvidia) {
        this.logs.Nvidia = this.logsParser(this.logs.Nvidia);
      }
      if (this.logs.Amd) {
        this.logs.Amd = this.logsParser(this.logs.Amd);
      }
      if (!this.logs.Nvidia && !this.logs.Amd) {
        this.logs.error = "Error - No logs detected!";
      }
      this.APITimer = setTimeout(this.minerLogs, 30000);
    }
  }
};
</script>

<style scoped>
.text {
  padding: 10%;
  margin: 2rem auto;
  width: 90%;
  border: 5px solid white;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  z-index: 1;
}
</style>
