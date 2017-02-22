var express = require('express');
var bodyParser = require("body-parser");
var session = require('express-session')
var app = express();
var fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var queue = [];
var _oldestIndex = 0;
var _newestIndex = 0;


app.get('/', function (req, res) {
    res.send('This is a Web API. You can push or pop via pushToQueue and popFromQueue.')
})

app.get('/popFromQueue', function (req, res) {
    if(_newestIndex > _oldestIndex) {
        _oldestIndex++;
        var data =  queue[_oldestIndex - 1];
        res.send(JSON.stringify(data))
    }
    else{
        res.send('Queue is empty!')
    }
})

app.post('/pushToQueue', function (req, res) {
    var key = req.body.key;
    var value = req.body.value;
    var obj = {};
    obj[key] = value;
    queue[_newestIndex] = {data:obj,createdTime:new Date().toLocaleString(),id:_newestIndex};
    _newestIndex++;

    res.send('Push successful!')

})

app.get('/getQueueSize', function (req, res) {
    var size = _newestIndex -_oldestIndex;
    res.send('The size of the queue is ' + size)
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})

