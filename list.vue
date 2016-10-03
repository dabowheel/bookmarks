<template>
  <div id="app">
    <h2>{{title}}</h2>
    <ul id="list">
      <li v-for="item in list.arr">
        <a v-bind:href="item.url">{{item.description}}</a>
        <button type="button" class="btn btn-default btn-xs" title="Edit"><span class="glyphicon glyphicon-pencil"></span></button>
        <button type="button" class="btn btn-default btn-xs" title="Remove"><span class="glyphicon glyphicon-remove"></span></button>
      </li>
    </ul>
    <button v-on:click="clickAdd" id="add" type="button" class="btn btn-default">Add</button>

    <div class="modal" id="myModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Add Bookmark</h4>
          </div>
          <div class="modal-body">
            <form class="form-inline">
              <div class="form-group">
                <input v-model="name" v-show="validated" id="name" class="form-control" type="text" placeholder="Name" />
                <input v-model="url" id="url" class="form-control" type="text" placeholder="URL" />
                <button v-on:click="clickValidate" class="btn btn-default" type="button">Validate</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button v-on:click="clickAcceptAdd" :disabled="!validated" id="acceptAdd" type="button" class="btn btn-primary">Accept</button>
            <button v-on:click="clickCancelAdd" id="cancelAdd" type="button" class="btn btn-primary">Cancel</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
</template>

<script>
import { List, Item } from "./list.js";

export default {
  data() {
    return {
      title: "Bookmarks",
      name: "",
      url: "",
      validated: false,
      list: null
    }
  },
  created() {
    this.list = new List();
    if (localStorage.readingList) {
      this.list.loadObject(JSON.parse(localStorage.readingList));
    }
    this.$nextTick(function () {
      document.getElementById("add").focus();
    });
  },
  methods: {
    clickAdd() {
      $('#myModal').modal();
      document.getElementById("url").focus();
    },
    clickValidate() {
      console.log("clickValidate");
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
            console.log(request.responseText);
            var title = request.responseText;
            console.log("title", title);
            if (!title) {
              title = this.url;
            }
            this.name = title;
            this.validated = true;
          } else {
            console.error(request.status + " " + request.responseText);
          }
        }
      }.bind(this);
      request.open("GET", "/api/title/" + encodeURIComponent(this.url), true);
      request.send();
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
}
#modalName {
}
#url {
}
#modalURL {
}
#acceptAdd {
}
#cancelAdd {
}
</style>