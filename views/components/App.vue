
<template>
    <div id="app">
        <b-form @submit.prevent="submitURL" class="form-horizontal">
          <div class="container">
            <div class="row">
              <div class="form-group form-group-sm col-sm-6">
                <label class="col-form-label" for="inputUrlForm">URL: </label>
                <b-form-input
                v-model="inputUrl"
                v-validate.initial="{
                  required: true,
                  regex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
                }"
                :class="{'is-invalid': errors.has('inputUrlForm')}"
                type="text"
                name="inputUrlForm"
                id="inputUrlForm"
                class="form-control"
                placeholder="eg. https://appsynth.net/blog/thailands-top-apps/"
                >
                </b-form-input>
                <div class="invalid-feedback" v-show="errors.has('inputUrlForm')">
                  {{ errors.first('inputUrlForm') }}
                </div>

              </div>
            </div>
            <b-button
            :variant="errors.any() ? 'secondary' : 'success'"
            type="submit"
            :disabled="errors.any()"
            >Submit</b-button>
          </div>
        </b-form>
      </div>
</template>

<style lang="css">
@import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
@import "~bootstrap-vue/dist/bootstrap-vue.css";
@import "~sweetalert2/dist/sweetalert2.min.css";
</style>

<script>
import "babel-polyfill";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VeeValidate from "vee-validate";
import { Validator } from 'vee-validate';
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import VueClipboard from 'vue-clipboard2'

Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(VueClipboard)

Vue.use(VeeValidate);

Validator.localize({
  en: {
      attributes: {
        inputUrlForm: 'URL'
      },
      custom: {
        inputUrlForm: {
          required: "Please enter url that you want to shorten",
          regex: 'Hey! URL format must contain http:// or https://www.'
        }
      }
  }
});

export default {
  data: () => ({
    message: "",
    inputUrl: "",
    outputUrl: "",
    details: "",
    status: ""
  }),
  methods: {
    // Send inputUrl to being shorten
    async submitURL() {
      try {
        const promise = await axios.post(
          "https://api." + process.env.APP_URL + "/create",
          { inputUrl: this.inputUrl }
        );

        this.message = promise.data.message;
        this.details = promise.data.details;
        this.inputUrl = promise.data.inputUrl;
        this.outputUrl = "https://" + process.env.APP_URL + "/" + promise.data.outputUrl;
        this.status = promise.status;

        return this.alert();
      }
      catch (error)
      {
        console.log("Calling data from api has been an error: " + error);
        return [];
      }
    },

    //Response message dialog with Sweet-alert2
    async alert() {
      try {
        if (this.message == "OK" && this.status === 200) {
          this.$swal({
            type: 'success',
            title: this.details,
            text: this.outputUrl,
            showCloseButton: true,
            confirmButtonText: 'Copy url to clipboard'
          }).then((result) =>{
            if (result.value) {
              this.$copyText(this.outputUrl)
              this.$swal(
                'Done!',
                'Your shorten url already in clipboard',
                'success'
              )
            }
          });
        } else {
          this.$swal({
            type: "error",
            title: "Ops... Something went wrong",
            text: this.details,
            showCloseButton: true,
          });
        }
      } catch (error) {
        console.log("Responding data has been an error: " + error);
      }
    },
  }
};
</script>
