<template>
  <v-app>
    <div class="background">
      
      <v-layout row wrap>
        <v-flex xs16 sm16 md6 lg6 v-for="rig in rigNumber" :key="rig" pa-4 class="tableTest">
          <v-card color="black" v-bind:class="{ flashingCard: !rigStatus[rig - 1]}" class="fade-in rounded-card rigCard" height="100%" top="30%">  
            
              <h1 v-bind:class="{ redText: !rigStatus[rig - 1] }" class="white--text pl-3" style="text-align:left;float:left;">{{ rigHostname[rig - 1].toUpperCase() }}</h1> 
              <h2 v-if='!rigStatus[rig - 1]' class="white--text pt-1 pr-3" style="text-align:right;float:right;">Last seen : {{ rigSeen[rig - 1] }} ago</h2> 
              <hr style="clear:both;" color="#F0E296"/>
            
            <div>
              <ul v-if='rigBrand[rig].includes("Nvidia")' style="cursor: pointer" class="rigUl white--text">
                <li class="rigLi" @click='hashrateOver("nvidia")'>
                  <img src="../assets/nvidia.png" height="30" class="pt-2" fill-height>
                </li>
                <li class="rigLi" @click='hashrateOver("nvidia")'>SUQA</li>
                <li class="rigLi" @click='hashrateOver("nvidia")'>X22I</li>
                <li class="rigLi" @click='hashrateOver("nvidia")'>51,3 MH/s</li>
                <li class="rigLi" @click='hashrateOver("nvidia")'>69 °C</li>
                <li class="rigLi" @click='hashrateOver("nvidia")'>700 W</li>
              </ul>
              <v-divider color="#F0E296"></v-divider>
              <ul v-if='rigBrand[rig].includes("Amd")' style="cursor: pointer"  class="rigUl white--text">
                <li class="rigLi" @click='hashrateOver("amd")'>
                  <img src="../assets/amd.png" height="30" class="pt-2" fill-height>
                </li>
                <li class="rigLi" @click='hashrateOver("amd")'>SUQA</li>
                <li class="rigLi" @click='hashrateOver("amd")'>X22I</li>
                <li class="rigLi" @click='hashrateOver("amd")'>51,3 MH/s</li>
                <li class="rigLi" @click='hashrateOver("amd")'>69 °C</li>
                <li class="rigLi" @click='hashrateOver("amd")'>700 W</li>
              </ul>
              <v-divider color="#F0E296"></v-divider>

              <div class="pt-2">
                <img v-if='rigStatus[rig - 1]' src="../assets/alive.gif" height="40" class="pl-3" fill-height>
                <img v-else src="../assets/flatline.gif" height="40" class="pl-3" fill-height>
                <v-menu offset-y>
                  <v-btn slot="activator" color="black" class="white--text editBtn">Edit</v-btn>
                  <v-list>
                    <v-list-tile
                      v-for="(item, index) in editList"
                      :key="index"
                      :to="{ name: 'Edit' + item, params: { id: rigHostname[rig - 1] } }"
                    >
                      <v-list-tile-title>{{ item }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-y>
                  <v-btn slot="activator" color="black" class="white--text editBtn">Actions</v-btn>
                  <v-list>
                    <v-list-tile
                      v-for="(item, index) in actionList"
                      :key="index"
                      :to="{ name: item, params: { id: rigHostname[rig - 1] } }"
                    >
                      <v-list-tile-title>{{ item }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              
              </div>
            </div>
          </v-card>

        </v-flex>
      </v-layout>
      
      <v-flex xs16 sm16 md6 lg6>
        <v-dialog v-model="gpuDialog" width="75%">
          <v-card class="infoCard rounded-card" color="black">
            <v-card-title v-if='brand=="Nvidia"' class="green--text headline lighten-2" primary-title>
            {{ brand }}
            </v-card-title>
            <v-card-title v-if='brand=="Amd"' class="red--text headline black lighten-2" primary-title>
            {{ brand }}
            </v-card-title>

            <v-divider color="#F0E296"></v-divider>

            <div v-if='brand=="Nvidia"'>
              <ul v-for="gpu in gpuNumber" :key="gpu" class="black--text gpuUl">
                <li class="gpuLi">GPU {{ gpu }}</li>
                <li class="gpuLi">hashrate: {{ hashrateNvidia || "undefined" }}</li>
                <li class="gpuLi">temperature: {{ temperatureNvidia || "undefined" }}</li>
                <li class="gpuLi">watt: {{ wattNvidia || "undefined" }}</li>
              </ul>
            </div>
            <div v-if='brand=="Amd"'>
              <ul v-for="gpu in gpuNumber" :key="gpu" class="black--text gpuUl">
                <li class="gpuLi">GPU {{ gpu }}</li>
                <li class="gpuLi">hashrate: {{ hashrateAmd || "undefined" }}</li>
                <li class="gpuLi">temperature: {{ temperatureAmd || "undefined" }}</li>
                <li class="gpuLi">watt: {{ wattAmd || "undefined" }}</li>
              </ul>
            </div>
          </v-card>      
        </v-dialog>

      </v-flex>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      rigNumber: [1, 2, 3],
      rigHostname: ["13bj5bv3k", "2jhO2h4bd", "3bvoi2h34"],
      rigStatus: [true, false, true],
      rigBrand:{
        1: ["Nvidia", "Amd"],
        2: ["Nvidia"],
        3: ["Amd"]
      },
      rigSeen: ["30 secs", "5 hours", "30 secs"],
      gpuNumber: [1, 2, 3, 4, 5, 6],
      gpuDialog: false,
      editList: ["System", "Coins", "Overclocks"],
      actionList: ["Restart", "SSH"],
      brand: undefined,
      hashrateNvidia: undefined,
      hashrateAmd: undefined,
      temperatureNvidia: undefined,
      temperatureAmd: undefined,
      wattNvidia: undefined,
      wattAmd: undefined
    };
  },
  methods: {
    hashrateOver(brand) {
      this.gpuDialog = !this.gpuDialog
      if (brand == "nvidia") {
        this.brand = "Nvidia"
      } else {
        this.brand = "Amd"
      }
    },
  },
  created: function () {

  }
};
</script>

