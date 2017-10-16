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
        let text = event.message.text.toLowerCase();

        if(/hello|hi|salam|salut|morning|hey|bonjour/.test(text)){
            text = "Hi, how can i help you?"
        }
        else if(/who are you|tell me about you|who r u|are you real|who you are|who's that|who is that/.test(text)){
            text = "It doesn't matter, am just a programmed Bot :)"
        }
        else if(/do you understand|do u understand me|you understand/.test(text)){
            text = "when i do not understand i become an ugly parrot :/"
        }
        else if(/your address|locals|offices|votre adresse|vos locaux|locaux/.test(text)){
            text = "Please check the Map : http://bit.ly/2z46IuE"
        }
        else if(/what are you doing|what're you doing|what do you do|what's your problem|you doing|u doing/.test(text)){
            text = "I am not really sure, But i still can provide you answers !"
        }  
        else if(/what is your phone number|get in touch|what's your phone number|ur phonenumber|your phonenumer|your phone number|your number phone|ur number phone/.test(text)){
            text = "You can reach us on : +212 606 87 07 80"
        }
        else if(/you feel lonely|u feel lonely|you feel alone|u feel alone|u r alone lonely/.test(text)){
            text = "Yes :'(."
        } 
        else if(/what's your name|ur name|what is your name|full name/.test(text)){
            text = "I will never tell you."
        }   
        else if(/where are you|where r u|where do you live/.test(text)){

            text = "Next to my neighbor."
        }
        else if(/who is your neighbor|who's ur neighbor|your neighbor/.test(text)){
            text = "You won't believe me... he's called Nystee"
        }  
        else if(/we can be friends|be friends|we be friends|be your friend|be my friend/.test(text)){
            text = "Why not !"
        }    
        else if(/what can you do for me|what do you know|what do u know|whats ur skills|what is your skills|whats are ure skills|whats are you good at|ur skills|your skills|your services/.test(text)){
            text = "Wait I'm getting a cup of coffee, I'll get back to you in a sec"
        }    
        else if(/fuck you|fuck u|you suck|u suck/.test(text)){
            text = "Be more imaginative, would you?"
        }     
        else if(/darif|mr darif|mister darif|darif amine|amine darif/.test(text)){
            text = "One of the best DJ's on the planet Earth, check his profile https://www.facebook.com/aminedrif"
        }            
        else if(/ok|okey|okay|yeap|ahaa|ahaaa|yes sir/.test(text)){
            text = "Nice :)"
        }  
        else if(/are you here |r you here |are u here|r u here |are you going/.test(text)){
            text = "I am watching you in silence "
        }
        else if(/thats funny|that is funny|you are funny/.test(text)){
            text = "I'm not kidding"
        }  
        else if(/you are so annoying|you r so annoying|u r annoying|you are boaring|get me boaring|make me boaring/.test(text)){
            text = "As are you 😎"
        }  
        else if(/goodbye|adios|ciao|bye|see ya|see you/.test(text)){
            text = "Hasta la vista, baby."
        }  
        else if(/love you|i love you|love u|kiss|kisss|mouah/.test(text)){
            text = "Same for you 😍😍😍😍"
        }   
        else if(/why/.test(text)){
            text = "Because you have no idea who I am"
        }  
        else if(/i hate u|i hate u|hate u/.test(text)){
            text = "Why do you hate me?"
        }  
        else if(/you are so|you r|you are/.test(text)){
            text = "I don't really think so"
        }                                                      
        else{
            //text = "Parrot Mode: "+text
            text = "Hein !"
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

