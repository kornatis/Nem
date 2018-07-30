// Include the library
var nem = require("nem-sdk").default;

// Get the Apostille transaction from the chain
function auditFile(request, response) {

    // Create an NIS endpoint object
    var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

    const { txHash } = request.params;
    const file = request.file;
    
    // file content from the buffer
    var image = file.buffer;
		
	var fileContent = nem.crypto.js.enc.Base64.stringify(nem.crypto.js.enc.Utf8.parse(image.toString('base64')));

    if (!txHash) {
        response.status(400).send({ code: 400, description: 'La solicitud contiene sintaxis errónea. Falta el txHash' });
        return
    }
    if (!request.file) {
        response.status(400).send({ code: 400, description: 'No se proporcionó un archivo' });
        return;
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

module.exports = { auditFile };