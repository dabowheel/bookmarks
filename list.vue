<template>
  <h2>{{title}}</h2>
  <ul id="list">
    <li v-for="item in list.arr">
      {{item.description}} - <a href="{{item.url}}">{{item.url}}</a>
    </li>
    <li>
      <form class="form-inline">
        <div class="form-group">
          <input v-model="url" id="url" class="form-control" type="text" placeholder="Enter a URL" />
        </div>
        <button v-on:click="clickAdd" id="add" type="button" class="btn btn-default">Add</button>
      </form>
  </ul>

  <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Add Bookmark</h4>
        </div>
        <div class="modal-body">
          <input v-model="name" type="text" placeholder="Name" />
          <input v-model="url" type="text" placeholder="URL" />
        </div>
        <div class="modal-footer">
          <button v-on:click="clickAcceptAdd" type="button" class="btn btn-primary">Accept</button>
          <button v-on:click="clickCancelAdd" type="button" class="btn btn-primary">Cancel</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>

<script>
import { List, Item } from "./list.js";

export default {
  data() {
    return {
      title: "Bookmarks",
      name: "",
      url: "",
      list: null
    }
  },
  created() {
    this.list = new List();
    if (localStorage.readingList) {
      this.list.loadObject(JSON.parse(localStorage.readingList));
    }
    this.$nextTick(function () {
      document.getElementById("url").focus();
    });
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
              this.name = doc.title;
              $('#myModal').modal()
            }
          }
        }.bind(this);
        request.open("GET", this.url, true);
        request.send(null);
      }
    },
    clickAcceptAdd() {
      var item = new Item(this.name, this.url);
      this.list.addItem(item);
      localStorage.readingList = JSON.stringify(this.list);
      this.name = "";
      this.url = "";
      $("#myModal").modal("hide");
      var urlElement = document.getElementById("url");
      urlElement.focus();
    },
    clickCancelAdd() {
      $("#myModal").modal("hide");
      var urlElement = document.getElementById("url");
      urlElement.select();
    }
  }
}
</script>

<style>
#name {
  display: none;
  width: 400px;
}
#modalName {
  width: 500px;
}
#url {
  width: 500px;
}
#modalURL {
  width: 500px;
}
#acceptAdd {
  display: none;
}
#cancelAdd {
  display: none;
}
.list-input {
  display: inline;
}
</style>