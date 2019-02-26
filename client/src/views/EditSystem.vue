<template>
  <v-app>
    <div class="background">
      
      <h1 class="white--text centerText pa-2">System Configurator {{ id.toUpperCase() }}</h1>
        
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap>
            <v-flex xs2 pt-4>
              <h3 class="white--text">Nvidia Coin :</h3>
            </v-flex>
            <v-flex xs2>
              <v-text-field dark v-model="coinNvidia" label="" color="#F0E296"></v-text-field>
            </v-flex>
            <v-flex xs2 pt-4>
              <h3 class="white--text">Amd Coin :</h3>
            </v-flex>
            <v-flex xs2>
              <v-text-field dark v-model="coinAmd" color="#F0E296"></v-text-field>
            </v-flex>
            <v-flex xs2 pt-4>
              <h3 class="white--text">CPU Coin :</h3>
            </v-flex>
            <v-flex xs2>
              <v-text-field dark v-model="coinCpu" color="#F0E296" label=""></v-text-field>
            </v-flex>
            <v-flex xs2 pt-4>
              <h3 class="white--text">Wifi SSID :</h3>
            </v-flex>
            <v-flex xs2>
              <v-text-field dark v-model="wifiSsid" color="#F0E296" label=""></v-text-field>
            </v-flex>
            <v-flex xs2 pt-4>
              <h3 class="white--text">Wifi Pass :</h3>
            </v-flex>
            <v-flex xs2>
              <v-text-field dark v-model="wifiPassword" color="#F0E296" label=""></v-text-field>
            </v-flex>
            <v-flex xs2>
            </v-flex>
            <v-flex xs2>
            </v-flex>
            <v-flex xs2 pt-4>
              <h3 class="white--text">Donation :</h3>
            </v-flex>
            <v-flex xs6>
              <v-text-field mask="###" dark outline color="#F0E296" v-model="donation" label="Numbers only"></v-text-field>
            </v-flex>
            <v-flex xs4>
            </v-flex>
            <v-flex xs6 sm3 md2 lg2>
              <v-checkbox dark color="#F0E296" label="SSH" v-model="ssh"></v-checkbox>
            </v-flex>
            <v-flex xs6 sm3 md2 lg2>
              <v-checkbox dark color="#F0E296" label="Teamviewer" v-model="teamviewer"></v-checkbox>
            </v-flex>
            <v-flex xs6 sm3 md2 lg2>
              <v-checkbox dark color="#F0E296" label="Anydesk" v-model="anydesk"></v-checkbox>
            </v-flex>
            <v-flex xs6 sm3 md2 lg2>
              <v-checkbox dark color="#F0E296" label="Gpu light" v-model="gpuLight"></v-checkbox>
            </v-flex>
            <v-flex xs6 sm3 md2 lg2>
              <v-checkbox dark color="#F0E296" label="EthPill" v-model="ethPill"></v-checkbox>
            </v-flex>
            <v-flex xs6 sm3 md2 lg2>
              <v-checkbox dark color="#F0E296" label="Auto-OC" v-model="autoOc"></v-checkbox>
            </v-flex>
            <v-flex xs6 sm3 md2 lg2>
              <v-checkbox dark color="#F0E296" label="WatchDog" v-model="watchDog"></v-checkbox>
            </v-flex>
          </v-layout>
          <div>
            <v-btn class="right" color="success" @click="save">Save</v-btn>
            <v-btn v-if="changed" class="right" color="white" @click="defaults">Return</v-btn>
          </div>
        </v-container>
      </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      id: 0,

      OriginalcoinNvidia: "RVN",
      OriginalcoinAmd: "RVN",
      OriginalcoinCpu: "NIMIQ",
      OriginalwifiSsid: "",
      OriginalwifiPassword: "",
      Originaldonation: 1,
      Originalssh: true,
      Originalteamviewer: false,
      Originalanydesk: false,
      OriginalgpuLight: false,
      OriginalethPill: true,
      OriginalautoOc: true,
      OriginalwatchDog: true,

      coinNvidia: "",
      coinAmd: "",
      coinCpu: "",
      wifiSsid: "",
      wifiPassword: "",
      donation: undefined,
      ssh: undefined,
      teamviewer: undefined,
      anydesk: undefined,
      gpuLight: undefined,
      ethPill: undefined,
      autoOc: undefined,
      watchDog: undefined
    }
  },
  methods: {
    defaults() {
      console.log("Back to the Defaults Values")
      this.coinNvidia = this.OriginalcoinNvidia
      this.coinAmd = this.OriginalcoinAmd
      this.coinCpu = this.OriginalcoinCpu
      this.wifiSsid = this.OriginalwifiSsid
      this.wifiPassword = this.OriginalwifiPassword
      this.donation = this.Originaldonation
      this.ssh = this.Originalssh
      this.teamviewer = this.Originalteamviewer
      this.anydesk = this.Originalanydesk
      this.gpuLight = this.OriginalgpuLight
      this.ethPill = this.OriginalethPill
      this.autoOc = this.OriginalautoOc
      this.watchDog = this.OriginalwatchDog
    },
    save() {
      console.log("Saved!")
      this.OriginalcoinNvidia = this.coinNvidia
      this.OriginalcoinAmd = this.coinAmd
      this.OriginalcoinCpu = this.coinCpu
      this.OriginalwifiSsid = this.wifiSsid
      this.OriginalwifiPassword = this.wifiPassword
      this.Originaldonation = this.donation
      this.Originalssh = this.ssh
      this.Originalteamviewer = this.teamviewer
      this.Originalanydesk = this.anydesk
      this.OriginalgpuLight = this.gpuLight
      this.OriginalethPill = this.ethPill
      this.OriginalautoOc = this.autoOc
      this.OriginalwatchDog = this.watchDog
    }
  },
  computed: {
    changed() {
      if (this.coinNvidia !== this.OriginalcoinNvidia) return true
      if (this.OriginalcoinAmd !== this.coinAmd) return true
      if (this.OriginalcoinCpu !== this.coinCpu) return true
      if (this.OriginalwifiSsid !== this.wifiSsid) return true
      if (this.OriginalwifiPassword !== this.wifiPassword) return true
      if (this.Originaldonation !== this.donation) return true
      if (this.Originalssh !== this.ssh) return true
      if (this.Originalteamviewer !== this.teamviewer) return true
      if (this.Originalanydesk !== this.anydesk) return true
      if (this.OriginalgpuLight !== this.gpuLight) return true
      if (this.OriginalethPill !== this.ethPill) return true
      if (this.OriginalautoOc !== this.autoOc) return true
      if (this.OriginalwatchDog !== this.watchDog) return true
      return false
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.defaults()
  }
};
</script>

<style>
.inputGroup{
  color: white;
  text-decoration-color: white;
}

.background{
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: url(../assets/btc.jpeg);
  height: 100%;
  background-size: cover;
}
.right{
  right: -5%;
}
.centerText{
  text-align: center;
  text-decoration: underline;
}
</style>

