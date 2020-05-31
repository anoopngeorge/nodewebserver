const request = require('request');

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0ea76d4e62c6228f1b4a9fb561313fc5&query='+lat+','+long+'&units=f'

request({url , json : true}, (error, {body}) => {
    if(error) {
        callback(error,undefined);
    } else if(body.error) {
        callback(body.error.info,undefined);
    } else {
        console.log(body);
        callback(undefined,body.current.weather_descriptions[0]+' The temperature is '+body.current.temperature+' but it feels like '+body.current.feelslike +
        ' with humidity '+body.current.humidity);
    }

})
}

module.exports = forecast;