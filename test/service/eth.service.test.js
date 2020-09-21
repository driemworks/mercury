const ethjs = require('ethereumjs-utils');
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;

const sinon = require('sinon');
const { logger } = require('../../src/middleware/logging');

describe("Authentication Service", () => {
    describe("verify address", () => {
        
        const inputAddress = '0x123qwe123asd';
        const msgToSign = 'I am a random message';

        beforeEach(() => {
            
        });

        afterEach(() => {
        });

        it("", () => {
            
        });
    });
});