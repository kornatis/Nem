var express = require('express');
var CreateText = require('./apostilleCreate');
var AuditText = require('./textAudit');
var ApostilleFile = require('./apostilleFile');
var AuditFile = require('./fileAudit');
var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });


var api = express.Router();

api.put('/apostille/create', CreateText.createApostille);
api.put('/audit/text/:txHash', AuditText.auditApostille);
api.put('/apostille/file', upload.single('file'), ApostilleFile.fileApostille);
api.put('/audit/file/:txHash', upload.single('file'), AuditFile.auditFile);

module.exports = api;