<template>
  <v-app>
    <div class="background"></div>
    <div class="text pa-5">
      <h3 class="white--text">My name is <span class="logoColor">Marc Gagnon</span> and i've been coding for almost 16 years in different languages.  I even remember coding in Q-Basic on my father's 486 Turbo...  I studied at College Rosemont in the "Analyst Programmer" course in 2003-2004.  I don't know now, but at this time, the computers over there, were a yellow/brownish kind of dinosaurs and we were coding on Turbo Pascal.  I worked on small and big projects but those were always personnal stuff or as a "freelance" for some startup companies.    
      <br /><br />
      I am an ex-military who struggled for a very long to find what I wanted to do once I got out of it but with <span class="logoColor">nOS </span>, I finally figured it out.  I love to code and that's what, other then my kids, thrills me everyday.  I wake up in the middle of the night because I dreamed about the solution I needed...  I wake up in the morning with a new idea, thinking I would have enough time to code it while my coffee is brewing, to notice we are now in the middle of the night, 2 days later...  Talking to my girlfriend about my latest projects and knowing, without a doubt, that she didn't get anything out of my gibberish...  I am a passionnate.
      <br /><br />
      One day, when I'll come back home, my house will detect me, unlock the door, turn on the lights, put the dinner in the over, call me <span class="logoColor">Sir </span> and, without forgetting, open up my latest WIP project.  Wait... can't my rPi do that?...  B.R.B.
      <br /><br />
      <span class="logoColor">=> </span>In the last years, I mainly coded in :<br />
      - Python<br />
      - Javascript<br />
      - Bash<br />
      - HTML<br />
      - CSS<br />
      - Different frameworks (Angular, Express, Vuejs, etc.)<br />
      - And the list goes on...<br />
      <span class="logoColor">=> </span>While using different kind of Databases :<br />
      - MongoDB<br />
      - SQL<br />
      - InfluxDB<br />
      - Postgres<br />
      </h3>

      <div style="text-align:center">
            <v-avatar :size=size class="avatarBorder">   
            <v-img class="imageBorder" @click="imgDialog.one = !imgDialog.one" :src=screenshot.one style="cursor: pointer"></v-img>
            <v-dialog v-model="imgDialog.one" width="75%">
              <v-img @click="imgDialog.one = !imgDialog.one" :src=screenshot.one style="border: 1px solid white"></v-img>
            </v-dialog>
            </v-avatar>

            <v-avatar :size=size class="avatarBorder">   
            <v-img class="imageBorder" @click="imgDialog.three = !imgDialog.three" :src=screenshot.three style="cursor: pointer"></v-img>
            <v-dialog v-model="imgDialog.three" width="50%">
              <v-img @click="imgDialog.three = !imgDialog.three" :src=screenshot.three style="border: 1px solid white"></v-img>
            </v-dialog>
            </v-avatar>

            <v-avatar :size=size class="avatarBorder">
              <v-img class="imageBorder" @click="imgDialog.two = !imgDialog.two" :src=screenshot.two style="cursor: pointer"></v-img>
            </v-avatar>
            <v-dialog v-model="imgDialog.two" width="50%">
              <v-img @click="imgDialog.two = !imgDialog.two" :src=screenshot.two style="border: 1px solid white"></v-img>
            </v-dialog>
      </div>

    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      imgDialog: {
        "one": false,
        "two": false,
        "three": false
      },
      screenshot: {
          "one": require('../assets/3.jpg'),
          "two": require('../assets/4.jpg'),
          "three": require('../assets/eat.png')
      },
      size: null,
    }
  },
  methods: {
    calculateSize(width) {
      if (width > 456) this.size = 350
      else this.size = 225
    }
  },
  mounted() {
    let width = window.innerWidth
    this.calculateSize(width)
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        let width = window.innerWidth
        this.calculateSize(width)
      });
    })
  },
}
</script>

<style scoped>
.avatarBorder{
  margin-top: 50px;
  margin-left: 0px;
}
.imageBorder{
  border: 1px solid white;
}
.textSecond{
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5%;
  border: 5px solid white;
  background: rgba(0,0,0,0.75);
  z-index: 1;
}
.text{
  margin: 5%;
  border: 5px solid white;
  background: rgba(0,0,0,0.75);
  z-index: 1;
}
</style>

