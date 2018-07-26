let nem = require('nem-sdk').default;

let endpoint = nem.model.objects.create('endpoint')(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

let common = nem.model.objects.create('common')('TestnetAOS', 'b344aed9ca6ecc5a3bef6ecb3edbaa67cf1a946e76ec8a40aad7f85bf7abdaab');

let transferTransaction = nem.model.objects.create('transferTransaction')("TCD5RT5UKO4YWJNCEG3QO72QJNG7DNNI3I4R2OFH", 7, "mensaje de transaccion");

let preparedTransaction = nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, nem.model.network.data.testnet.id);

nem.model.transactions.send(common, preparedTransaction, endpoint).then(function(res){
    console.log(res);
}, function(err){
    console.log(err);
})


