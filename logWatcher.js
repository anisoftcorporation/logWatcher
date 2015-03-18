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

 var server = http.createServer(function(request, response){
        
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

  	var socket=io.listen(server);  //attach socket on server
	
        fs.watchFile(accessFile,callBackAccess);
	fs.watchFile(errorFile,callBackError);

        //Attach watcher on files on connection to display current status on new connections
        socket.on('connection', function(socket){
  	console.log('....new connection..');
	socket.emit('Update', {'message': all,'ErrMessage':allError,'Count':count,'Err':countErr});
	

	});


////Commented code to tame fs.watchFile

/*function callBackAccess(cur,prev) {
        console.log('hit..');
	if(cur.mtime!=mTime)
	{
	count++;

 	all=all+'<br>'+cur.mtime;
 	socket.emit('Update', {'message': all,'ErrMessage':allError,'Count':count,'Err':countErr});
	mTime=cur.mtime;

	}
	};

function callBackError(cur,prev) {

	if(cur.mtime!=ErrmTime)
	{
 	countErr++;
	allError=allError+'<br>'+cur.mtime;
 	socket.emit('Update', {'message': all,'ErrMessage':allError,'Count':count,'Err':countErr});
	ErrmTime=cur.mtime;
	}
};

*/

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


