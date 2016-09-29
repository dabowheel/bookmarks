
function clickAcceptAdd() {
  var nameElement = document.getElementById("modalName");
  var urlElement = document.getElementById("modalURL");
  var item = new Item(nameElement.value, urlElement.value);
  list.addItem(item);
  localStorage.readingList = JSON.stringify(list);
  $("#myModal").modal("hide");
  redrawList();
}
document.getElementById("modalAccept").onclick = clickAcceptAdd;

function clickCancelAdd() {
  $("#myModal").modal("hide");
  var urlElement = document.getElementById("url");
  urlElement.select();
}
document.getElementById("modalCancel").onclick = clickCancelAdd;

// List
function List() {
  this.arr = [];
}

List.prototype.loadObject = function (obj) {
  if (obj && obj.arr) {
    for (var i = 0; i < obj.arr.length; i++) {
      this.addItem(new Item(obj.arr[i].description, obj.arr[i].url));
    }
  }
};

List.prototype.length = function () {
  return this.arr.length;
};

List.prototype.addItem = function (item) {
  this.arr.push(item);
};

List.prototype.getItem = function (index) {
  return this.arr[index];
};


// Item
function Item(description, url) {
  this.description = description;
  this.url = url;
}

export { List };
