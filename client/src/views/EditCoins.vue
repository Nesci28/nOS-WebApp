<template>
  <v-app>
    <div class="background pa-5">
      <v-progress-circular
        :size="140"
        :width="14"
        v-if="loading"
        indeterminate
        color="rgb(240, 226, 150)"
        class="middle"
      ></v-progress-circular>
      <Monaco
        class="editor"
        language="json"
        :code="json"
        @mounted="onMounted"
        >
      </Monaco>
      <v-btn :class="{'disable-events': fakeAccount}" color="success" @click="deleteCard = !deleteCard">Save</v-btn>
      <v-btn color="warning" to="/Rigs">Cancel</v-btn>

      <v-flex xs16 sm16 md6 lg6>
        <v-dialog v-model="deleteCard" width="75%">
          <v-card class="infoCard rounded-card">
            <v-card-title class="green--text headline lighten-2 cardTitle" primary-title>
            Confirm this new configuration ?
            </v-card-title>
            <v-text-field
                class="confirmBox pr-5 pl-5 pt-5"
                color="white"
                label="Write 'CONFIRM' to confirm"
                v-model="confirmText"
                outline
              ></v-text-field>
              <v-btn @click="save" v-if="confirmText == 'CONFIRM'" color="warning" class="deleteBtn">Confirm</v-btn>
          </v-card>      
        </v-dialog>
      </v-flex>

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
      urlGet: '',
      urlAdd: '',
      id: 0,
      json: 'null',
      res: {
        json: {},
        info: {},
        section: ''
      },
      loading: true,
      deleteCard: false,
      confirmText: '',
      deleteRig: '',
      fakeAccount: true
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
    async save() {
      this.deleteCard = !this.deleteCard
      console.log("Saved!")
      this.res.json = JSON.parse(this.editor.getValue())
      this.res.json.Serial = this.res.json.Serial + 1
      let configs = this.$store.state.json.filter(ele => ele["Hostname"] == this.id)[0]
      this.res.info.Username = configs.Username
      this.res.info.Hostname = configs.Hostname
      this.res.section = 'Coins Config'

      // console.log(JSON.stringify(this.res))
      await axios.post(this.urlAdd, this.res)
      for (let i = 0; i < this.$store.state.json.length; i++) {
        if (this.$store.state.json[i].Hostname == this.id) {
          this.$store.state.json[i][this.res.section] = this.res.json
        }
      }
      this.defaults('saved')      
    }
  },
  mounted() {
    if (window.location.href.includes('localhost')) {
      this.urlLogin = "http://localhost:5000/action/login"
      this.urlGet = "http://localhost:5000/db"
      this.urlAdd = "http://localhost:5000/rig/add"
    } else if (window.location.href.includes('192.168')) {
      this.urlLogin = "http://192.168.0.127:5000/action/login"
      this.urlGet = "http://192.168.0.127:5000/db"
      this.urlAdd = "http://192.168.0.127:5000/rig/add"
    } else {
      this.urlLogin = "https://nos-server.now.sh/action/login"
      this.urlGet = "https://nos-server.now.sh/db"
      this.urlAdd = "https://nos-server.now.sh/rig/add"
    }
    
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.editor.layout()
      });
    })

    this.loading = true
    axios.get(this.urlLogin)
      .then(res => {
        console.log(res.data)
        this.loading = false
        if (res.data == "not logged in!") this.$router.push('/')
        else {
          this.id = this.$route.params.id;
          this.fakeAccount = res.data.fakeAccount
          this.defaults()
        }
    })
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
.infoCard {
  margin-left: auto;
  margin-right: auto;
}
.rounded-card {
  background-color: rgb(46, 46, 46);
  border-radius:30px;
}
</style>

