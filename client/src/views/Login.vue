<template>
  <v-app>
    <div class="background" />
    <v-form class="login-box box pa-5" @submit="checkLogin">
      <h1>Login</h1>

      <div class="textbox">
        <v-icon color="white">account_box</v-icon>
        <input v-model="user.login" type="text" placeholder="Email address" />
      </div>

      <div class="textbox">
        <v-icon color="white">lock</v-icon>
        <input v-model="user.password" type="password" placeholder="Password" />
      </div>

      <v-btn flat color="#F0E296" class="btn" @click="checkLogin">Sign in</v-btn>
      <h3 class="white--text pt-2">
        <v-icon color="#F0E296" medium>info</v-icon>Use the login information from SystemConfig.json
      </h3>
      <h3 class="white--text pt-2">
        <v-icon color="#F0E296" medium>info</v-icon>For a demo, use
        <span class="logoColor">markgagnon // root</span> as the account information.
      </h3>
    </v-form>
  </v-app>
</template>

<script>
const axios = require("axios");

axios.defaults.withCredentials = true;
axios.defaults.headers = {
  "Content-Type": "application/json"
};

export default {
  name: "App",
  data() {
    return {
      urlGet: "",
      loggedIn: false,
      user: {
        login: "",
        password: ""
      },
      resData: ""
    };
  },
  mounted() {
    window.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        this.checkLogin();
      }
    });
  },
  async created() {
    if (!window.location.port) {
      this.urlGet =
        window.location.protocol +
        "//" +
        window.location.hostname +
        "/api/v2/action/login";
    } else {
      this.urlGet =
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":5000/api/v2/action/login";
    }

    const res = await axios.get(this.urlGet);
    if (res.data.isAuthenticated) this.$router.push("/rigs");
  },
  methods: {
    async checkLogin() {
      const res = await axios.get(this.urlGet);
      this.resData = res.data;
      if (res.data == "not logged in!") {
        const dbEntry = await axios.post(this.urlGet, {
          username: this.user.login.toString(),
          password: this.user.password.toString()
        });
        if (dbEntry.data.isAuthenticated) {
          this.$router.push("/rigs");
          window.location.reload();
        }
      }
    }
  }
};
</script>

<style scope>
.box {
  margin-top: 2rem;
  width: 90%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 5px solid white;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
}
.login-box {
  vertical-align: middle;
  color: white;
  max-width: 900px;
}
.login-box h1 {
  float: left;
  font-size: 40px;
  border-bottom: 6px solid rgb(240, 226, 150);
  margin-bottom: 50px;
  padding: 13px 0;
}
.textbox {
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  padding: 8px 0;
  margin: 8px 0;
  border-bottom: 1px solid white;
}
.textbox i {
  width: 26px;
  float: left;
  text-align: center;
}
.textbox input {
  border: none;
  outline: none;
  background: none;
  color: white;
  font-size: 18px;
  width: 50%;
  float: left;
  margin: 0 10px;
}
.btn {
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
