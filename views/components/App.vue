<template>
  <div class="row">
    <div class="col">
      <b-form @submit.prevent="submitURL">
        <div class="mx-auto w-75">
          <div class="form-group">
            <label class="col-form-label" for="inputUrlForm">URL: </label>
            <b-form-input v-model="formData.inputUrl" v-validate="{
                  required: true,
                  regex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
                }" :class="{'is-invalid': errors.has('inputUrlForm')}" type="text" name="inputUrlForm" id="inputUrlForm" class="form-control" placeholder="eg. https://appsynth.net/blog/thailands-top-apps/">
            </b-form-input>
            <div class="invalid-feedback" v-show="errors.has('inputUrlForm')">
              {{ errors.first('inputUrlForm') }}
            </div>
          </div>
          <div class="form-group">
            <label class="col-form-label" for="wordUrlForm">Your shorten url is: </label>
          </div>
          <div class="form-row">
            <div class="form-group col-md-3">
              <b-form-input v-model="formData.url" type="text" name="urlForm" id="urlForm" class="form-control-plaintext" plaintext>
              </b-form-input>
            </div>
            <div class="form-group col">
              <b-form-input v-validate.initial="'required|min:3|alpha_dash'" v-model="formData.wordUrl" type="text" name="wordUrlForm" id="wordUrlForm" :class="{'is-invalid': errors.has('wordUrlForm')}" :plaintext="!formData.isCustomWordChecked">
              </b-form-input>
              <div class="invalid-feedback" v-show="errors.has('wordUrlForm')">
                {{ errors.first('wordUrlForm') }}
              </div>
            </div>
            <div class="form-group col">
              <b-form-checkbox id="isCustomWordCheckedForm" v-model="formData.isCustomWordChecked">
                Desire you own?
              </b-form-checkbox>
            </div>
          </div>
          <div class="form-group">
            <b-button :class="errors.any() ? 'bnt btn-primary' : 'bnt btn-success'" type="submit" :disabled="errors.any() || !formData.inputUrl || !formData.wordUrl">Submit</b-button>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>

<style lang="css">
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~bootstrap-vue/dist/bootstrap-vue.css";
@import "~sweetalert2/dist/sweetalert2.min.css";
</style>

<script>
import "babel-polyfill";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VeeValidate from "vee-validate";
import { Validator } from "vee-validate";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import VueClipboard from "vue-clipboard2";

Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(VueClipboard);

Vue.use(VeeValidate);

Validator.localize({
  en: {
    attributes: {
      inputUrlForm: "URL",
      wordUrlForm: "Shorten word"
    },
    custom: {
      inputUrlForm: {
        required: "Please enter url that you want to shorten.",
        regex: "Hey! URL format must contain http:// or https://www."
      },
      wordUrlForm: {
        required: "Please enter shorten word that you want.",
        min: "Shorten word must more than 3 characters.",
        alpha_dash: "Shorten word may contain alphabetic characters or numbers."
      },
    }
  }
});

export default {
  data: () => ({
    createData: {
      message: "",
      details: {},
      status: ""
    },
    wordData: {
      message: "",
      details: {},
      status: ""
    },
    formData: {
      url: `https://${process.env.APP_URL}/`,
      inputUrl: "",
      wordUrl: "",
      isCustomWordChecked: false
    }
  }),

  created () {
    this.wordGenerator();
  },

  watch: {
    'formData.isCustomWordChecked': function() {
      if (!this.formData.isCustomWordChecked) {
        this.formData.wordUrl = this.wordData.details;
      }
    }
  },

  methods: {
    /**
     * Send inputUrl to being shorten
     */
    async submitURL () {
      try {
        const promise = await axios.post(
          `https://api.${process.env.APP_URL}/create`,
          {
            inputUrl: this.formData.inputUrl,
            inputWord: this.formData.wordUrl,
          }
        );

        this.createData.message = promise.data.message;
        this.createData.details = promise.data.details;
        this.createData.status = promise.status;

        return this.alert();
      } catch (error) {
        console.log("Calling data from api has been an error: " + error);
        return [];
      }
    },

    /**
     * Call api for words generator
     */
    async wordGenerator () {
      try {
        const promise = await axios.get(
          `https://api.${process.env.APP_URL}/words`
        );
        if (promise.data.message === "OK" && promise.status === 200) {
          this.wordData.message = promise.data.message;
          this.wordData.details = promise.data.details;
          this.wordData.status = promise.data.status;

          this.formData.wordUrl = promise.data.details;
        }
        return;
      } catch (error) {
        console.log("Calling data from the api has been an error: " + error);
        return [];
      }
    },

    /**
     * Response message dialog with Sweet-alert2
     */
    async alert () {
      try {
        if (this.createData.message === "OK" && this.createData.status === 200) {

          const shortenUrl = `https://${process.env.APP_URL}/${this.createData.details.shortenUrl}`;

          this.$swal({
            type: "success",
            title: "Your shorten url is: ",
            text: shortenUrl,
            showCloseButton: true,
            confirmButtonText: "Copy url to clipboard"
          }).then(result => {
            if (result.value) {
              this.$copyText(shortenUrl);
              this.$swal(
                "Done!",
                "Your shorten url already in clipboard",
                "success"
              );
            }
          });
        } else {
          this.$swal({
            type: "error",
            title: "Ops... Something went wrong",
            text: this.createData.details.errmsg,
            showCloseButton: true
          });
        }
      } catch (error) {
        console.log("Responding data has been an error: " + error);
      }
    }
  }
};
</script>
