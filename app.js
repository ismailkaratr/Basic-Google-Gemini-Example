require('dotenv').config();
var express = require('express')
var app = express()
var fs = require('fs');
const bodyParser = require('body-parser');
const Gemini = require('./js/Gemini');
const gemini = new Gemini(process.env.API_KEY);
const chatPool = [];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/chat',async function(req,res){
    chatData = await gemini.startChat();
    chatPool.push(chatData);
    console.log(chatPool);
    res.cookie("chat",chatData.id);
    res.sendFile(__dirname+'/chat.html');
});
app.post('/chat',async function(req,res){
    chat = chatPool.find(item => item.id == req.body.uuid).chat;
    res.json({result:await gemini.runChat(chat,req.body.prompt)});
});

app.post('/', async function (req, res) {
    data = {result: await gemini.run(req.body.prompt)}
    res.json(data);
});

app.listen(3000)