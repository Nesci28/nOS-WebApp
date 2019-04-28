<template>
  <v-app>
    <div class="background"></div>
      <v-form v-on:submit="checkLogin" class="login-box box pa-5">
        <h1>Login</h1>

        <div class="textbox">
          <v-icon color="white">account_box</v-icon>
          <input type="text" placeholder="Email address" v-model="user.login">
        </div>

        <div class="textbox">
          <v-icon color="white">lock</v-icon>
          <input type="password" placeholder="Password" v-model="user.password">
        </div>

        <v-btn flat @click="checkLogin" color="#F0E296" class="btn">Sign in</v-btn>
        <h3 class="white--text pt-2"><v-icon color="#F0E296" medium>info</v-icon> Use the login information from SystemConfig.json</h3>
        <h3 class="white--text pt-2"><v-icon color="#F0E296" medium>info</v-icon> For a demo, use <span class="logoColor">markgagnon // root</span> as the account information.</h3>
      </v-form>
  </v-app>
</template>

<script>
const axios = require('axios');
axios.defaults.withCredentials = true
axios.defaults.headers = {
  'Content-Type': 'application/json'
}

export default {
  name: 'App',
  data() {
    return {
      urlGet: '',
      loggedIn: false,
      user: {
        login: "",
        password: "",
      },
      resData: ''
    }
  },
  methods: {
    async checkLogin() {
      let res = await axios.get(this.urlGet)
      this.resData = res.data
      if (res.data == 'not logged in!') {
          let dbEntry = await axios.post(this.urlGet, {
            username: this.user.login,
            password: this.user.password
          })
          if (dbEntry.data.isAuthenticated) {
            this.$router.push('/rigs')
            window.location.reload()
          }
        
      }
    }
  },
  mounted() {
    window.addEventListener('keyup', event => {
      if (event.keyCode === 13) { 
        this.checkLogin()
      }
    })
  },
  async created() {
    if (window.location.href.includes('localhost')) {
      this.urlGet = "http://localhost:5000/action/login"
    } else if (window.location.href.includes('192.168')) {
      this.urlGet = "http://192.168.0.127:5000/action/login/"
    } else {
      this.urlGet = 'https://nos-server.now.sh/action/login/'
    }
    // fetch(this.urlGet)
    //     .then(function(response) {
    //       if (!response.ok) {
    //         throw Error(response.statusText);
    //       }
    //       return response.json();
    //     }).then(function(response) {
    //         console.log(response);
    //     }).catch(function(error) {
    //         console.log(error);
    //     });


    let res = await axios.get(this.urlGet)
    console.log(res)
    if (res.data.isAuthenticated) this.$router.push('/rigs')
  }
};
</script>

<style scope>
.box{
  margin-top: 5%;
  width: 90%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 5px solid white;
  background: rgba(0,0,0,0.75);
  z-index: 1;
}
.login-box{
  vertical-align: middle;
  color: white;
}
.login-box h1{
  float: left;
  font-size: 40px;
  border-bottom: 6px solid rgb(240, 226, 150);
  margin-bottom: 50px;
  padding: 13px 0;
}
.textbox{
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  padding: 8px 0;
  margin: 8px 0;
  border-bottom: 1px solid white;
}
.textbox i{
  width: 26px;
  float: left;
  text-align: center;
}
.textbox input{
  border: none;
  outline: none;
  background: none;
  color: white;
  font-size: 18px;
  width: 50%;
  float: left;
  margin: 0 10px;
}
.btn{
  width: 100%;
  background: none;
  border: 3px solid rgb(240, 226, 150);
  color: rgb(240, 226, 150);
  padding: 5px;
  font-size: 30px;
  margin: 12px 0;
  height: 20%;
}
</style>

