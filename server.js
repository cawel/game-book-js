var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + '/app')).listen(process.env.PORT || 8080);
