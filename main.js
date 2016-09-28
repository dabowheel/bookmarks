// main.js
import Vue from "vue";
// require a *.vue component
import App from "./list.vue";

// mount a root Vue instance
new Vue({
  el: 'body',
  components: {
    // include the required component
    // in the options
    app: App
  }
})