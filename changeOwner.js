let nem = require('nem-sdk').default;

let endpoint = nem.model.objects.create('endpoint')(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

let common = nem.model.objects.create('common')('TestnetAOS', 'b344aed9ca6ecc5a3bef6ecb3edbaa67cf1a946e76ec8a40aad7f85bf7abdaab');

/**
 * Create a multisignature aggregate modification transaction object
 *
 * @param {string} senderPublicKey - The sender account public key
 * @param {array} modifications - An array of [MultisigCosignatoryModification]{@link http://bob.nem.ninja/docs/#multisigCosignatoryModification} objects  
 * @param {number} relativeChange - The number of signature to add or remove (ex: 1 to add +1 or -1 to remove one)
 * @param {boolean} isMultisig - True if transaction is multisig, false otherwise
 * @param {number} due - The deadline in minutes
 * @param {number} network - A network id
 *
 * @return {object} - A [MultisigAggregateModificationTransaction]{@link http://bob.nem.ninja/docs/#multisigAggregateModificationTransaction} object
 */

let MultisigAggregateModificationTransaction = nem.model.objects.create('MultisigAggregateModificationTransaction')(senderPublicKey, modifications, relativeChange, isMultisig, due, network);

/**
 * A multisig cosignatory modification object
 *
 * @param {number} type - 1 if an addition, 2 if deletion
 * @param {string} publicKey - An account public key
 *
 * @return {object}
 */


let MultisigAggregateModificationTransaction = nem.model.objects.create('MultisigAggregateModificationTransaction')(type, publicKey);


let preparedTransaction = nem.model.transactions.prepare('MultisigAggregateModificationTransaction')(common, MultisigAggregateModificationTransaction, nem.model.network.data.testnet.id);

nem.model.transactions.send(common, preparedTransaction, endpoint).then(function(res){
    console.log(res);
}, function(err){
    console.log(err);
})


