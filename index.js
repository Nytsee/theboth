'use strict'

const express = require('express');
const bodyParser = require("body-parser");
const request = require('request');

const app = express();

app.set('port' , (process.env.PORT || 5000));


//Allow us to precess the data
//app.use(bodyParser.urlencoded({extented: false}))
app.use(bodyParser.json())


//Routes

app.get('/test/' , function(req, res) {
	res.send("Hi I am a chatBox")
})

app.get('/' , function(req, res) {
	let str = "hello every body"
    let value = /hello|hi|howdy/.test(str);
    res.send(value)
})

//Facebook

app.get('/webhook/', function(req, res){
	if(req.query['hub.verify_token'] === "blondiebytes"){
		res.send(req.query['hub.challenge'])
	}
	res.send('wrong token')
})

let token = "EAACPcU7rwo8BAOv5tuKahbrLt8sj4XxEkDZAE9wCHbUCtXPcsSM6osbHVQt6N1TGJa8xZCrJI1Km4r0MsL03T0actF5FbfhtDn47rOZAckBhE9rEuw4DVxUvgJjw5jVGjY3XNxM9VPTH7lbKnPYox5c5aDW4p2zI1uix2OjhQZDZD"



app.post('/webhook/', function(req, res){
  let messaging_event = req.body.entry[0].messaging
  for(let i = 0; i < messaging_event.length; i++){
  	let event = messaging_event[i]
  	let sender = event.sender.id

    if(event.message && event.message.text){
    	let text = event.message.text

        if(/hello|hi|salam|salut|morning|bonjour/.test(text)){
        	text = "Hi, how can i help you?"
        }
        if(text === "who are you?"){
        	text = "It doesn't matter, am just a programmed Bot :)"
        }
        if(text === "do you understand?"){
        	text = "when i do not understand i become an ugly parrot :/"
        }
        if(text === "what is your address?"){
        	text = "Please check the Map : http://bit.ly/2z46IuE"
        }
        else{
        	text = "Parrot Mode: "+text
        }

        

		//  switch(text) {

		//     case "hi":
		//         text = "Hi, how can i help you?"
		//         break;
		//     case "who are you?":
		//         text = "It doesn't matter, am just a programmed Bot :)"
		//         break;
		//     case "do you understand?":
		//         text = "when i do not understand i become an ugly parrot :/"
		//         break;
		//     case "what is your address?":
		//         text = "Please check the Map : http://bit.ly/2z46IuE"
		//         break;		
		//     case "how can we get in contact":
		//         text = "Please check the Map : http://bit.ly/2z46IuE"
		//         break;			                		        
		//     default:
		//         text = "Parrot Mode: "+text
		// }       
        

    	sendText(sender, text.substring(0,100))
    }
  }
  res.sendStatus(200)
})

function sendText(sender, text){
	let messageData = {text:text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs: {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message: messageData
		}
	}, function(error, response, body){
		if(error){
			console.log("Sending error")
		}else if(response.body.error){
			console.log("response body error")
		}
	})
}


app.listen(app.get('port'), function(){
	console.log("runing: port")
})


