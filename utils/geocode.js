const request = require('request');

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5vb3BuZ2VvcmdlIiwiYSI6ImNrOXVmMDM3aTAweWczZW8xb2lvOGtzbXoifQ.aPsyuqcOwbG6yGfBqXjxkw';

    request({url, json : true}, (error,{body}) => {
        if(error) {
             callback("No internet connection",undefined);
        } else if(body.features.length === 0) {
            callback('No matching result',undefined);
        } else {
            const forestr = callback(undefined,{
                Latitude  :    body.features[0].center[1],
                Longitude :    body.features[0].center[0],
                Location :     body.features[0].place_name
            });
            console.log('forestr',forestr)
        }
    })
}

module.exports = geocode;