<template>
  <v-app>
    <div class="background"></div>
    <div class="content">

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
    if (!this.$store.state.username || !this.$store.state.username) {
      this.$router.push('/')
    } else {
      this.id = this.$route.params.id;
    }
  }
};
</script>

<style>
.centerText{
  text-align: center;
  text-decoration: underline;
}
</style>

