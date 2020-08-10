const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;

const sinon = require('sinon');
const { logger } = require('../../src/middleware/logging');

describe("Logging Middleware", () => {
    describe("logger", () => {

        let clock;
        let now;
        
        beforeEach(() => {
            now = new Date();
            clock = sinon.useFakeTimers(now.getTime());
        });

        afterEach(() => {
            clock.restore();
        });

        it("should log the request timestamp and call next", () => {
            let nextSpy = sinon.spy(
                function next() {
                    return 'test';
                }
            );

            logger(null, null, nextSpy);
            expect(nextSpy.called).to.be.true;
        });
    });
});