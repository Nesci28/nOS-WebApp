<template>
  <v-app>
    <div class="background pa-5">
      <Monaco
        class="editor"
        language="json"
        :code="json"
        @mounted="onMounted"
        >
      </Monaco>
      <v-btn color="success" @click="save">Save</v-btn>
    </div>
  </v-app>
</template>

<script>
import axios from 'axios';
import Monaco from 'monaco-editor-forvue';

export default {
  name: 'App',
  data() {
    return {
      url: 'https://nos-server.now.sh/db/',
      // url: 'http://localhost:5000/add',
      id: 0,
      json: 'null',
      res: {
        json: {},
        info: {},
        section: ''
      },
    }
  },
  components: {
    Monaco
  },
  methods: {
    onMounted(editor) {
      this.editor = editor;
    },
    async defaults(step) {
      let configs = await this.$store.state.json.filter(ele => ele["Hostname"] == this.id)[0]["Coins Config"]
      if (step == 'saved') {
        configs.Serial = configs.Serial + 1
      }
      this.json = JSON.stringify(configs, undefined, 4)
      this.editor.setValue(this.json)
    },
    save() {
      console.log("Saved!")
      this.res.json = JSON.parse(this.editor.getValue())
      this.res.json.Serial = this.res.json.Serial + 1
      let configs = this.$store.state.json.filter(ele => ele["Hostname"] == this.id)[0]
      this.res.info.Username = configs.Username
      this.res.info.Password = configs.Password
      this.res.info.Hostname = configs.Hostname
      this.res.section = 'Coins Config'

      console.log(JSON.stringify(this.res))
      axios.post(this.url, this.res)
      .catch(function (error) {
          console.error(error);
      });

      this.defaults('saved')      
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.editor.layout()
      });
    })

    if (!this.$store.state.username || !this.$store.state.username) {
      this.$router.push('/')
    } else {
      this.id = this.$route.params.id;
      this.defaults()
    }
  }
};
</script>

<style scoped>
.editor {
  width: 100%;
  height: 75%;
  max-height: 75%;
}
.centerText{
  text-align: center;
  text-decoration: underline;
}
</style>

