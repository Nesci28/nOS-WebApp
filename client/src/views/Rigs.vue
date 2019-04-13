<template>
  <v-app>
    <div class="background"></div>
    <div class="content">
      <v-layout class="pt-5" row wrap>
        <v-flex xs16 sm16 md6 lg6 v-for="rig in rigNumber" :key="rig" pa-4>
          
          <v-card v-bind:class="{ flashingCard: !rigStatus[rig - 1] && !disableSwitch[rig - 1] }" v-model="rigHostname[rig - 1]" class="fade-in rounded-card rigCard" height="100%" top="30%">  
            <h1 @click="rigGraph=!rigGraph" v-bind:class="{ redText: !rigStatus[rig - 1] && !disableSwitch[rig - 1] }" class="textColor pl-3" style="text-align:left;float:left;">{{ rigHostname[rig - 1] }}</h1> 
            <v-switch
              style="text-align:left;float:left;"
              v-if='!rigStatus[rig - 1]'
              v-model="disableSwitch[rig - 1]"
              color="red"
              height=0.01
              class="lastSeen mt-3 ml-5"
              dark
            ></v-switch>
            <h2 v-if='!rigStatus[rig - 1]' class="white--text pt-1 pr-3" style="text-align:right;float:right;">{{ rigSeen[rig - 1] }} ago</h2> 
            <hr style="clear:both;" color="#F0E296"/>
            
            <div>
              <ul v-if='rigBrand[rig - 1].includes("Nvidia")' style="cursor: pointer" class="rigUlGreen white--text">
                <li class="rigLi" @click='hashrateOver("nvidia")'>
                  <img src="../assets/nvidia.png" height="30" class="pt-2" fill-height>
                </li>
                <li class="rigLi" @click='hashrateOver("nvidia", rig)'>{{ coin[rig - 1][0] }}</li>
                <li class="rigLi" @click='hashrateOver("nvidia", rig)'>{{ algo[rig - 1][0] }}</li>
                <li v-if="rigStatus[rig - 1]" class="rigLi" @click='hashrateOver("nvidia", rig)'>{{ hashrateNvidia[rig - 1] }}</li>
                <li v-else class="rigLi" @click='hashrateOver("nvidia", rig)'>null</li>
                <li v-if="rigStatus[rig - 1]" class="rigLi" @click='hashrateOver("nvidia", rig)'>{{ parseInt(temperatureNvidia[rig - 1]) }} °C</li>
                <li v-else class="rigLi" @click='hashrateOver("nvidia", rig)'>null</li>
                <li v-if="rigStatus[rig - 1]" class="rigLi" @click='hashrateOver("nvidia", rig)'>{{ parseInt(wattNvidia[rig - 1]) }} W</li>
                <li v-else class="rigLi" @click='hashrateOver("nvidia", rig)'>null</li>
              </ul>
              <v-divider color="#F0E296"></v-divider>
              <ul v-if='rigBrand[rig - 1].includes("Amd")' style="cursor: pointer"  class="rigUlRed white--text">
                <li class="rigLi" @click='hashrateOver("amd")'>
                  <img src="../assets/amd.png" height="30" class="pt-2" fill-height>
                </li>
                <li class="rigLi" @click='hashrateOver("amd", rig)'>{{ coin[rig - 1][1] }}</li>
                <li class="rigLi" @click='hashrateOver("amd", rig)'>{{ algo[rig - 1][1] }}</li>
                <li v-if="rigStatus[rig - 1]" class="rigLi" @click='hashrateOver("amd", rig)'>{{ hashrateAmd[rig - 1] }}</li>
                <li v-else class="rigLi" @click='hashrateOver("nvidia", rig)'>null</li>
                <li v-if="rigStatus[rig - 1]" class="rigLi" @click='hashrateOver("amd", rig)'>{{ parseInt(temperatureAmd[rig - 1]) }} °C</li>
                <li v-else class="rigLi" @click='hashrateOver("nvidia", rig)'>null</li>
                <li v-if="rigStatus[rig - 1]" class="rigLi" @click='hashrateOver("amd", rig)'>{{ parseInt(wattAmd[rig - 1]) }} W</li>
                <li v-else class="rigLi" @click='hashrateOver("nvidia", rig)'>null</li>
              </ul>
              <v-divider color="#F0E296"></v-divider>

              <div class="pt-2">
                <v-menu offset-y>
                  <v-btn slot="activator" color="transparent" class="white--text editBtn">Edit</v-btn>
                  <v-list dark>
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
                  <v-btn slot="activator" color="transparent" class="white--text editBtn">Logs</v-btn>
                  <v-list dark>
                    <v-list-tile
                      v-for="(item, index) in logsList"
                      :key="index"
                      :to="{ name: 'logs', params: { id: rigHostname[rig - 1] } }"
                    >
                      <v-list-tile-title>{{ item }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-y>
                  <v-btn slot="activator" color="transparent" class="white--text editBtn">Actions</v-btn>
                  <v-list dark>
                    <v-list-tile
                      v-for="(item, index) in actionList"
                      :key="index"
                      @click="action(index, rigHostname[rig - 1])"
                    >
                      <v-list-tile-title>{{ item }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-btn @click="rigGraph = !rigGraph" color="transparent" class="white--text editBtn">View Graphs</v-btn>
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
            <v-card-title v-if='brand=="Amd"' class="red--text headline lighten-2" primary-title>
            {{ brand }}
            </v-card-title>
            <ul class="white--text gpuUl">
              <li class="gpuLi">GPU #</li>
              <li class="gpuLi">hashrate</li>
              <li class="gpuLi">temperature</li>
              <li class="gpuLi">watt</li>
              <li class="gpuLi">name</li>                
            </ul>
            <v-divider color="#F0E296"></v-divider>

            <div v-if='brand=="Nvidia"'>
              <ul v-for="i in gpuNumberNvidia[key - 1]" :key="i" class="white--text gpuUl">
                <li class="gpuLi">{{ i }}</li>
                <li class="gpuLi">{{ gpuHashrateNvidia[key - 1][i - 1] || "undefined" }}</li>
                <li class="gpuLi">{{ Number(gpuTemperatureNvidia[key - 1][i - 1]).toFixed(0) || "undefined" }} °C</li>
                <li class="gpuLi">{{ gpuWattNvidia[key - 1][i - 1] || "undefined" }}</li>
                <li class="gpuLi">{{ gpuNameNvidia[key - 1][i - 1] || "undefined" }}</li>                
              </ul>
            </div>
            <div v-if='brand=="Amd"'>
              <ul v-for="i in gpuNumberAmd[key - 1]" :key="i" class="white--text gpuUl">
                <li class="gpuLi">{{ i }}</li>
                <li class="gpuLi">{{ Number(gpuTemperatureAmd[key - 1][i - 1]).toFixed(0) || "undefined" }} °C</li>
                <li class="gpuLi">{{ gpuHashrateAmd[key - 1][i - 1] || "undefined" }}</li>
                <li class="gpuLi">{{ gpuWattAmd[key - 1][i - 1] || "undefined" }} W</li>
                <li class="gpuLi">{{ gpuNameAmd[key - 1][i - 1] || "undefined" }}</li>
              </ul>
            </div>
          </v-card>      
        </v-dialog>
      </v-flex>

      <v-flex xs16 sm16 md6 lg6>
        <v-dialog v-model="rigGraph" width="75%">
          <v-card class="infoCard rounded-card" color="black">
            <h1 class="white--text">Grafana Graphs</h1>
          </v-card>      
        </v-dialog>
      </v-flex>

    </div>
  </v-app>
</template>

<script>
const axios = require('axios');

export default {
  name: 'App',
  data() {
    return {
      url: 'https://nos-server.now.sh/db/',
      i: 0,
      disableSwitch: [],

      coin: [],
      algo: [],
      timeDifference: [],
      rigNumber: [],
      rigSeen: [],
      rigHostname: [],
      rigStatus: [],
      rigBrand: [],
      rigSSH: null,

      hashrateNvidia: [],
      hashrateAmd: [],
      temperatureNvidia: [],
      temperatureAmd: [],
      wattNvidia: [],
      wattAmd: [],
      
      gpuNumberNvidia: [],
      gpuUtilizationNvidia: [],
      gpuHashrateNvidia: [],
      gpuTemperatureNvidia: [], 
      gpuWattNvidia: [], 
      gpuCClockNvidia: [], 
      gpuMClockNvidia: [],
      gpuNameNvidia: [],

      gpuNumberAmd: [],
      gpuUtilizationAmd: [],
      gpuHashrateAmd: [],
      gpuTemperatureAmd: [], 
      gpuWattAmd: [], 
      gpuCClockAmd: [], 
      gpuMClockAmd: [], 
      gpuNameAmd: [],

      brand: undefined,
      gpuDialog: false,
      rigGraph: false,
      key: 0,

      editList: ["System", "Coins", "Overclocks"],
      logsList: ["Miners"],
      actionList: ["SSH", "Restart nOS", "Restart Rig", "Shutdown Rig"],

      APITimer: undefined
    };
  },
  methods: {
    createCmdObject(hostname, cmd) {
      return {
        "username": this.$store.state.username,
        "password": this.$store.state.password,
        "hostname": hostname,
        "command": cmd
      }
    },
    action(index, hostname) {
      if (index == 0) {
        let win = window.open(this.rigSSH, '_noblank')
        win.focus()
      } else if (index == 1) {
        axios.post('http://localhost:5000/command', this.createCmdObject(hostname, 'start'))
      } else if (index == 2) {
        axios.post('http://localhost:5000/command', this.createCmdObject(hostname, 'sudo shutdown -r now'))
      } else if (index == 2) {
        axios.post('http://localhost:5000/command', this.createCmdObject(hostname, 'sudo shutdown now'))
      }
    },
    hashrateOver(brand, key) {
      this.gpuDialog = !this.gpuDialog
      if (brand == "nvidia") {
        this.brand = "Nvidia"
        this.key = key
      } else {
        this.brand = "Amd"
        this.key = key
      }
    },
    returnToDefaults() {
      this.timeDifference = [],
      this.rigNumber = [],
      this.rigSeen = [],
      this.rigHostname = [],
      this.rigStatus = [],
      this.rigBrand = [],
      this.rigSSH = null,

      this.hashrateNvidia = [],
      this.hashrateAmd = [],
      this.temperatureNvidia = [],
      this.temperatureAmd = [],
      this.wattNvidia = [],
      this.wattAmd = [],
      
      this.gpuNumberNvidia = [],
      this.gpuUtilizationNvidia = [],
      this.gpuHashrateNvidia = [],
      this.gpuTemperatureNvidia = [], 
      this.gpuWattNvidia = [], 
      this.gpuCClockNvidia = [], 
      this.gpuMClockNvidia = [],
      this.gpuNameNvidia = [],

      this.gpuNumberAmd = [],
      this.gpuUtilizationAmd = [],
      this.gpuHashrateAmd = [],
      this.gpuTemperatureAmd = [], 
      this.gpuWattAmd = [], 
      this.gpuCClockAmd = [], 
      this.gpuMClockAmd = [], 
      this.gpuNameAmd = [], 
      
      this.brand = undefined,
      this.gpuDialog = false
    },
    rigInfo() {
      this.returnToDefaults()

      axios
        .get(this.url + this.$store.state.username + '/' + this.$store.state.password)
        .then(response => {
          console.log(response.data)

          this.rigHostname = new Set()
          for (let i = 0; i < response.data.length; i++) {
            this.rigHostname.add(response.data[i].Hostname)
            this.rigSSH = response.data[i].Shellinabox
            this.rigNumber.push(i + 1)

            let now = + new Date()
            this.timeDifference[i] = now - response.data[i]["New Time"]
            if (this.timeDifference[i] < 1 * 60 * 1000) {
              this.rigStatus[i] = true
              this.rigSeen[i] = "< 30 secs"
            } else {
              this.rigStatus[i] = false
              let time = this.timeDifference[i]
              time = Math.round(time / 1000 / 60)
              this.rigSeen[i] = "> " + time + " mins"
            }
            
            if (Object.keys(response.data[i].Nvidia.GPU).length > 0 && Object.keys(response.data[i].Amd.GPU).length > 0) {
              this.rigBrand[i] = ["Nvidia", "Amd"]
              this.gpuNumberNvidia[i] = response.data[i].Nvidia.GPU.length
              this.gpuNumberAmd[i] = response.data[i].Amd.GPU.length
              this.coin[i] = [response.data[i].Nvidia.Coin, response.data[i].Amd.Coin]
              this.algo[i] = [response.data[i].Nvidia.Algo, response.data[i].Amd.Algo]
              this.getGpuInfo(i, "Nvidia", response)
              this.getGpuInfo(i, "Amd", response)
            } else if (Object.keys(response.data[i].Nvidia.GPU).length > 0) {
              this.rigBrand[i] = "Nvidia"
              this.gpuNumberNvidia[i] = response.data[i].Nvidia.GPU.length
              this.coin[i] = [response.data[i].Nvidia.Coin]
              this.algo[i] = [response.data[i].Nvidia.Algo]
              this.getGpuInfo(i, "Nvidia", response)
            } else if (Object.keys(response.data[i].Amd.GPU).length > 0) {
              this.rigBrand[i] = "Amd"
              this.gpuNumberAmd[i] = response.data[i].Amd.GPU.length
              this.coin[i] = ["", response.data[i].Amd.Coin]
              this.algo[i] = ["", response.data[i].Amd.Algo]
              this.getGpuInfo(i, "Amd", response)
            }
          }
          this.rigHostname = Array.from(this.rigHostname)
          //console.log(this.coin, this.algo, this.hashrateNvidia, this.temperatureNvidia, this.wattNvidia, this.hashrateAmd, this.temperatureAmd, this.wattAmd, this.rigNumber, this.rigHostname, this.rigStatus, this.rigSeen, this.rigBrand)
          this.$store.state.json = response.data
        })
      this.APITimer = setTimeout(this.rigInfo, 30000)
    },
    getGpuInfo(i, brand, response) {
      if (brand == "Nvidia") {
        this.hashrateNvidia[i] = response.data[i].Nvidia["Total Hashrate"]
        this.temperatureNvidia[i] = response.data[i].Nvidia["Avg Temperature"]
        this.wattNvidia[i] = response.data[i].Nvidia["Total Watt"]
        
        let gpuHashTemp = []
        let gpuTempTemp = []
        let gpuWattTemp = []
        let gpuNameTemp = []
        for (let j = 0; j < response.data[i].Nvidia.GPU.length; j++) {
          gpuHashTemp.push(response.data[i].Nvidia.GPU[j].Hashrate)
          gpuTempTemp.push(response.data[i].Nvidia.GPU[j].Temperature)
          gpuWattTemp.push(response.data[i].Nvidia.GPU[j].Watt)
          gpuNameTemp.push((response.data[i].Nvidia.GPU[j].Name).replace(/GeForce GTX/, ''))   
        }
        this.gpuHashrateNvidia[i] = gpuHashTemp
        this.gpuTemperatureNvidia[i] = gpuTempTemp
        this.gpuWattNvidia[i] = gpuWattTemp
        this.gpuNameNvidia[i] = gpuNameTemp
        // console.log(this.gpuHashrateNvidia, this.gpuTemperatureNvidia, this.gpuWattNvidia, this.gpuNameNvidia)
      } else {
        this.hashrateAmd[i] = response.data[i].Amd["Total Hashrate"]
        this.temperatureAmd[i] = response.data[i].Amd["Avg Temperature"]
        this.wattAmd[i] = response.data[i].Amd["Total Watt"]
      
        let gpuHashTemp = []
        let gpuTempTemp = []
        let gpuWattTemp = []
        let gpuNameTemp = []
        for (let j = 0; j < response.data[i].Amd.GPU.length; j++) {
          gpuHashTemp.push(response.data[i].Amd.GPU[j].Hashrate)
          gpuTempTemp.push(response.data[i].Amd.GPU[j].Temperature)
          gpuWattTemp.push(response.data[i].Amd.GPU[j].Watt)
          gpuNameTemp.push(response.data[i].Amd.GPU[j].Name) 
        }
        this.gpuHashrateAmd[i] = gpuHashTemp
        this.gpuTemperatureAmd[i] = gpuTempTemp
        this.gpuWattAmd[i] = gpuWattTemp
        this.gpuNameAmd[i] = gpuNameTemp
        // console.log(this.gpuHashrateAmd, this.gpuTemperatureAmd, this.gpuWattAmd, this.gpuNameAmd)
      }
    }
  },
  created() {
    if (!this.$store.state.username || !this.$store.state.password) {
      this.$router.push('/')
    } else {
      console.log("db initialized")
      this.rigInfo()
    }
  },
  destroyed() {
    clearTimeout(this.APITimer);
  }
}

</script>

<style scoped>
.textColor{
  color: white;
}
.editBtn{
  top: -5px;
  left: 10px
}
.infoCard {
  margin-left: auto;
  margin-right: auto;
}
.rounded-card {
  border-radius:30px;
}
.rigCard{
  border: 5px solid rgb(240, 226, 150);
  background:rgba(255,255,255,0.10);
}
.rigCard:hover{
  box-shadow: 0 28px 36px rgba(240, 226, 150,0.25), 0 10px 10px rgba(240, 226, 150,0.22);
}
.gpuUl {
  background: black;
  width: 100%;
  margin: 0;
  padding: 0;
  display: table;
}
.gpuLi {
  width: 20%;
  text-decoration: none;
  letter-spacing: 0.10em;
  display: inline-block;
  padding: 2px 15px;
  position: relative;
  color: white;
}
.rigUlGreen {
  z-index: 9999;
  display: table;
  margin: 0;
}
.rigUlGreen:hover { 
  width: 100%;
  background-color: rgba(154, 205, 50, 0.5); 
}
.rigUlRed {
  z-index: 9999;
  display: table;
  margin: 0;
}
.rigUlRed:hover { 
  width: 100%;
  background-color: rgba(223, 3, 3, 0.5); 
}
.rigLi {
  text-decoration: none;
  width: 80px;
  display: inline-block;
  position: relative;
  text-align: center;
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

