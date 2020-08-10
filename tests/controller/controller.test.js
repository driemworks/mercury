const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;

const sinon = require('sinon');

const controller = require('../../src/controllers/controller');
const DatabaseService = require('../../src/service/database');
const EthService = require('../../src/service/eth.service');

describe("controller", () => {

    
    describe("read", () => {
        let getDocstoreContentStub;

        beforeEach(() => {
            getDocstoreContentStub = sinon.stub(DatabaseService, "get");
        });

        afterEach(() => {
            getDocstoreContentStub.restore();
        });

        it("should retrieve record from orbitdb", async () => {
            getDocstoreContentStub.withArgs('1', '2').returns('test');
            
            let req = {
                params: {
                    address: '1',
                    id: '2'
                }
            }
            let res = {
                json: sinon.spy()
            };

            await controller.read(req, res);

            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.equal('test');
        });
    });

    describe("update", () => {
        it("should return 403 if the user does not own the docstore", async () => {
            let req = {
                user: {
                    address: '1'
                },
                params: {
                    address: '2'
                }
            };

            let res = {
                sendStatus: sinon.spy()
            }

            await controller.update(req, res);

            expect(res.sendStatus.calledOnce).to.be.true;
            expect(res.sendStatus.firstCall.args[0]).to.equal(403);
        });

        it("should create the document if it doesn not exist", () => {

        });

        it("should append to the document if it already exists", () => {

        });
    });

    describe("login", () => {
        let recoverEthAcctStub;

        beforeEach(() => {
            recoverEthAcctStub = sinon.stub(EthService, "recoverEthereumAccount");
        });

        afterEach(() => {
            recoverEthAcctStub.restore();
        });

        it("should return JWT token", async () => {
            recoverEthAcctStub.withArgs('2', '1').returns('test');
            let req = {
                body: {
                    mnemonic: '1',
                    password: '2'
                }
            }
            let res = {
                json: sinon.spy()
            };
            await controller.login(req, res);

            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.equal('test');
        });
    });

 });