const lightwallet = require('eth-lightwallet');

class EthService {

    HD_PATH_STRING = "m/44'/60'/0'/0";

    /**
     * Verify that a message has been sent from a desired address
     * @param {String} address The address to be verified
     * @param {String} message The message used to verify the address
     */
    static verifyAddress(address, rawMessage, v, r, s) {
        try {
            const recoveredAddress = lightwallet.signing.recoverAddress(rawMessage, v, r, s);
            return address === recoveredAddress;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = EthService;