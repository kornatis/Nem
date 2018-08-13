var express = require('express');
var CreateText = require('./apostilleCreate');
var AuditText = require('./textAudit');
var ApostilleFile = require('./apostilleFile');
var AuditFile = require('./fileAudit');
var FileAccount = require('./apostilleAccount');
var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });


var api = express.Router();

api.put('/apostille/create', upload.single('file'), CreateText.createApostille);
api.put('/audit/text/:txHash', upload.single('file'), AuditText.auditApostille);
api.put('/apostille/file', upload.single('file'), ApostilleFile.fileApostille);
api.put('/audit/file/:txHash', upload.single('file'), AuditFile.auditFile);
api.put('/apostille/fileAccount', upload.single('file'), FileAccount.apostilleFileAccount);

module.exports = api;