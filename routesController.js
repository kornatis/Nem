var express = require('express');
var Create = require('./apostilleCreate');
var Audit = require('./apostilleAudit');

var api = express.Router();

api.put('/apostille/create', Create.createApostille);
api.get('/apostille/audit', Audit.auditApostille);

module.exports = api;