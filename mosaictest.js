let nem = require("nem-sdk").default;

let endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

let common = nem.model.objects.create("common")("","b344aed9ca6ecc5a3bef6ecb3edbaa67cf1a946e76ec8a40aad7f85bf7abdaab");

let transferTransaction = nem.model.objects.create("transferTransaction")("TCD5RT5UKO4YWJNCEG3QO72QJNG7DNNI3I4R2OFH", 1, "Sent mosaic");

var mosaicDefinitions = nem.model.objects.get("mosaicDefinitionMetaDataPair");

var mosaicAttachment = nem.model.objects.create("mosaicAttachment")("aos", "aoscoin", 10000);

transferTransaction.mosaics.push(mosaicAttachment);

nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaicAttachment.mosaicId.namespaceId).then(function(res){
  var definition = nem.utils.helpers.searchMosaicDefinitionArray(res.data, ["aoscoin"]);
  var fullName = nem.utils.format.mosaicIdToName(mosaicAttachment.mosaicId);
  mosaicDefinitions[fullName] = {};
  mosaicDefinitions[fullName].mosaicDefinition = definition[fullName];

  var preparedTransaction = nem.model.transactions.prepare("mosaicTransferTransaction")(common, transferTransaction, mosaicDefinitions, nem.model.network.data.testnet.id);
  preparedTransaction.fee = 1000000;

  nem.model.transactions.send(common, preparedTransaction, endpoint).then(function(res){
    console.log(res);
  }, function(err){
    console.log(err);
  });

}, function(err){
  console.log(err);
});