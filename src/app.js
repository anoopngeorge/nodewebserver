const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

const port = process.env.PORT || 3000;
//decalre  paths variables
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname,"../templates/views");
const viewPartialsPath = path.join(__dirname,"../templates/partials")

//set views path
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(viewPartialsPath);

app.use(express.static(publicDirPath));


app.get('',(req,res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Anoop'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title : 'This is about us',
        name : 'Anoop'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title : 'Let me help you',
        helpText : 'How can I help you today?',
        name : 'Anoop'
    })
})

const callback = (error,{Latitude,Longitude,Location} = {}) => {
    if(error) {
        console.log(error);
        
        return  error;
    } 
    forecast(Latitude, Longitude, (error, forecastData) => {
        if(error) {

         console.log(error);
        return error ;

        }
        console.log(Location);
        console.log(forecastData);
        return forecastData ;
      })

};

app.get('/weather',(req,res) => {

    if(!req.query.address){
        res.send({
           error : 'Please provide address as a query param'
        });
        return;
    }

   geocode(req.query.address, (error,{Latitude,Longitude,Location} = {}) => {
    if(error) {
        console.log(error);
        
       return   res.send({
            error 
         });
    } 
    forecast(Latitude, Longitude, (error, forecastData) => {
        if(error) {

            return   res.send({
                error 
             });

        }
        console.log(Location);
        console.log(forecastData);
        res.send({
            forecast : forecastData,
            latitude : '20',
            longitude : '30',
            address : req.query.address
        });
      })

});  
  
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        title : 'Help Article Error',
        errorText : 'Help article not found',
        name : 'Anoop'

    });
})

app.get('*',(req,res) => {
    res.render('error',{
        title : 'Error Info',
        errorText : 'Page not found',
        name : 'Anoop'
    });
})

app.listen(port,()=> {
 console.log("Server is up on port: ",port)
})