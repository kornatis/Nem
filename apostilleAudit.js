// Include the library
var nem = require("nem-sdk").default;

// Create an NIS endpoint object
var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

// Simulate the file content
var fileContent = nem.crypto.js.enc.Utf8.parse('Apostille is awesome !');

// Transaction hash of the Apostille
var txHash = "efa48c29e4d33a7b189b08b0637e9678d47e0f10b014509891e8c444cc1fe2af";

// Get the Apostille transaction from the chain

function auditApostille(req, res) {

    nem.com.requests.transaction.byHash(endpoint, txHash)
        .then(function (res) {

            if (nem.model.apostille.verify(fileContent, res.transaction)) {
                console.log("Apostille is valid");
                res.status(200).send("apostille is valid");
            } else {
                console.log("Apostille is invalid");
                res.status(500).send("apostille is invalid");
            }
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).send(err);
        });

}

module.exports = { auditApostille };