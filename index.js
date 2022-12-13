// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// [project_url]/api/
app.get("/api/", (req, res) => {
  let tmp = new Date();
  res.json({
    unix: tmp.valueOf(),
    utc: tmp.toUTCString(),
  });
});

// [project_url]/api/:date
app.get("/api/:date", function (req, res) {
  let reg1 = /\d{13}/;
  let tmp1 = req.params.date;
  let tmp2;
  let tmp3 = new Date(req.params.date);
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
  let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (reg1.test(tmp1)) {
    tmp2 = new Date(Number(tmp1));     // 2015-12-25 00:00:00
    let result1 = tmp2.getFullYear();  // 2015
    let result2 = tmp2.getMonth();     // 12
    let result3 = tmp2.getDate();      // 25
    let result4 = tmp2.getDay();       // 5(Friday)
    let result5 = ('0' + tmp2.getHours()).slice(-2);    // 00(HH)
    let result6 = ('0' + tmp2.getMinutes()).slice(-2);  // 00(MM)
    let result7 = ('0' + tmp2.getSeconds()).slice(-2);  // 00(SS)
    res.json({
      unix: Number(tmp1),
      utc: `${days[result4]}, ${result3} ${month[result2]} ${result1} ${result5}:${result6}:${result7} GMT`,
    });
    return;
  }
  
  if (Number.isNaN(tmp3.getTime())) {
    res.json({error : "Invalid Date"});
  } else {
    res.json({unix: tmp3.valueOf(), utc: tmp3.toUTCString()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
