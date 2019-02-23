<template>
 <v-app style="
    background: -webkit-linear-gradient(to top, #000000, #4b0082, #669999);
    background: linear-gradient(to top, #000000, #4b0082, #669999);
  ">
    <v-layout row wrap pa-4>
      <v-flex>
        <v-card hover color="black" class="rounded-card">  
          <div align="left">
          <h1 class="orange--text pa-2">Rig {{ rigNumber }} - {{ rigHostname || "hostname" }}</h1>
          </div>
          <div>
            <ul class="green--text">
              <li>SUQA</li>
              <li>X22I</li>
              <li @click='hashrateOver("nvidia")'>51,3 MH/s</li>
              <li @click='temperatureOver("nvidia")'>69 C</li>
              <li @click='wattOver("nvidia")'>700 W</li>
            </ul>
            <ul class="red--text">
              <li>SUQA</li>
              <li>X22I</li>
              <li @click='hashrateOver("amd")'>51,3 MH/s</li>
              <li @click='temperatureOver("amd")'>69 C</li>
              <li @click='wattOver("amd")'>700 W</li>
            </ul>
            <div class="pt-2">
            <img src="../assets/alive.gif" height="40" class="pl-3" fill-height>
            <v-btn flat color="orange" class="span-text">Edit System</v-btn>
            <v-btn flat color="orange" class="span-text">Edit Coins</v-btn>
            </div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  
    <v-dialog v-model="hashrate" max-width="300px" max-height="300px">
      <v-card color="black">
        <v-card-title class="white--text headline">{{ brand }}</v-card-title>
        <v-card-text class="white--text" v-for="num in 5" :key="num">
          {{ num }}
        </v-card-text>
      </v-card>
    </v-dialog>
  
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      rigNumber: 1,
      rigHostname: "13bj5bv3k",
      hashrate: "false",
      temperatureNvidia: false,
      wattNvidia: false,
      temperatureAmd: false,
      wattAmd: false,
      brand: undefined
    };
  },
  methods: {
    hashrateOver(brand) {
      this.hashrate = !this.hashrate
      if (brand == "nvidia") {
        this.brand = "Nvidia"
      } else {
        this.brand = "Amd"
      }
    },
  },
};
</script>

<style>
.rounded-card {
  border-radius:10px;
}
ul {
  width: 50%;
  margin: 0;
  padding: 0;
  display: table;
}
li {
  display: table-cell;
  text-align: center;
}
.span-text {
  vertical-align:50%;
}
</style>

