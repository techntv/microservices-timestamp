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
  let time = new Date();
  res.json({
    "unix": new Date(time).getTime(),
    "utc": new Date(time).toUTCString()
  });
});
app.get("/api/timestamp/:date_string", function (req, res) {
  let timestamp = req.params.date_string
  if (!timestamp) {
    timestamp = new Date()
  }

  let isValidTime = isValidTimestamp(timestamp);
  if (isValidTime.isValid) {
    res.json({
      "unix": new Date(isValidTime.value).getTime(),
      "utc": new Date(isValidTime.value).toUTCString()
    });
  } else {
    res.json({
      "unix": null,
      "utc": "Invalid"
    });
  }
});



// listen for requests :)
var listener = app.listen(4002, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});