const express = require("express");
const fs = require("fs");
const app = express();
var ControlRoutes = require('./routesController');

// Use body-parser to handle the PUT data
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 1000000000000000000000 }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/services', ControlRoutes);

// We want to extract the port to publish our app on
let port = process.env.PORT || 8080;

app.listen(port);

console.log('server started on: ' + port);