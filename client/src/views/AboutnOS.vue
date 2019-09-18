<template>
  <v-app>
    <div class="background" />
    <div class="text pa-5">
      <h3 class="white--text">
        <span class="logoColor">nOS (node-OS)</span> is a complete rewritten of CHOSN, but not endorsed by it. After the dead of the CHOSN project, due to the lack of time and lost of interest of 2 of it's original developpers, I decided to totally rewrite my own project from the ground up. Another reason why I chose to totally rewrite it over continuing the old project was; the lack of documentation, version control management and too many "hacks" that was making it too hard to maintain.
        <br>
        <br>
        <span class="logoColor">nOS</span>is totally free of charge and
        <span class="blue--text">open source</span> under the GPL_v3 license.
        <br>
        <br>It is possible to run
        <span class="logoColor">nOS</span> by either downloading the image and "etch" it or by cloning the github and installing the dependancies.
        <span
          class="logoColor"
        >nOS's</span> image uses the distro Arch with i3-gaps as the DE.
        <br>
        <br>
        <span class="logoColor">nOS</span> is made with nodejs for cross-platform purposes. The server back-end is made with Express, the front-end with VueJS and I used Mongo as the Databases.
        <br>
        <br>Features:
        <br>- Compatible Nvidia, AMD
        <br>- Automatic GPU Temperature controller: Controls the fans of the GPUs to reach the target temperature, if the fans reach the maximum value, it drops the wattage of the GPU until the target temperature is reached.
        <br>- Automatic GPU Power controller: Controls the power wattage of the GPU.
        <br>- Automatic GPU Overclock controller: Controls the overclock values by either using best known value from the DB or set it manually to desired values.
        <br>- WebApp to see and control the rigs live
        <br>- Very easy-to-use OS and WebApp.
        <br>
      </h3>

      <v-img
        :src="screenshot.one"
        style="cursor: pointer"
        :style="{ width: size }"
        class="imageBorder"
        @click="imgDialog.one = !imgDialog.one"
      />
      <v-dialog
        v-model="imgDialog.one"
        width="90%"
      >
        <v-img
          :src="screenshot.one"
          style="border: 1px solid white"
          @click="imgDialog.one = !imgDialog.one"
        />
      </v-dialog>

      <v-img
        :src="screenshot.two"
        style="cursor: pointer"
        :style="{ width: size }"
        class="imageBorder"
        @click="imgDialog.two = !imgDialog.two"
      />
      <v-dialog
        v-model="imgDialog.two"
        width="90%"
      >
        <v-img
          :src="screenshot.two"
          style="border: 1px solid white"
          @click="imgDialog.two = !imgDialog.two"
        />
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      imgDialog: {
        one: false,
        two: false,
      },
      screenshot: {
        one: require('../assets/1.png'),
        two: require('../assets/2.png'),
      },
      size: null,
    };
  },
  mounted() {
    const width = window.innerWidth;
    this.calculateSize(width);
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        const width = window.innerWidth;
        this.calculateSize(width);
      });
    });
  },
  methods: {
    calculateSize(width) {
      if (width > 1242) this.size = '49%';
      else this.size = '90%';
    },
  },
};
</script>

<style scoped>
.imageBorder {
  /* margin: 0 auto; */
  float: left;
  margin: 5px;
  margin-top: 50px;
  border: 1px solid white;
}
.logoColor {
  color: rgb(240, 226, 150);
}
.textSecond {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5%;
  border: 5px solid white;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
}
.text {
  margin: 5%;
  border: 5px solid white;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1;
}
.linkText {
  text-decoration: underline;
}
</style>
