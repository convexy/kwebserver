/**************/
/* Web Server */
/**************/
var http = require("http");
var fs = require("fs");
var path = require("path");

var server = http.createServer();

const DOCUMENT_ROOT = __dirname + "/htdocs";

server.on("request", function(req, res) {
  let now = new Date();
  let ts = "";
  ts += now.getFullYear();
  ts += "/";
  ts += ("0" + (now.getMonth() + 1)).slice(-2);
  ts += "/";
  ts += ("0" + now.getDate()).slice(-2);
  ts += " ";
  ts += ("0" + now.getHours()).slice(-2);
  ts += ":";
  ts += ("0" + now.getHours()).slice(-2);
  ts += ":";
  ts += ("0" + now.getMinutes()).slice(-2);
  ts += ":";
  ts += ("0" + now.getSeconds()).slice(-2);

  console.log("[Timestamp]", ts, "[Method]", req.method, "[URL]", req.url);
  
  let url = req.url;
  url = url.slice(-1) == "/" ? url + "index.html" : url;
  let extension = path.extname(url);
  if ([".html", ".js", ".css", ".ico"].includes(extension)) {
    fs.readFile(DOCUMENT_ROOT + url, "utf-8", function(err, data) {
      if (err) {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("page not found");
        return res.end();
      }

      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  }
  else {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("page not found");
    return res.end();
  }
});

server.listen(8080);
console.log("port: 8080");
