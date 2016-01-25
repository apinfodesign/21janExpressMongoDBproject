var express 	= require('express');
var fs 		    = require('fs');
var router 		= express.Router();
var path 		= require("path");
var mongoose    = require('mongoose');
var app         = express();
var bodyParser  = require('body-parser');
const methodOverride = require( 'method-override' );

app.use(bodyParser.json() );

try {var uristring = require('./data/mongolabinfo.js').loginstring;
}
catch(err){
}

console.log(uristring, ': is uri');
var db = mongoose.connect(uristring);

var User = db.model('user', {
        name                :  String,
        hobby               :  String,
        interests           :  Array
        });


//top level response
app.get('/', function(req, res) {
    res.send('hello world');
});


//GET - returns list of all objects
//query parameters define page size and zero based page number
app.get('/users', function(req,res,next){
    var page = req.query.page;  //zero based
    var pageSize = req.query.pageSize;

    User.find()
        .sort({created: 'descending'})
        .limit(pageSize)
        .skip(pageSize * page)
        .exec(function (err, users) {
            if (err) {
                return next(err)
            }
            else {
                res.status(201).json(users);
            }
        })
});


//GET/:id - returns the object specified by that id
app.get('/users/:name', function(req,res,next){
    res.type('json');
    var name = req.params.name;
    User.
    findOne({
        name: name
    }).
    select ('name').select('hobby').select('interests').
    exec(function(err, user){
        console.log('you got back : ', user);
        if (err)
            {return next(err)}
            else{
                res.status(201).json( user );
             }
        })
});


//POST create a new object (should return newly created object that has db id to client)
app.post('/users', function(req, res) {
    console.log(req.params.body);
    if (req.body.name !== null) {
        console.log(' incoming to server req.body is: ', req.body);

        var user = new User(req.body);

         //   {
         //   name        : req.body.name,
         //   hobby       : req.body.hobby,
         //   interests   : req.body.interests
         //});

        user.save(function(err){
            if (err){
                next(err);
            } else {
                res.status(201).json( user );
            }
        });
    }
});


//PUT/:id updates whole object with all provided data providers
app.put('/users/:id', function (req, res) {
    if ( req.params.id !== null ){
        User.
        findById( req.params.id, function(err,user) {
            if (err) {res.send(err);}
            else {
                user.name        = req.body.name;
                user.hobby       = req.body.hobby;
                user.interests   = req.body.interests;

                user.save(req.params.id, function(err){
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.json(user);
                    }
                });
            }
        });
    };
});

//PATCH does not work
app.patch('/users/:id', function(req,res){
    if (req.params.id !== null ){
        User.
        findByID (req.params.id , function (err, user){
            if (err){res.send(err);
            }
            else {
                res.json({message: " patch update completed "});
            }
        });
    };
});


//DELETE/:id delete the object specified by that id
app.delete('/users/:id', function (req, res) {
    if (req.params.id !== null){
        //console.log('OOO>>>', req.params.id);
        User.
        findByIdAndRemove( req.params.id, function(err,user) {
            if (err){
                res.send(err);
            } else {
                res.json({
                    message: 'Record has been deleted.',
                    name:  user.name,
                    id : user._id
                });
             }
        });
    }
});


module.exports = app;