const express = require('express');
const request = require('request');
const app = express();
const bodyParser = require('body-parser');
const apiKey = '409ec07197f703eb5c2a3fe47657de2e';
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res){
    console.log('Request from host');
    //res.send('Hello world!')
    res.render('index', {weather : null, error: null});
})

app.post('/', function(req, res){
    let city = req.body.city;
    let urlApi = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    request(urlApi, function(err, response, body){
        if (err){
            res.render('index', {weather : null, error: 'Error, please try again :<'});
        }
        else{
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error connecting, empty response from API'});
            }
            else{
                let weatherText = `It's ${weather.main.temp} degrees Celcius in ${weather.name}`;
                console.log(weatherText);
                res.render('index', {weather: weatherText, error: null});
            }
        }
    })
    //res.render('index')
    console.log('Request for city: ' + req.body.city);
})

app.listen(3000, function(){
    console.log('Example listening on port 3000...');
})

