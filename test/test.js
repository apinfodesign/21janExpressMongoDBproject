var chai        = require('chai');
var chaiHttp    = require('chai-http');
var assert      = chai.assert;
var fs          = require('fs');
const path 		= require("path");
var app         = require('../app');
var expect      = chai.expect;

var rimraf      = require('rimraf');
var mkdirp      = require('mkdirp');

chai.use(chaiHttp);
var assert = require('assert');

//test harness datavalues
var url = 'http://localhost:8081';


describe('simple crud demo... ', function() {

    before( function(done) {
        done();
    });


    it.only('returns users on /users', function(done){
        chai.request(url)
            .get('/')
            .end(function(err, response){
                console.log('response.body.text is ', response)
                expect(err).to.be.null;
                assert.equal(response.text, 'hello world')
                done();
            });
    });


    it('returns user string on /echo/', function(done){
        chai.request(url)
            .get('/echo/Billybob')
            .end(function(err, response){
                expect(err).to.be.null;
                assert.equal(
                    response.text, "Hello Billybob!")
                done();
            });
    });

it('returns hello world on / ', function(done){
    chai.request(url)
        .get('/')
        .end(function(err, response){

            expect(err).to.be.null;

            console.log(response.text);
            // assert.equal(
            //    response.text, 'hello world'
            //);
            done();
        });
});


    after (function(done) {
        done();
    });


});