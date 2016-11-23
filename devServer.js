var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var ParseServer = require('parse-server').ParseServer;
var mongodb = require('mongodb');
//mongodb://<dbuser>:<dbpassword>@ds153677.mlab.com:53677/opi9
// var databaseUri = "mongodb://user-parse:password@ds153677.mlab.com:53677/opi9";
var api = new ParseServer({
  databaseURI:"mongodb://user:user@ds153667.mlab.com:53667/parse-server-test", // 'mongodb://localhost:27017/dev',
  cloud: __dirname + '/cloud/main.js',
  appId:  'Krisappid',
  masterKey:  'master234444',
  //javascriptKey:  'ojavascriptm5qKALt6Yq2r4qmWoBQo5RnxTmHf2q',
   //Add your master key here. Keep it secret!
  serverURL: 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
var app = express();
// var app1 = express();
var compiler = webpack(config);
app.use('/js', express.static(path.join(__dirname, '/js')));
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
var mountPath = '/parse';
app.use(mountPath, api);
app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3000');
});


var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

ParseServer.createLiveQueryServer(httpServer);
