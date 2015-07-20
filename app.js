var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
db = require('./model')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

app.get('/', function(req, res, next) {
  db.Country.find({}, function (err, country) {
    if (err){
      res.redirect('/404');
    } else {
      res.render('index', {countries: country});
    }
  })
});

app.get('/country/new', function (req, res, next) {
  res.render('country/new');
})

app.post('/', function (req, res, next) {
  db.Country.create({
  country: req.body.country,
  flag: req.body.flag,
  capital: req.body.capital,
  population: req.body.population
})
  res.redirect('/');
})

app.get('/country/:id', function (req, res, next) {
  db.Country.findById({_id: req.params.id}, function (err, country) {
    if(err){
      res.render('/404')
    } else {
      res.render('country/show', {country: country})
    }
  })
})

app.get('/country/:id/edit', function (req, res, next) {
  db.Country.findById({_id: req.params.id}, function (err, country) {
    if(err){
      res.render('/404')
    } else {
      res.render('country/edit', {country: country})
    }
  })
})

app.post('/country/:id', function (req, res, next) {
  db.Country.findByIdAndUpdate({
    _id: req.params.id}, {
    country: req.body.country,
    flag: req.body.flag,
    capital: req.body.capital,
    population: req.body.population
  }, function (err, country) {
    // body...
  if(err){
    res.redirect('/404');
  } else {
    res.redirect('/');
  }
  })
})

app.post('/country/:id/delete', function (req, res, next) {
  db.Country.remove({_id: req.params.id}, function (err, country) {
    if(err){
      res.redirect('/404')
    } else {
      res.redirect('/')
    }
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
