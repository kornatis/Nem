let nem = require("nem-sdk").default;

// Create an NIS endpoint object
let endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

// Create a common object holding key
let common = nem.model.objects.create("common")("","b344aed9ca6ecc5a3bef6ecb3edbaa67cf1a946e76ec8a40aad7f85bf7abdaab");

function createApostille(req,response){

	const { tag } = req.query;

	// Simulate the file content
	var fileContent = nem.crypto.js.enc.Utf8.parse(req.body.contentText);

	// Create the apostille
	var apostille = nem.model.apostille.create(common, "Test.txt", fileContent, tag, nem.model.apostille.hashing["SHA256"], false, "", true, nem.model.network.data.testnet.id);

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
			console.log("\nYou can also take the following hash: " + res.transactionHash.data + " and put it into the audit.js example");
			response.send(res);
		}
	})
	.catch(function (err) {
		console.log(err);
		response.status(500).send(err);
	});
}

module.exports = { createApostille };
