<template>
  <v-app style="background: black">

    <v-toolbar app fixed color="black" class="white--text">
      <v-toolbar-side-icon @click.stop="drawer=!drawer" class="white--text hidden-md-and-up"></v-toolbar-side-icon>
      <v-divider vertical color="white" class="hidden-md-and-up"></v-divider>
      <router-link to="/" class="toolbarHome pr-4">CHOSN</router-link>
      <v-divider v-if="isLoggedIn" vertical color="white" class="hidden-sm-and-down"></v-divider>
      <router-link v-if="isLoggedIn" to="/Coins" class="hidden-sm-and-down toolbar">Coins</router-link>
      <v-divider v-if="isLoggedIn" vertical color="white" class="hidden-sm-and-down"></v-divider>
      <router-link v-if="isLoggedIn" to="/Miners" class="hidden-sm-and-down toolbar">Miners</router-link>
      <v-divider v-if="isLoggedIn" vertical color="white" class="hidden-sm-and-down"></v-divider>
      <span v-if="isLoggedIn" v-on:click="loggedOut" style="cursor: pointer" class="hidden-sm-and-down toolbar">Logout</span>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn href="https://discord.gg/aPg5W2k" target="_noblank" class="hidden-sm-and-down" type="email" flat color="white">
          <v-icon color="white">message</v-icon>
          message
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      dark
    >
    <v-list class="pt-0" dense>
      <v-list-tile v-if="isLoggedIn" to="/Coins" onclick="location.reload(true)">
        <v-list-tile-content >
          <v-list-tile-title>Coins</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="isLoggedIn" to="/Miners" onclick="location.reload(true)">
        <v-list-tile-content>
          <v-list-tile-title>Miners</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile v-if="isLoggedIn" to="/" @click="loggedOut">
        <v-list-tile-content>
          <v-list-tile-title>  
            <v-icon>exit_to_app</v-icon>
          Logout</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile href="https://discord.gg/aPg5W2k" target="_noblank">
        <v-list-tile-content>
          <v-list-tile-title>
            <v-icon>message</v-icon>
          Message</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>

    
      <v-content>
        <transition name="router-anim">
          <router-view/>
        </transition>
      </v-content>

    <v-footer app fixed color="black" class="pa-3">
      <pre class="white--text pr-2">Marc Gagnon</pre>
      <pre class="white--text">(Chosn WebApp - Portfolio) &copy; 2019</pre>
      <v-spacer></v-spacer>
    </v-footer>

  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
      }
    },
    methods: {
      loggedOut() {
        this.$store.state.username = ""
        this.$store.state.password = ""
        localStorage.username = ""
        localStorage.password = ""
        this.$router.push('/')
      },
      email() {
        console.log("you pressed the mail button")
      }
    },
    computed: {
      isLoggedIn() {
        if (this.$store.state.username && this.$store.state.password) return true
        return false
      },
    }
  }
</script>

<style>
.content{
  position: absolute;
  margin-left: 20px;
  margin-right: 20px;
}
.background{
  background: url(./assets/btc.jpeg) no-repeat center center fixed;
  background-size: cover;
  filter: blur(4px);
  transform: scale(1.02);
  background-attachment: fixed;
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
  font-weight: bold;
  color: white;
  font-size: 20px;
  text-decoration: none;
  letter-spacing: 0.10em;
  display: inline-block;
  padding-top: 18px;
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
