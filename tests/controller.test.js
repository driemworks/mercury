import chai from 'chai';
import chaitHttp from 'chai-http';
import app from '../server';

 chai.use(chaitHttp);
 chai.should();

 describe("controller", () => {
    
    describe("POST /create", () => {
        // tests to create a record
        it("should persist record", (done) => {
            
        });
    });


 });