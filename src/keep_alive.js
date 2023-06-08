import http from "http"

export default http.createServer(function (req, res){
  res.write("I'am alive");
  res.end();
}).listen(8080);
