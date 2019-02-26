<template>
  <v-app>
    <v-toolbar app fixed color="black" class="white--text">
      <!-- <v-toolbar-side-icon class="white--text"></v-toolbar-side-icon> -->
      <router-link to="/" class="toolbar">CHOSN</router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn type="email" flat color="white">
          <v-icon color="white">message</v-icon>
          message
        </v-btn>
        <!-- <v-btn flat class="white--text">Link One</v-btn>
        <v-btn flat class="white--text">Link Two</v-btn>
        <v-btn flat class="white--text">Link Three</v-btn> -->
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>
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
.icon-img{
  font-family: 'Material Icons'; 
}
.toolbar {
  font-weight: bold;
  color: white;
  font-size: 30px;
  text-decoration: none;
  letter-spacing: 0.10em;
  display: inline-block;
  padding: 1px 5px;
  position: relative;
}
.toolbar:after {    
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
.toolbar:hover:after { 
  width: 100%; 
  left: 0; 
}
@media screen and (max-height: 300px) {
	ul {
		margin-top: 40px;
	}
}
</style>
