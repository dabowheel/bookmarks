<template>
  <h2>{{title}}</h2>
  <ul id="list">
    <li v-for="item in list.arr">
      {{item.description}} - <a href="{{item.url}}">{{item.url}}</a>
    </li>
    <li>
      <input id="url" type="text" placeholder="Enter a URL" />
      <button id="add" type="button" class="btn">Add</button>
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
  }
}
</script>

<style>
</style>