var express = require('express');
var CreateText = require('./apostilleCreate');
var Audit = require('./apostilleAudit');
var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });


var api = express.Router();

api.put('/apostille/create', upload.single('file'), CreateText.createApostille);
api.get('/apostille/audit/:txHash', Audit.auditApostille);

module.exports = api;