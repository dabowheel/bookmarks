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

export { List, Item };
