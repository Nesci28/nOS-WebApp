<template>
  <v-app style="
    background: -webkit-linear-gradient(to top, #000000, #4b0082, #669999);
    background: linear-gradient(to top, #000000, #4b0082, #669999);
  ">
  <h1 class="centerText pa-2">System Config {{ id }}</h1>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs2 pt-4>
          <h3>Nvidia Coin :</h3>
        </v-flex>
        <v-flex xs2>
          <v-text-field v-model="coin" label="" color="white"></v-text-field>
        </v-flex>
        <v-flex xs2 pt-4>
          <h3>Amd Coin :</h3>
        </v-flex>
        <v-flex xs2>
          <v-text-field v-model="coin" color="white" label=""></v-text-field>
        </v-flex>
        <v-flex xs2 pt-4>
          <h3>CPU Coin :</h3>
        </v-flex>
        <v-flex xs2>
          <v-text-field v-model="coin" color="white" label=""></v-text-field>
        </v-flex>
        <v-flex xs2 pt-4>
          <h3>Wifi SSID :</h3>
        </v-flex>
        <v-flex xs2>
          <v-text-field v-model="wifiSsid" color="white" label=""></v-text-field>
        </v-flex>
        <v-flex xs2 pt-4>
          <h3>Wifi Pass :</h3>
        </v-flex>
        <v-flex xs2>
          <v-text-field v-model="wifiPassword" color="white" label=""></v-text-field>
        </v-flex>
        <v-flex xs2>
        </v-flex>
        <v-flex xs2>
        </v-flex>
        <v-flex xs2 pt-4>
          <h3>Donation :</h3>
        </v-flex>
        <v-flex xs6>
          <v-text-field mask="###" outline color="white" v-model="donation" label="Numbers only"></v-text-field>
        </v-flex>
        <v-flex xs4>
        </v-flex>
        <v-flex xs6 sm3 md2 lg2>
          <v-checkbox color="white" label="SSH"></v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md2 lg2>
          <v-checkbox color="white" label="Teamviewer"></v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md2 lg2>
          <v-checkbox color="white" label="Anydesk"></v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md2 lg2>
          <v-checkbox color="white" label="Gpu light"></v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md2 lg2>
          <v-checkbox color="white" label="EthPill"></v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md2 lg2>
          <v-checkbox color="white" label="Auto-OC"></v-checkbox>
        </v-flex>
        <v-flex xs6 sm3 md2 lg2>
          <v-checkbox color="white" label="WatchDog"></v-checkbox>
        </v-flex>
      </v-layout>
      <div>
        <v-btn class="right" color="success">Save</v-btn>
        <v-btn class="right" color="white">Defaults</v-btn>
      </div>
    </v-container>
    <v-container>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      id: 0
    };
  },
  methods: {

  },
  created() {
     this.id = this.$route.params.id;
  }
};
</script>

<style>
.right{
  right: -5%;
}
.centerText{
  text-align: center;
}
</style>

