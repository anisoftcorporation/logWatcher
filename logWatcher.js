//Modules to load
var fs = require('fs');
var http = require('http');
var url = require('url');
var io = require('socket.io');

//Variables to declare
var accessFile='/var/log/apache2/access.log';
var errorFile='/var/log/apache2/error.log';
var serverPort=8080;
var count =0;
var countErr=0;
var all='';
var allError='';
var mTime='';
ErrmTime='';
var line = 0;
var initLine=0;
var errLine = 0;
var initError=0;
 var server = http.createServer(function(request, response){
        
console.log("New Connection..");

	var path = url.parse(request.url).pathname;
	console.log(path);
        switch(path){

case '/':

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write("Welcome to Apache Server Monitoring.<br><a href='./monitor'>Click Here to Access The Monitoring Page</a>");
        break;
case '/monitor':
	var data = fs.readFileSync('logView.html','utf8')
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

        server.listen(serverPort);
        console.log("Server Started..");
        console.log("reading starts..");
        var rstream = fs.createReadStream(accessFile);

        rstream.on('data', function (chunk) {
  
        line+= chunk.toString().split("\n").length;
        })
        .on('end', function () {  // done
        initLine=line;
  });
console.log("Read ends..");
  	
        server.listen(serverPort);
        console.log("Server Started..");
        console.log("reading starts..");
        var rstream = fs.createReadStream(errorFile);

        rstream.on('data', function (chunk) {
  
        errLine+= chunk.toString().split("\n").length;
        })
        .on('end', function () {  // done
        initError=errLine;
  });
console.log("Read ends..");


var socket=io.listen(server);  //attach socket on server
	
        fs.watchFile(accessFile,callBackAccess);
	fs.watchFile(errorFile,callBackError);

        //Attach watcher on files on connection to display current status on new connections
        socket.on('connection', function(socket){
  	console.log('....new connection..');
	socket.emit('Update', {'message': all,'ErrMessage':allError,'Count':count,'Err':countErr});
	

	});


////Commented code to tame fs.watchFile with readStream

function callBackAccess(cur,prev) {
        console.log('hit..');
console.log("init line.."+initLine);
line=0;
 var rstream = fs.createReadStream(accessFile);

  rstream.on('data', function (chunk) {
  
  line+= chunk.toString().split("\n").length;
  })
  .on('end', function () {  // done

console.log("line...:"+line);
        all=all+'<br>'+cur.mtime;
        count=line-initLine;
 	socket.emit('Update', {'message': all,'ErrMessage':allError,'Count':count,'Err':countErr});
  });
	
	};

function callBackError(cur,prev) {
console.log("in error..");
errLine=0;
 var rstream = fs.createReadStream(errorFile);

        rstream.on('data', function (chunk) {
  
        errLine+= chunk.toString().split("\n").length;
        })
        .on('end', function () {  // done
        countErr=errLine-initError;
  });
	
	allError=allError+'<br>'+cur.mtime;
 	socket.emit('Update', {'message': all,'ErrMessage':allError,'Count':count,'Err':countErr});
	//ErrmTime=cur.mtime;
	
};




/*
function callBackAccess(cur,prev) {
        console.log('hit..');
	
	count++;

 	all=all+'<br>'+cur.mtime;
 	socket.emit('Update', {'message': all,'ErrMessage':allError,'Count':count,'Err':countErr});
	

	
	};
function callBackError(cur,prev) {

	
 	countErr++;
	allError=allError+'<br>'+cur.mtime;
 	socket.emit('Update', {'message': all,'ErrMessage':allError,'Count':count,'Err':countErr});
	
};

*/
