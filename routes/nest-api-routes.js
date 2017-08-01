var request = require("request");
const express = require('express');
const router = express.Router();

require('dotenv').config();

// GET AUTHORIZATION TOKEN
var options = {
    method: 'POST',
    url: 'https://api.home.nest.com/oauth2/access_token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
        client_id: (process.env.CLIENT_ID),
        client_secret: (process.env.CLIENT_SECRET),
        grant_type: (process.env.GRANT_TYPE),
        code: (process.env.CODE)
    }
};

request(options, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});

// GET JSON WITH STATS
var options = {
    method: 'GET',
    url: 'https://developer-api.nest.com/',
    headers: {
        authorization: 'Bearer ' + (process.env.NEST_TOKEN),
        'content-type': 'application/json'
    },
    form: {
        client_id: (process.env.CLIENT_ID),
        client_secret: (process.env.CLIENT_SECRET),
        grant_type: (process.env.GRANT_TYPE),
        code: (process.env.CODE)
    }
};

request(options, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});


//POST TEMPERATURE 75
var options = {
    method: 'PUT',
    url: 'https://developer-api.nest.com/devices/thermostats/fBPMKukMCSry2ORduyQXdPh71Io6C2rc',
    headers: {
        authorization: '(process.env.NEST_TOKEN)',
        'content-type': 'application/json'
    },
    body: { target_temperature_f: 72 },
    json: true
};

request(options, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});