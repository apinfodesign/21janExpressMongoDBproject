var chai        = require('chai');
var chaiHttp    = require('chai-http');
var assert      = chai.assert;
var app         = require('../app');
var expect      = chai.expect;
var should = chai.should();
//var rimraf      = require('rimraf');
//var mkdirp      = require('mkdirp');
chai.use(chaiHttp);

describe('basic Express server at root path... ', function() {

    //testing harness
    var welcomeMessage = 'hello world';  //test root path
    var incomingID = '';  //used for passing created id value to next test.
    var arraySize = 0;    //use to pass existing array size to test for change in array size
    var passCreatedName = '';  //to pass a created name to the next test

    it('returns welcome message  on /', function(done){
        chai.request(app)
            .get('/')
            .end(function(err, res){
                 console.log(' and err', err);
                    console.log(res.text);
                    assert.equal(res.text, welcomeMessage);
                    done();
            });
    });


    it('returns a list of all user documents in collection at /user', function(done){
        chai.request(app)
            .get('/users')
            .end(function(err, res){
                if (err){console.log(err, ' is error');
                } else {
                    arraySize = res.body.length;
                    console.log(  'arraySize is ', arraySize);
                    expect(arraySize).to.be.above(5); //test starts with > six in collection
                    done();
                }
            });
    });


    it('adds a document ', function(done) {
        //test values
        var nameValue = "bill666";
        var hobbyValue = "cats666";
        var arrayValue = ['apples', 'pears', 'bananas'];
        chai.request(app)
            .post("/users")
            .send({ "name"      : nameValue,
                    "hobby"     : hobbyValue,
                    "interests" : arrayValue })
            .end(function (err, res) {
                expect(err).to.be.null;
                assert.equal(res.body.name, nameValue);
                assert.equal(res.body.hobby, hobbyValue);
                incomingID = res.body._id;  //for use in later test
                passCreatedName = res.body.name; // for use in next test
                done();
            });
    });

    it('gets a specific document by user name ', function(done){
        chai.request(app)
            .get('/users/'+passCreatedName)
            .end(function(err, res){
                if (err){console.log(err, ' is error');
                } else {
                    assert.equal(passCreatedName, res.body.name)
                    done();
                }
            });
    });


    it('makes a page request for a page size', function(done){
        //test parameters require about 10 documents in database as start condition
        var page = '2';      //0 based
        var pageSize = '4';   //3 documents
        var queryString = '/users/?page=' + page + '&pageSize=' + pageSize;
        chai.request(app)
            .get(queryString)
            .end(function(err, res){
                if (err){console.log(err, ' is error');
                } else {
                    var arraySize = res.body.length;
                    assert.equal(res.body.length, pageSize); //requested page size = returned
                    done();
                }
            });
    });

    it('updates all values in document by ID ', function(done) {
        //test values
        var nameValue = "davidUpdated";
        var hobbyValue = "trainsUpdated";
        var fullPath = '/users/' + incomingID;
        chai.request(app)
            .put( fullPath )
            .send( { "name"     : nameValue,
                     "hobby"    : hobbyValue,
                     "interests": [ "777","888","999" ]  })
            .end(function (err, res) {
                expect(err).to.be.null;
                assert.equal(res.body.name, nameValue);
                assert.equal(res.body.hobby, hobbyValue);
                done();
            });
    });

    it('deletes a document that was  added ', function(done) {
        var fullPath = '/users/' + incomingID;
        chai.request(app)
            .delete(fullPath)
            .end(function (err, response) {
                if (err) {console.log(err, ' is err ');
                } else {
                    response.should.be.json;
                    response.body.should.be.a('object');
                    assert.equal(incomingID, response.body.id);
                    assert.equal('Record has been deleted.', response.body.message);
                }
                done();
            });
    });

});
