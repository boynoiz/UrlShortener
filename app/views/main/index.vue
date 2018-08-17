
<template>
    <div>
        <form @submit.prevent="submitURL" class="form-horizontal">
          <div class="container">
            <div class="row">
              <div class="form-group form-group-sm col-sm-6">
                <label class="col-form-label" for="inputUrlForm">URL: </label>
                <input type="text" v-model="inputUrl" name="inputUrlForm" id="inputUrlForm" class="form-control" placeholder="eg. https://appsynth.net/blog/thailands-top-apps/" required autofocus>
              </div>
            </div>
            <button class="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
      </div>
</template>

<style lang="css">
@import url("//maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css");
</style>

<script>
export default {
  data: function() {
    return {
      responseMessage: "",
      inputUrl: "",
      outputUrl: "",
      url: ""
    };
  },
  methods: {
    // Send inputUrl to being shorten
    submitURL: function() {
      const data = {
        inputUrl: this.inputUrl
      }
      axios.post('https://api.' + this.url + '/create', data)
        .then(response => {
          const data = response.data;
          if (data.message == "OK") {
            console.log("Message: " + data.message);
            console.log("OutputUrl: " + data.outputUrl);
          } else {
            this.responseMessage = JSON.stringify(data.message);
          }
        })
        .catch(error => {
          console.log("Error :" + error.message);
        });
    }
  }
};
</script>
