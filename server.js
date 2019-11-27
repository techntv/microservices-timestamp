// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

function isValidTimestamp(time) {
  let regex = /\d{4}(\-\d{2}){2}/g;
  if (regex.test(time)) {
    return {
      isValid: true,
      value: time
    }
  } else if ((!isNaN(parseFloat(time)) && isFinite(time))) {
    return {
      isValid: true,
      value: parseFloat(time)
    }
  } else {
    return {
      isValid: false,
      value: null
    };
  }

}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/", function (req, res) {
  res.json({
    unix: Date.now(),
    utc: Date()
  });
});
app.get("/api/timestamp/:date_string", function (req, res) {
  let dateString = req.params.date_string

  if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    res.json({
      unix: dateString,
      utc: new Date(dateInt).toUTCString()
    })
  }

  let dateObject = new Date(dateString)

  if (dateObject.toString() == 'Invalid Date') {
    res.json({ error: 'Invalid Date' })
  } else {
    res.json({
      unix: dateObject.valueOf(),
      utc: dateObject.toUTCString()
    })
  }
});