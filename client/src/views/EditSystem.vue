<template>
  <v-app>
    <div class="background pa-5">
      <v-progress-circular
        v-if="loading"
        :size="140"
        :width="14"
        indeterminate
        color="rgb(240, 226, 150)"
        class="middle"
      />
      <Monaco class="editor" language="json" :code="json" @mounted="onMounted" />
      <v-btn :class="{'disable-events': fakeAccount}" color="success" @click="checkValidity">Save</v-btn>
      <v-btn color="warning" to="/Rigs">Cancel</v-btn>

      <v-flex xs16 sm16 md6 lg6>
        <v-dialog v-model="errorCard" width="75%">
          <v-card class="infoCard rounded-card">
            <v-card-title
              class="red--text headline lighten-2 cardTitle"
              primary-title
            >Error in your JSON</v-card-title>
          </v-card>
        </v-dialog>
      </v-flex>

      <v-flex xs16 sm16 md6 lg6>
        <v-dialog v-model="confirmCard" width="75%">
          <v-card class="infoCard rounded-card">
            <v-card-title
              class="green--text headline lighten-2 cardTitle"
              primary-title
            >Confirm this new configuration ?</v-card-title>
            <v-text-field
              v-model="confirmText"
              class="confirmBox pr-5 pl-5 pt-5"
              color="white"
              label="Write 'CONFIRM' to confirm"
              outline
            />
            <v-btn
              v-if="confirmText == 'CONFIRM'"
              color="warning"
              class="deleteBtn"
              @click="save"
            >Confirm</v-btn>
          </v-card>
        </v-dialog>
      </v-flex>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import Monaco from "monaco-editor-forvue";

export default {
  name: "App",
  components: {
    Monaco
  },
  data() {
    return {
      urlGet: "",
      urlAdd: "",
      id: 0,
      json: "null",
      res: {
        json: {},
        info: {},
        section: ""
      },
      loading: true,
      confirmCard: false,
      errorCard: false,
      confirmText: "",
      deleteRig: "",
      fakeAccount: true
    };
  },
  mounted() {
    if (!window.location.port) {
      this.urlLogin =
        window.location.protocol +
        "//" +
        window.location.hostname +
        "/api/v2/action/login";
      this.urlGet =
        window.location.protocol +
        "//" +
        window.location.hostname +
        "/api/v2/db";
      this.urlAdd =
        window.location.protocol +
        "//" +
        window.location.hostname +
        "/api/v2/rig/add";
    } else {
      this.urlLogin =
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":5000/api/v2/action/login";
      this.urlGet =
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":5000/api/v2/db";
      this.urlAdd =
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":5000/api/v2/rig/add";
    }

    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.editor.layout();
      });
    });

    this.loading = true;
    axios.get(this.urlLogin).then(res => {
      this.loading = false;
      if (res.data == "not logged in!") this.$router.push("/");
      else {
        this.id = this.$route.params.id;
        this.fakeAccount = res.data.fakeAccount;
        this.defaults();
      }
    });
  },
  methods: {
    onMounted(editor) {
      this.editor = editor;
    },
    async defaults(step) {
      const configs = await this.$store.state.json.filter(
        ele => ele.Hostname == this.id
      )[0]["System Config"];
      if (step == "saved") {
        configs.Serial += 1;
      }
      this.json = JSON.stringify(configs, undefined, 4);
      this.editor.setValue(this.json);
    },
    checkValidity() {
      try {
        JSON.parse(this.editor.getValue());
      } catch (e) {
        this.errorCard = !this.errorCard;
        return false;
      }
      this.confirmCard = !this.confirmCard;
      return true;
    },
    async save() {
      this.confirmCard = !this.confirmCard;
      console.log("Saved!");
      this.res.json = JSON.parse(this.editor.getValue());
      this.res.json.Serial = this.res.json.Serial + 1;
      const configs = this.$store.state.json.filter(
        ele => ele.Hostname == this.id
      )[0];
      this.res.info.Username = configs.Username;
      this.res.info.Hostname = configs.Hostname;
      this.res.section = "System Config";

      // console.log(JSON.stringify(this.res))
      await axios.post(this.urlAdd, this.res);
      for (let i = 0; i < this.$store.state.json.length; i++) {
        if (this.$store.state.json[i].Hostname == this.id) {
          this.$store.state.json[i][this.res.section] = this.res.json;
        }
      }
      this.defaults("saved");
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
.centerText {
  text-align: center;
  text-decoration: underline;
}
.infoCard {
  margin-left: auto;
  margin-right: auto;
}
.rounded-card {
  background-color: rgb(46, 46, 46);
  border-radius: 30px;
}
</style>
