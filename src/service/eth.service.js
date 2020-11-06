const { raw } = require('body-parser');
const lightwallet = require('eth-lightwallet');
const ethjs = require('ethereumjs-utils');
const { sign } = require('jsonwebtoken');

class EthService {

    /**
     * Verify that a message has been sent from a desired address
     * @param {String} address The address to be verified
     * @param {String} message The message used to verify the address
     */
    static verifyAddress(address, rawMessage, v, r, s) {
        try {
            const msgHash = ethjs.keccak(rawMessage);
            const pub = ethjs.ecrecover(msgHash, v, r.data, s.data);
            const recoveredAddressString = '0x' + ethjs.pubToAddress(pub).toString('hex');
            return address === recoveredAddressString;
        } catch (err) {
            throw err;
        }
    }

    // static verifyAddress(address, signature, message) {
    //     try {
    //         let nonce = "\x19Ethereum Signed Message:\n" + message.length + message;
    //         nonce = ethjs.keccak(nonce);
    //         const {v, r, s} = ethjs.fromRpcSig(signature);
    //         const pubKey = ethjs.ecrecover(ethjs.toBuffer(nonce), v, r, s);
    //         const addressBuffer = ethjs.pubToAddress(pubKey);
    //         const recoveredAddressString = ethjs.bufferToHex(addressBuffer);
    //         return recoveredAddressString === address.toLowerCase();
    //     } catch (err) {
    //         throw err;
    //     }
    // }

}

module.exports = EthService;