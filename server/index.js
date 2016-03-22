const express = require('express');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphQLSchema');
const appConfig = require('../app.config');

const projectRoot = path.join(__dirname, '..');
const app = express();

app.use(express.static(path.join(projectRoot, 'build')));
app.use('/graphql', graphqlHTTP({ schema: schema, pretty: true }));

app.get('/', function(req, res) {
    res.sendFile(path.join(projectRoot + '/index.html'));
});

app.get('/data', function(req, res) {
  console.log("Getting data");
  res.status(200).send({ cool: 'data' });
});

app.listen(appConfig.SERVER_PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎 Backend server listening on port %s.', appConfig.SERVER_PORT);
  }
});
