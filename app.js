var express = require("express");
var app = express();

var url = require("url");
var rp = require("request-promise");
var htmlparser = require("htmlparser2");

app.use(express.static("public"));

app.get("/api/title/:url", function (req, res) {
  var s = req.params.url;
  if (!s) {
    res.status(400).send("Not a valid URL");
    return;
  }

  var u = url.parse(req.params.url);
  if (!u.protocol) {
    s = url.format("http://" + u);
  }

  rp(s).then(function (htmlString) {
    var inTitle = false;
    var title = "";
    parser = new htmlparser.Parser({
      onopentag(name) {
        if (name === "title") {
          inTitle = true;
        }
      },
      ontext(text) {
        if (inTitle) {
          title += text;
        }
      },
      onclosetag(name) {
        if (name === "title") {
          inTitle = false;
        }
      }
    }, { decodeEntities: true});
    parser.write(htmlString);
    parser.end();

    res.send(title);
  }).catch(function (error) {
    res.status(400).send(error);
  });
});

app.listen(3000, function () {
  var options = {}
  console.log("Listening on port 3000");
});
