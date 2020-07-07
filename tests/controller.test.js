const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;

const sinon = require('sinon');

const controller = require('../src/controllers/controller');

const DatabaseService = {
    get(address, id) {
        return 'test';
    }
};

describe("controller", () => {
    const sandbox = sinon.createSandbox();
    
    beforeEach(() => {
        sandbox.spy(DatabaseService);
    });

    afterEach(() => {
        sandbox.restore();
    });
    
    describe("read", () => {
        // tests to create a record
        it("should persist record", async () => {
            let params = {
                address: () => {},
                id: () => {}
            }
            const addressStub = sinon.stub(params, "address").returns("address");
            const idStub = sinon.stub(params, "id").returns("id");
            let req = {};
            let res = {
                json: () => {}
            };
            const mock = sinon.mock(res);
            mock.expects("json").once().withExactArgs("hey");

            controller.read(req, res);
            expect(DatabaseService.get).to.have.been.called(1);
            expect(addressStub.calledOnce).to.be.true;
            expect(idStub.calledOnce).to.be.true;
            mock.verify();
        });
    });

    // describe("read", (done) => {
    // });

    // describe("login", () => {
    //     it("should return JWT token", async () => {
    //         let req = {};
    //         let res = {
    //             send: sinon.spy()
    //         };
    //         await controller.login(req, res);
    //         // console.log(res.send());
    //         expect(res.send.calledOnce).to.be.true;
    //         expect(res.send.firstCall.args[0]).to.equal("test");
    //     });
    // });

 });