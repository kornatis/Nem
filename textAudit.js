// Include the library
var nem = require("nem-sdk").default;

function auditApostille(request, response) {

    // Create an NIS endpoint object
    var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

    // Simulate the file content this
    var fileContent = nem.crypto.js.enc.Utf8.parse(request.body.contentText);
    const {txHash}= request.params;

    if (!txHash) {
        response.status(400).send({ code: 400, description: 'La solicitud contiene sintaxis errónea. Falta el txHash' });
        return
    }
        // Get the Apostille transaction from the chain
        nem.com.requests.transaction.byHash(endpoint, txHash)
        .then(function (res) {

            if (nem.model.apostille.verify(request.body.contentText, res.transaction)) {
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