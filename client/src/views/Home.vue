<template>
  <v-app style="
    background: -webkit-linear-gradient(to top, #000000, #4b0082, #669999);
    background: linear-gradient(to top, #000000, #4b0082, #669999);
  ">
    <h1 class="loginText pa-2">Login</h1>
    <v-layout justify-center>
      <v-card class="textField elevation-20" color="transparent" height="100%" fill-height>
      <v-form @submit.prevent="checkLogin" color="transparent">
      <v-text-field
        v-model="user.login"
        color="white"
        label="Username"
        placeholder="email address"
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        color="white"
        label="Password"
        :type="'password'"
      ></v-text-field>
      <div>
        <v-btn class="formBtn" @click="clear()" color="white">Clear</v-btn>
        <v-btn class="formBtn" type="submit" color="success">Submit</v-btn>
      </div>
      </v-form>
      </v-card>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: {
        login: "",
        password: "",
      },
      access: ""
    }
  },
  methods: {
    checkLogin() {
      if (this.user.login == 'admin' && this.user.password == 'admin') {
        this.access = "true"
        this.$router.push('user')
      } else {
        this.access = "false"
      }
    },
    clear() {
      this.user.login = ''
      this.user.password = ''
    }
  },
  created: function () {

  }
};
</script>

<style>
.textField{
  width: 50%;
}
.formBtn{
  left: 60%;
}
.loginText{
  text-align: center;
}
</style>

