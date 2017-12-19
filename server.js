var express = require('express');
var app = express();
var path = require('path');
require('datejs');
var output = new Object();
var regDate;
var unixDate;

app.use('/', express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', function(req,res) {
	res.render('default');
});

app.get('/:date', function(req,res) {
    var date = req.params.date;
    var unix = true;
    for (var i = 0; i < date.length; i++) {
        if (isNaN(parseInt(date[i]))) {
            unix = false;
            break;
        }
    }

    if (unix) {
        unixDate = date;
        var humanDate = new Date(parseInt(date * 1000));
        var fixedDate = (humanDate.getMonth() + 1) + '-' + humanDate.getDate() + '-' + humanDate.getFullYear();
        regDate = fixedDate;
        res.render('index', {unix: unixDate, date: regDate});
    }

    else {
        date = Date.parse(date);
        if (Object.prototype.toString.call(date) === "[object Date]") {
            if (isNaN(date.getTime())) {
                //not a date
                regDate = "null";
                unixDate = "null";
                res.render('index', {unix: unixDate, date: regDate});
            }

            else {
                //is a date
                var fixedDate = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
                unixDate = (date.getTime() / 1000);
                regDate = fixedDate;
                res.render('index', {unix: unixDate, date: regDate});
            }
        }

        else {
            //not a date
            regDate = "null";
            unixDate = "null";
            res.render('index', {unix: unixDate, date: regDate});
        }
    }
});

var server = app.listen(8080, function(req,res) {
    console.log("listening on 8080");
});