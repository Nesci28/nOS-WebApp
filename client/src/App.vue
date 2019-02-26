<template>
  <v-app style="background: black">

    <v-toolbar app fixed color="black" class="white--text">
      <!-- <v-toolbar-side-icon class="white--text"></v-toolbar-side-icon> -->
      <router-link to="/" class="toolbarHome pr-4">CHOSN</router-link>
      <v-divider vertical color="white"></v-divider>
      <router-link to="/Coins" class="toolbar">Coins</router-link>
      <v-divider vertical color="white"></v-divider>
      <router-link to="/Miners" class="toolbar">Miners</router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn class="hidden-sm-and-down" type="email" flat color="white">
          <v-icon color="white">message</v-icon>
          message
        </v-btn>
        <!-- <v-btn flat class="white--text">Link One</v-btn>
        <v-btn flat class="white--text">Link Two</v-btn>
        <v-btn flat class="white--text">Link Three</v-btn> -->
      </v-toolbar-items>
    </v-toolbar>
    
      <v-content>
        <transition name="router-anim">
          <router-view/>
        </transition>
      </v-content>

    <v-footer fixed color="black" class="pa-3">
      <pre class="white--text pr-2">Marc Gagnon</pre>
      <pre class="white--text">(Chosn WebApp - Portfolio) &copy; {{ new Date().getFullYear() }}</pre>
      <v-spacer></v-spacer>
    </v-footer>

  </v-app>
</template>

<script>
  export default {
    data: () => ({

    }),
    methods: {
      email() {
        console.log("you pressed the mail button")
      }
    }
  }
</script>

<style>
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
