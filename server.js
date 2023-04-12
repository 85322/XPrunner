var fs = require('fs'); //node's file system

var data = fs.readFileSync('./words.json'); //liest json file //sync "blockt" bis 
var words = JSON.parse(data);  //parse raw json data zu js objekt //naechster code
var words = JSON.parse(data);               //parse raw json data zu js objekt //naechster code                      
                                            //beendet wurde. async laesst weiteren server
                                           //verlauf zu vom user
var express = require('express');
var app = express();
console.log('- Server starting -');

const listening = () => {
    console.log('- Listening -')
}

var server = app.listen(5500, listening);

app.use(express.static('public')); //ordner fuer index.html usw

const getFile = (request, response) => {
    response.send('Response string');
}

//Konzept von ROUTE Restful

app.get('/files', getFile); //files kann eine funktion sein als GET request, benutzt dann die callback funktion getFile die wir definieren koennen
//http://localhost:5500/files  

const getReply = (request, response) => {
 let data = request.params;
 response.send('You typed: ' + data.example);
}

app.get('/reply/:example', getReply) //das :example gilt als parameter was wir speichern in data und mit dem namen als object attribut auch ansprechen
//http://localhost:5500/reply/test3

const getAll = (request, response) => {
    response.send(words); //express formats js object into JSON. API request
}

app.get('/all', getAll);


const getAdd = (request, response) => { //nimmt aus beiden paramatern und
    let data = request.params;          //added es zum words objekt, formatiert zu json
    let word = data.word;
    let score = Number(data.score);

    if (!score) {                       //eror handling wenn kein score angabe
        var reply = {
            msg: "Score is required."
    }} else {

    words[word] = score;  //key value syntax

    const finished = (err) => { //callback nach upload
    console.log('- Entry added to words.json -');
    reply = {
        word : word,
        score : score,
        status : 'success'
    }
}
    var dataJSON = JSON.stringify(words, null, 2); //parse zu string, null,2 als \n
    fs.writeFile('words.json', dataJSON, finished); //write path, content, callback

    var reply = {
        msg: "Thank you for your add request. Check /all "
    }
}
response.send(reply);
}

app.get('/add/:word/:score?', getAdd); //such-anfrage, wenn parameter dann found + value
                                        //sonst not found ohne value
                                        //http://localhost:5500/search/word1
const getSearch = (request, response) => {
    let word = request.params.word;
    let reply;

    if(words[word]){
        reply ={
            status: 'found',
            word : word,
            score : words[word]
        }
    } else {
        reply ={
            status: 'not found',
            word : word
        }
    }
    response.send(reply);
}

app.get('/search/:word', getSearch);
