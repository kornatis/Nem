let nem = require("nem-sdk").default;
var request = require('request');

// Create an NIS endpoint object
let endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

// Create a common object holding key
let common = nem.model.objects.create("common")("","b344aed9ca6ecc5a3bef6ecb3edbaa67cf1a946e76ec8a40aad7f85bf7abdaab");

function fileApostille(request,response){

	const { tag } = request.query;
	const file = request.file;
	const fileName = request.file.originalname;
	

    if (!request.file) {
        response.status(400).send({ code: 400, description: 'No se proporcionó un archivo' });
        return;
	}
	if (!tag) {
        response.status(400).send({ code: 400, description: 'No se proporcionó un tag' });
        return;
	}
	
	// file content from the buffer
	//var fileContent = nem.crypto.js.enc.Utf8.parse(file.buffer);

	var image = file.buffer;
	
	var fileContent = 'data:application/x-pdf;base64' +	
	nem.crypto.js.enc.Base64.stringify(nem.crypto.js.enc.Utf8.parse(image));

	// Create the apostille
	var apostille = nem.model.apostille.create(common, fileName, fileContent, tag, nem.model.apostille.hashing["SHA256"], false, "", true, nem.model.network.data.testnet.id);

	// Serialize transfer transaction and announce
	nem.model.transactions.send(common, apostille.transaction, endpoint)
	.then(function(res){
		// If code >= 2, it's an error
		if (res.code >= 2) {
			console.error(res.message);
			response.status(500).send(res.message);
		} else {
			console.log("\nTransaction: " + res.message);
			console.log("\nCreate a file with the fileContent text and name it:\n" + apostille.data.file.name.replace(/\.[^/.]+$/, "") + " -- Apostille TX " + res.transactionHash.data + " -- Date DD/MM/YYYY" + "." + apostille.data.file.name.split('.').pop());
			console.log("When transaction is confirmed the file should audit successfully in Nano");
			console.log("\nThe hash is: " + res.transactionHash.data + " to audit");
			response.send(res);
		}
	})
	.catch(function (err) {
		console.log(err);
		response.status(500).send(err);
	});
}

module.exports = { fileApostille };
