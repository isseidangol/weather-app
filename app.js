const { response, urlencoded } = require('express');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){

    res.sendFile(__dirname + "/index.html")
    
});

app.post('/',function(req,res){

   
    const query =req.body.cityName;
    const appid ="bf2b55289126ae0fa4680073844d4bf1";
    const units = 'metric';
    const lang = 'english';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query+'&appid='+ appid +'&units='+units+'&lang='+lang;
    https.get(url, function(response){
        console.log(response.statusCode);
        

    response.on('data',function(data){
        
       const weatherData = JSON.parse(data)
       const temp = weatherData.main.temp
       const weatherDescription = weatherData.weather[0].description
       const icon = weatherData.weather[0].icon
       const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
       res.write("<p>the weather description is " + weatherDescription + ".</p>");
       res.write("<h1>The temperature of the "+query+" at the moment is " + temp + ". </h1>");
       res.write("<img src="+ imgURL + ">")
       res.send()
         });
    }); 
});

app.listen(3000,function(req,res){
    console.log('the server is up and running 3000');
});