<style>
.background{
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: url(../assets/btc.jpeg);
  height: 100%;
  background-size: cover;
}
.roundImg{
  border-radius: 50%;
}
.editBtn{
  top: -14px;
}
.infoCard {
  margin-left: auto;
  margin-right: auto;
}
.rounded-card {
  border-radius:20px;
}
.gpuUl {
  width: 100%;
  margin: 0;
  padding: 0;
  display: table;
}
.gpuLi {
  text-decoration: none;
  letter-spacing: 0.10em;
  display: inline-block;
  padding: 2px 15px;
  position: relative;
  color: white;
}
.rigUl {
  display: table;
  margin: 0;
}
.rigLi {
  text-decoration: none;
  width: 80px;
  display: inline-block;
  position: relative;
  text-align: center;
}
.rigLi:after {    
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 1px;
  left: 50%;
  position: absolute;
  background: white;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}
.rigLi:hover:after { 
  width: 90px; 
  left: -5px; 
}
@media screen and (max-height: 300px) {
	ul {
		margin-top: 40px;
	}
}
.span-text {
  vertical-align:50%;
}

.fade-in {
	-webkit-animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	        animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}
@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.redText{
  animation: flashingRed 1s infinite;
}
@keyframes flashingRed {
  0% { color: red; }
  25% { color: white; }
  50% { color: red; }
  75% { color: white; }
  100% { color: red; }

}
.flashingCard {
	-webkit-animation: vibrate-1 0.3s linear infinite both;
	        animation: vibrate-1 0.3s linear infinite both;
}
@-webkit-keyframes vibrate-1 {
  0% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
            transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
            transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
            transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
            transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
}
@keyframes vibrate-1 {
  0% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
            transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
            transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
            transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
            transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
}
</style>

