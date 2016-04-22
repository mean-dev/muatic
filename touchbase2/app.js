var express = require('express');
var routes = require('./routes');

var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);

var bodyParser = require('body-parser');

app.set('port', process.env.VCAP_APP_PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'www')));

app.use(bodyParser.json());

app.use(function(err, req, res, next) {
  if(!err) return next();
  console.log(err.stack);
  res.json({error: true});
});

// Main App Page
app.get('/', routes.index);

//app.get('/api/companies', routes.companies_list);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  return true;
});
