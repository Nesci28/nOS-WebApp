<template>
  <v-app>
    <div class="background">

      <div class="login-box pt-5">
        <h3 @click="example" class="hidden-sm-and-down exampleVertical">View an Example</h3>
        <h1>Login</h1>

        <div class="textbox">
          <i class="fas fa-user"></i>
          <input type="text" placeholder="Email address" v-model="user.login">
        </div>

        <div class="textbox">
          <i class="fas fa-lock"></i>
          <input type="password" placeholder="Password" v-model="user.password">
        </div>

        <input @click="checkLogin" type="submit" class="btn" value="Sign in">
        <h3 @click="example" class="hidden-md-and-up btn">View an Example</h3>
        <h3 class="white--text">Use the login information you configured your rigs with</h3>
        
      </div>
    </div>
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
      },
    }
  },
  methods: {
    example() {
      this.$router.push('example')
    },
    checkLogin() {
      if (this.user.login && this.user.password) {
        localStorage.name = this.user.login
        localStorage.password = this.user.password
        this.$router.push('rigs')
      }
    }
  },
  created: function () {
    if (localStorage.name && localStorage.password) {
      this.$router.push('rigs')
    }
  }
};
</script>

<style>
.centerTitle{
  text-align: center;
}
.exampleHorizontal{
  position: absolute;
  width: 12%;
  background: none;
  border: 3px solid rgb(240, 226, 150);
  color: rgb(240, 226, 150);
  font-size: 30px;
  text-align: center;
  cursor: pointer;
  margin: 15px 0;
  height: 92.5%;
  left: -15%;
}
.exampleVertical{
  position: absolute;
  width: 12%;
  background: none;
  border: 3px solid rgb(240, 226, 150);
  color: rgb(240, 226, 150);
  font-size: 30px;
  text-align: center;
  cursor: pointer;
  margin: 15px 0;
  height: 80%;
  left: -15%;
  top: 13%;
  writing-mode: vertical-lr;
}
.background{
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: url(../assets/btc.jpeg);
  height: 100%;
  background-size: cover;
}
.login-box{
  width: 40%;
  top: 25%;
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
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
  cursor: pointer;
  margin: 12px 0;
}
</style>

