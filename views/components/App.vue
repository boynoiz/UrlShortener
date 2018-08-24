
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
            class="btn btn-primary"
            type="submit"
            :disabled="errors.any()"
            >Submit</b-button>
          </div>
        </b-form>
      </div>
</template>

<style lang="css">
@import "~bootstrap/dist/css/bootstrap.css";
@import "~bootstrap-vue/dist/bootstrap-vue.css";
@import "~sweetalert2/dist/sweetalert2.min.css";
</style>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VeeValidate from "vee-validate";
import { Validator } from 'vee-validate';
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";

Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);

const validatorOptions = {
  dictionary: {
    en: {
      attributes: {
        inputUrlForm: 'URL'
      },
      messages: {
        inputUrlForm: 'URL format must contain http://www. or https://www.'
      }
    }
  }
}
Vue.use(VeeValidate, validatorOptions);

export default {
  data: () => ({
    message: "",
    inputUrl: "",
    outputUrl: "",
    details: ""
  }),
  methods: {
    // Send inputUrl to being shorten
    async submitURL() {
      try {
        const promise = await axios.post(
          "https://api." + process.env.APP_URL + "/create",
          { inputUrl: this.inputUrl }
        );
        const data = await promise.data;
        return this.alert(data);
      } catch (error) {
        console.log("Calling data from api has been an error: " + error);
        return [];
      }
    },

    //Response message dialog with Sweet-alert2
    async alert(response) {
      try {
        if (response.data.message == "OK" && response.status === 200) {
          this.$swal({
            type: "success",
            title: "Your url already shorten as: ",
            text:
              "https://" + process.env.APP_URL + "/" + response.data.outputUrl,
            showCloseButton: true
          });
        } else {
          this.$swal({
            type: "error",
            title: "Ops... Something went wrong",
            text: response.data.details,
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
