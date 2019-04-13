<template>
  <v-app>
    <div class="background"></div>
      <v-form v-on:submit="checkLogin" class="login-box">
        <h1>Login</h1>

        <div class="textbox">
          <i class="fas fa-user"></i>
          <input type="text" placeholder="Email address" v-model="user.login">
        </div>

        <div class="textbox">
          <i class="fas fa-lock"></i>
          <input type="password" placeholder="Password" v-model="user.password">
        </div>

        <v-btn flat @click="checkLogin" type="submit" color="#F0E296" class="btn">Login</v-btn>
        <h3 class="white--text">Use the login information you configured your rigs with</h3>
      </v-form>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      loggedIn: false,
      user: {
        login: "",
        password: "",
      }
    }
  },
  methods: {
    example() {
      this.$router.push('example')
    },
    checkLogin() {     
      if (this.user.login && this.user.password) {
        this.$store.state.username = this.user.login
        this.$store.state.password = this.user.password
        localStorage.username = this.user.login
        localStorage.password = this.user.password
        this.$router.push('rigs')
      }
    }
  },
  created: function () {
    if (localStorage.username && localStorage.password) {
      this.$store.state.username = localStorage.username
      this.$store.state.password = localStorage.password
      this.$router.push('rigs')
    }
  }
};
</script>

<style scope>
.centerTitle{
  text-align: center;
}
.exampleVertical{
  transform: rotate(90deg) translate(50% , 510%);
  height: 20%;
  background: none;
  border: 3px solid rgb(240, 226, 150);
  color: rgb(240, 226, 150);
  padding: 5px;
  font-size: 30px;
  margin: 18px 0;
}
.login-box{
  position: absolute;
  width: 50%;
  transform: translate(50%, 0%);
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
.t.centerText{
  text-align: center;
  text-decoration: underline;
}
.textbox input{
  border: none;
  outline: none;
  background: none;
  color: white;
  font-size: 18px;
  width: 80%;
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

