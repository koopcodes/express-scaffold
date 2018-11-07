var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const favicon = Buffer.from(
	'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEefcABHj3AAR59wAEefcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUVFQAXFxcAFxAHEgdo0BoFevgZBXn1AAR59wAXFxcAFxcXBBcXFxIWFhYAFhYWAAAAAAAAAAAAAAAAABUVFQAXFxcAFxcXMhcWFZQLU6AnBXr3iQV59SQFefUAFxcXABcXFxAXFxeUFxcXLxcXFwAWFhYAAAAAABUVFQAXFxcAFxcXLxcXF88XFxeyGAcABwV59okFefW9BXn1IgpcsgAXFxcJFxcXthcXF8sXFxcrFxcXABYWFgAXFxcAFxcXLhcXF80XFxfKFxcXKwCV/wUFefVIBXn18wV59b0FefUjDkeFABcXFy8XFxfOFxcXyRcXFysXFxcAFxcXKhcXF8wXFxfTFxcXKg5IhgAFefVEBXn1xAV59fkFefX/BXn1vgV59SUOR4MAFxcXLhcXF9YXFxfJFxcXJxcXFyQXFxe/FxcX2RcXFzYSMlQABXr3BwV59XgFefX2BXn18AV59XwFefYwEjZdABcXFzcXFxfbFxcXvhcXFyIXFxcAFxcXIxcXF78XFxfWFxcXNxMwUAAFefcGBXn1eAV59fAFefVUCmC8ABcXFzgXFxfXFxcXvxcXFyIXFxcAFxcXABcXFwAXFxcjFxcXwRcXF7kWFhYJDkJ5AAV59QYFefV9BXn2lxIuSw0XFxe7FxcXwRcXFyMXFxcAFhYWAAAAAAAXFxcAFxcXABcXFyYXFxeHFhYWDxYWFgAFefUABXn1CQV6+FcMUZsnFxYViBcXFyYXFxcAFhYWAAAAAAAAAAAAAAAAABYWFgA2NjYAFhYWDBYWFgMVFRUAAAAAAAV59gAEff4FDFOfCRcUEQwWFhYAFxcXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD5/wAA4ccAAODHAADAQwAAgCEAAAgQAAAIEAAAhCEAAMIDAADjBwAA448AAP//AAD//wAA//8AAA==', 'base64',
);

app.get('/favicon.ico', function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Length', favicon.length);
  res.setHeader('Content-Type', 'image/x-icon');
  res.setHeader('Cache-Control', 'public, max-age=2592000'); // expires after a month
  res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
  res.end(favicon);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
