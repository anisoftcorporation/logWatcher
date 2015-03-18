var fs = require('fs');

var http = require('http');

var url = require('url');
var io = require('socket.io');
var count =0;
 var server = http.createServer(function(request, response){
        console.log('Connection');

        var path = url.parse(request.url).pathname;

      console.log(path);
   switch(path){

case '/':

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('hello world');
        break;
case '/user':
var data = fs.readFileSync('main.html','utf8')
      // fs.readFile(__dirname + path, function(error, data){
console.log('..in user..');
/* fs.readFile('main.html', 'utf8',function(error, data){
                    if (error){
                        response.writeHead(404);
                        response.write("opps this doesn't exist - 404");
                    }
                    else{
    console.log(data);
                        response.writeHead(200, {"Content-Type": "text/html"});
                        response.write(data, "utf8");
                    }
                });*/
//console.log(data);
                        response.writeHead(200, {"Content-Type": "text/html"});
                        response.write(data, "utf8");
                break;
default:
response.writeHead(404);
        response.write('Gone case');
        break;
}
        response.end();
    });

    server.listen(8080);
  var socket=io.listen(server);
socket.on('connection', function(socket){
  console.log('....new connection..');
/*setInterval(function(){

        socket.emit('message', {'message': 'hello world'+count});
count++
    }, 2000);*/
fs.watchFile('test.log',act);


});
function act(event) {

 fs.readFile('test.log','utf8',function (error,data){ 
 socket.emit('message', {'message': data});
});

};


