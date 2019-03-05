<template>
  <v-app>
    <div class="background"></div>
    <div class="content">

      <h1 class="white--text centerText pa-2">Coins</h1>

    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    };
  },
  methods: {

  },
  created() {
    if (!this.$store.state.username || !this.$store.state.username) {
      this.$router.push('/')
    }
  }
};
</script>

<style>
.background{
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: url(../assets/btc.jpeg);
  height: 100%;
  background-size: cover;
}
</style>

