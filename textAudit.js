// Include the library
var nem = require("nem-sdk").default;

// Create an NIS endpoint object
var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

// Simulate the file content this
var fileContent = nem.crypto.js.enc.Utf8.parse('Apostille is awesome !');

// Transaction hash of the Apostille
//var txHash = "470eaf0b444d7a940e28ebe0a7d77aab7e007e11f6b224acddf444d4b3c6ed44";

// Get the Apostille transaction from the chain

function auditApostille(request, response) {

    const { txHash } = request.params;

    if (!txHash) {
        response.status(400).send({ code: 400, description: 'La solicitud contiene sintaxis errónea. Falta el txHash' });
        return
    }
        
        nem.com.requests.transaction.byHash(endpoint, txHash)
        .then(function (res) {

            if (nem.model.apostille.verify(fileContent, res.transaction)) {
                console.log("Apostille is valid");
                console.log(res.transaction);
                response.status(200).send("apostille is valid");
            } else {
                console.log("Apostille is invalid");
                response.status(500).send("apostille is invalid");
                console.log(res.transaction);
                console.log(fileContent);
            }
        })
        .catch(function (err) {
            console.log(err);
            response.status(500).send(err);
        });
    
}

module.exports = { auditApostille };