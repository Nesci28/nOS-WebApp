<template>
  <v-app style="
    background: -webkit-linear-gradient(to top, #000000, #4b0082, #669999);
    background: linear-gradient(to top, #000000, #4b0082, #669999);
  ">

    <v-layout row wrap>
      <v-flex xs16 sm16 md6 lg6 v-for="rig in rigNumber" :key="rig" pa-4 class="tableTest">
        <v-card v-if='rigStatus[rig - 1]!=="dead"' color="black" class="rounded-card rigCard" height="100%" top="30%">  
          <div align="left">
          <h1 class="white--text pa-2">{{ rigHostname[rig - 1].toUpperCase() }}</h1>
          </div>
          <div>
            <ul style="cursor: pointer" class="rigUl green--text">
              <li class="rigLi" @click='hashrateOver("nvidia")'>SUQA</li>
              <li class="rigLi" @click='hashrateOver("nvidia")'>X22I</li>
              <li class="rigLi" @click='hashrateOver("nvidia")'>51,3 MH/s</li>
              <li class="rigLi" @click='hashrateOver("nvidia")'>69 C</li>
              <li class="rigLi" @click='hashrateOver("nvidia")'>700 W</li>
            </ul>
            <ul style="cursor: pointer"  class="rigUl red--text">
              <li class="rigLi" @click='hashrateOver("amd")'>SUQA</li>
              <li class="rigLi" @click='hashrateOver("amd")'>X22I</li>
              <li class="rigLi" @click='hashrateOver("amd")'>51,3 MH/s</li>
              <li class="rigLi" @click='hashrateOver("amd")'>69 C</li>
              <li class="rigLi" @click='hashrateOver("amd")'>700 W</li>
            </ul>
            <div class="pt-2">
              <img src="../assets/alive.gif" height="40" class="pl-3" fill-height>
            <v-menu offset-y>
              <v-btn
                slot="activator"
                color="black"
                class="white--text editBtn"
              >
                Edit
              </v-btn>
              <v-list>
                <v-list-tile
                  v-for="(item, index) in editList"
                  :key="index"
                >
                  <v-list-tile-title>{{ item }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-menu offset-y>
              <v-btn
                slot="activator"
                color="black"
                class="white--text editBtn"
              >
                Actions
              </v-btn>
              <v-list>
                <v-list-tile
                  v-for="(item, index) in actionList"
                  :key="index"
                >
                  <v-list-tile-title>{{ item }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <!-- <v-btn flat color="white" class="span-text">Edit Coins</v-btn> -->
            </div>
          </div>
        </v-card>

        <v-card v-if='rigStatus[rig - 1]=="dead"' color="black" class="flashingCard rounded-card rigCard" height="100%">  
          <div align="left">
          <h1 class="white--text pa-2">{{ rigHostname[rig - 1].toUpperCase() }}</h1>
          </div>
          <div>
            <ul style="cursor: pointer" class="rigUl green--text">
              <li class="rigLi" @click='hashrateOver("nvidia")'>SUQA</li>
              <li class="rigLi" @click='hashrateOver("nvidia")'>X22I</li>
              <li class="rigLi" @click='hashrateOver("nvidia")'>51,3 MH/s</li>
              <li class="rigLi" @click='hashrateOver("nvidia")'>69 C</li>
              <li class="rigLi" @click='hashrateOver("nvidia")'>700 W</li>
            </ul>
            <ul style="cursor: pointer"  class="rigUl red--text">
              <li class="rigLi" @click='hashrateOver("amd")'>SUQA</li>
              <li class="rigLi" @click='hashrateOver("amd")'>X22I</li>
              <li class="rigLi" @click='hashrateOver("amd")'>51,3 MH/s</li>
              <li class="rigLi" @click='hashrateOver("amd")'>69 C</li>
              <li class="rigLi" @click='hashrateOver("amd")'>700 W</li>
            </ul>
            <div class="pt-2">
              <img src="../assets/flatline.gif" class="pl-3" height="40">
                <v-menu offset-y>
                  <v-btn
                    slot="activator"
                    color="black"
                    class="white--text editBtn"
                  >
                    Edit
                  </v-btn>
                  <v-list>
                    <v-list-tile
                      v-for="(item, index) in editList"
                      :key="index"
                    >
                      <v-list-tile-title>{{ item }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-y>
                  <v-btn
                    slot="activator"
                    color="black"
                    class="white--text editBtn"
                  >
                    Actions
                  </v-btn>
                  <v-list>
                    <v-list-tile
                      v-for="(item, index) in actionList"
                      :key="index"
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
      <v-dialog v-model="hashrate" width="75%">
        <v-card class="infoCard"
        style="
          background: -webkit-linear-gradient(to top, #000000, #4b0082, #669999);
          background: linear-gradient(to top, #000000, #4b0082, #669999);
          ">
          <v-card-title v-if='brand=="Nvidia"' class="green--text headline black lighten-2" primary-title>
          {{ brand }}
          </v-card-title>
          <v-card-title v-else class="red--text headline black lighten-2" primary-title>
          {{ brand }}
          </v-card-title>

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
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      rigNumber: [1, 2, 3],
      rigHostname: ["13bj5bv3k", "2jhO2h4bd", "3bvoi2h34"],
      rigStatus: ["alive", "dead", "alive"],
      rigSeen: ["30 secs", "5 hours", "30 secs"],
      gpuNumber: [1, 2, 3, 4, 5, 6],
      hashrate: false,
      editList: ["System", "Coins", "Overclock"],
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
      this.hashrate = !this.hashrate
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
}
.rigLi {
  text-decoration: none;
  letter-spacing: 0.10em;
  display: inline-block;
  padding: 2px 15px;
  position: relative;
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
  width: 100%; 
  left: 0; 
}
@media screen and (max-height: 300px) {
	ul {
		margin-top: 40px;
	}
}
.span-text {
  vertical-align:50%;
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

