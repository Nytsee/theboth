'use strict'

const express = require('express');
const bodyParser = require("body-parser");
const request = require('request');

const app = express();

app.set('port' , (process.env.PORT || 5000));


//Allow us to precess the data
app.use(bodyParser.urlencoded({extented: false}))
app.use(bodyParser.json())


//Routes

app.get('/' , function(req, res) {
	res.send("Hi I am a chatBox")
})

//Facebook

app.get('/webhook/', function(req, res){
	if(req.query['hub.verify_token'] === "blondiebytes"){
		res.send(req.query['hub.challenge'])
	}
	res.send('wrong token')
})

app.listen(app.get('port'), function(){
	console.log("runing: port")
})


