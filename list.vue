<template>
  <h2>{{title}}</h2>
  <ul id="list">
    <li v-for="item in list.arr">
      {{item.description}} - <a href="{{item.url}}">{{item.url}}</a>
    </li>
    <li>
      <input v-model="url" id="url" type="text" placeholder="Enter a URL" />
      <button v-on:click="clickAdd" type="button" class="btn">Add</button>
  </ul>
</template>

<script>
import { List } from "./bookmarks.js";

export default {
  data() {
    return {
      title: "Bookmarks"
    }
  },
  created() {
    this.list = new List();
    if (localStorage.readingList) {
      this.list.loadObject(JSON.parse(localStorage.readingList));
    }
  },
  methods: {
    clickAdd() {
      if (this.url) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status === 200) {
              var parser = new DOMParser();
              var doc = parser.parseFromString(request.responseText, "text/html");
              var nameElement = document.getElementById("modalName");
              nameElement.value = doc.title;
              var urlElement = document.getElementById("modalURL");
              urlElement.value = this.url;
              $('#myModal').modal()
            }
          }
        }.bind(this);
        request.open("GET", this.url, true);
        request.send(null);
      }
    }
  }
}
</script>

<style>
</style>