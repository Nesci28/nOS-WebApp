<template>
  <v-app>
    <div class="background">
      
      <h1 class="white--text centerText pa-2">Overclocks configurator {{ id.toUpperCase() }}</h1>
        
      </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      id: 0,
    }
  },
  methods: {

  },
  computed: {

  },
  created() {
    this.id = this.$route.params.id;
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
.centerText{
  text-align: center;
  text-decoration: underline;
}
</style>

