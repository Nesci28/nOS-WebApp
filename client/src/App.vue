<template>
  <v-app style="background: rgb(46, 46, 46)">
    <v-toolbar app fixed class="white--text toolbarIndex" style="background-color: black;" extended extension-height="1">
      <v-toolbar-side-icon @click.stop="drawer=!drawer" class="white--text hidden-md-and-up"></v-toolbar-side-icon>
      <v-divider vertical color="white" class="hidden-md-and-up"></v-divider>
      <router-link :to=dynamicLink class="toolbarHome pr-4">{{ dynamicTitle }}</router-link>
      <v-divider vertical color="white" class="hidden-sm-and-down"></v-divider>
      <span v-on:click="download" style="cursor: pointer" class="hidden-sm-and-down toolbar"><v-icon color="rgb(240, 226, 150)">cloud_download</v-icon><br />Download</span>
      <v-divider vertical color="white" class="hidden-sm-and-down"></v-divider>
        
      <v-menu open-on-hover down offset-y>
        <template v-slot:activator="{ on }">
          <span v-on="on" style="cursor: pointer" class="hidden-sm-and-down toolbar"><v-icon color="rgb(240, 226, 150)">info</v-icon><br />About</span>
        </template>

        <v-list dark>
          <v-list-tile
            v-for="item in aboutList"
            :key="item"
            :to="'about' + item"
          >
            <v-list-tile-title>
              <v-icon v-if='item=="nOS"' color="rgb(240, 226, 150)">memory</v-icon>
              <v-icon v-if='item=="Me"' color="rgb(240, 226, 150)">person</v-icon>
              {{ item }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      
      <v-divider vertical color="white" class="hidden-sm-and-down"></v-divider>
      <span v-if="isLoggedIn" v-on:click="loggedOut" style="cursor: pointer" class="hidden-sm-and-down toolbar"><v-icon color="rgb(240, 226, 150)">exit_to_app</v-icon><br />Logout</span>
      <v-divider v-if="isLoggedIn" vertical color="white" class="hidden-sm-and-down"></v-divider>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn href="https://discord.gg/aPg5W2k" target="_noblank" class="hidden-sm-and-down" type="email" flat color="white">
          <v-icon color="white">message</v-icon>
          message
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer
      class="menuIndex"
      v-model="drawer"
      absolute
      temporary
      dark
    >
    <v-list class="pt-0">

      <v-list-tile to="/download">
        <v-list-tile-content>
          <v-list-tile-title>  
            <v-icon color="rgb(240, 226, 150)">cloud_download</v-icon>
          Download</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list>
        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-icon color="rgb(240, 226, 150)">info</v-icon>
              <v-list-tile-title>About</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="item in aboutList"
            :key="item"
            :to="'about' + item"
            >
              <v-icon v-if='item=="nOS"' color="rgb(240, 226, 150)">memory</v-icon>
              <v-icon v-if='item=="Me"' color="rgb(240, 226, 150)">person</v-icon>
              <v-list-tile-title>{{ item }}</v-list-tile-title>
            </v-list-tile>
        </v-list-group>
      </v-list>

      <v-divider></v-divider>
      
      <v-list-tile v-if="isLoggedIn" to="/" @click="loggedOut">
        <v-list-tile-content>
          <v-list-tile-title>  
            <v-icon color="rgb(240, 226, 150)">exit_to_app</v-icon>
          Logout</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile href="https://discord.gg/aPg5W2k" target="_noblank">
        <v-list-tile-content>
          <v-list-tile-title>
            <v-icon color="rgb(240, 226, 150)">message</v-icon>
          Message</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>

    <v-content>
      <transition name="router-anim">
        <router-view />
      </transition>
    </v-content>

    <v-footer fixed color="black" class="toolbarIndex footerBorder pa-3">
      <pre class="white--text pr-2">Marc Gagnon</pre>
      <pre class="white--text">(nOS WebApp - Portfolio) &copy; 2019</pre>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script> 
  const axios = require('axios');
  axios.defaults.withCredentials = true
  axios.defaults.headers = {
    'Content-Type': 'application/json'
  }

  export default {
    data() {
      return {
        aboutList: ["nOS", "Me"],
        drawer: false,
        isLoggedIn: false,
        dynamicTitle: 'nOS',
        dynamicLink: '/',
        urlGet: '',
        urlLogout: ''
      }
    },
    methods: {
      download() {
        this.$router.push('/download')
      },
      about() {
        this.$router.push('/about')
      },
      loggedOut() {
        axios.post(this.urlLogout)
          .then(this.$router.push('/'))
          .then(this.logged())
          .then(window.location.reload())
      },
      logged() {
        axios.get(this.urlGet)
          .then(res => {
            if (res.data.isAuthenticated) {
              this.isLoggedIn = true
              this.dynamicTitle = 'Rigs'
              this.dynamicLink = '/rigs'
            } else {
              this.isLoggedIn = false
              this.dynamicTitle = 'nOS'
              this.dynamicLink = '/'
            }
          })
      },
      email() {
        console.log("you pressed the mail button")
      }
    },
    created() {
      if (window.location.href.includes('localhost')) {
        this.urlGet = "http://localhost:5000/action/login"
        this.urlLogout = "http://localhost:5000/action/logout"
      } else if (window.location.href.includes('192.168')) {
        this.urlGet = "http://192.168.0.127:5000/action/login"
        this.urlLogout = "http://192.168.0.127:5000/action/logout"
      } else {
        this.urlGet = "https://nos-server.now.sh/action/login"
        this.urlLogout = "https://nos-server.now.sh/action/logout"
      }
      this.logged()
    }
  }
</script>

<style>
.logoColor{
  color: rgb(240, 226, 150);
}
.disable-events {
  background-color: black;
  opacity: 0.25;
  pointer-events: none
}
.middle{
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
}
.menuIndex{
  z-index:9998;
}
.toolbarIndex{
  border-bottom: 3px solid rgb(240, 226, 150);
  /* border-bottom: 3px solid white; */
  z-index: 9999;
}
.box {
	border: #000 solid 2px;
  height: auto;
}
.background{
    /* background-image:linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)), url(./assets/nOSWallpaper.jpg); */
  background-color: rgb(46, 46, 46);
  background-size: cover;
  background-repeat:no-repeat;
  -moz-background-size: cover;
  -o-background-size: cover;
  -webkit-background-size: cover;
  -ms-content-zooming: none;
  position:fixed;
  width:100%;
  height:100%;
}
.router-anim-enter-active {
  animation: coming .5s;
  animation-delay: .5s;
  opacity: 0;
}
.router-anim-leave-active {
  animation: going .5s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}
@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.icon-img{
  font-family: 'Material Icons'; 
}
.toolbarHome {
  font-weight: bold;
  color: rgb(240, 226, 150);
  font-size: 30px;
  text-decoration: none;
  letter-spacing: 0.10em;
  display: inline-block;
  padding: 1px 5px;
  position: relative;
}
.toolbarHome:after {    
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 1px;
  left: 50%;
  position: absolute;
  background: rgb(240, 226, 150);
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}
.toolbarHome:hover:after { 
  width: 100%; 
  left: -10px; 
}
@media screen and (max-height: 300px) {
	ul {
		margin-top: 40px;
	}
}
.toolbar {
  text-align: center;
  font-weight: bold;
  color: white;
  font-size: 15px;
  text-decoration: none;
  letter-spacing: 0.10em;
  display: inline-block;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  height: 100%;
}
.toolbar:hover{
  background: white;
  color: black;
}
</style>
