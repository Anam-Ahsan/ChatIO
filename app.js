var express = require('express'),
app=express(),
server=require('http').createServer(app),
io=require('socket.io').listen(server);
usernames=[];

server.listen(process.env.PORT || 3000);


app.get('/',function(req,res){
	res.sendFile(__dirname  +'/index.html')


});
io.on('connection',function(socket){
socket.on('new User',function(data,callback){
	if(usernames.indexOf(data) != -1){
		callback(false);
	}else{
		callback(true);
		socket.username=data;
		usernames.push(socket.username);
		updateUsernames();
	}

});

// Update Username

function updateUsernames(){
	io.sockets.emit('usernames',usernames);
}



	// Send Message
	socket.on('send message',function(data){
		console.log(data);
		io.emit('new message',{msg:data,user:socket.username});

	});



	//Disconnect


	socket.on('disconnect',function(data){
		if(!socket.username) return;
		username.splice(usernames.indexOf(socket.username),1);
		updateUsernames();

	});

});