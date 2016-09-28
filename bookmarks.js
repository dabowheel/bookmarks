
var list;

function startup() {
  // load the list
  list = new List();
  if (localStorage.readingList) {
    list.loadObject(JSON.parse(localStorage.readingList));
  }

  drawList();
}

function drawList() {
  var ul = document.getElementById("list");

  for (var i = 0; i < list.length(); i++) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    var item = list.getItem(i);
    a.href = item.url;
    a.textContent = item.url;
    li.textContent = item.description + " - ";
    li.appendChild(a);
    ul.appendChild(li);
  }
  var li = document.createElement("li");
  var urlElement = document.createElement("input");
  urlElement.id = "url";
  urlElement.type = "text";
  urlElement.placeholder = "Enter an URL"
  li.appendChild(urlElement);
  var addElement = document.createElement("button");
  addElement.id = "add";
  addElement.className = "btn btn-default";
  addElement.textContent = "Add";
  addElement.onclick = clickAdd;
  li.appendChild(addElement);
  ul.appendChild(li);

  urlElement.focus();
}

function redrawList() {
  var ul = document.getElementById("list");
  while (ul.lastChild)
    ul.removeChild(ul.lastChild);
  drawList();
}

function clickAdd() {
  var url = document.getElementById("url").value;
  if (url) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == XMLHttpRequest.DONE) {
        if (request.status === 200) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(request.responseText, "text/html");
          var name = doc.title;
          var nameElement = document.getElementById("modalName");
          nameElement.value = name;
          var urlElement = document.getElementById("modalURL");
          urlElement.value = url;
          $('#myModal').modal()
        }
      }
    }
    request.open("GET", url, true);
    request.send(null);
  }
}

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


// startup
startup();
