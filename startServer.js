var app = require ('./app.js');

//attaches exported module "app" which includes express
var port = process.env.PORT || 8081;

app.listen(port, function () {
    console.log(' Listening on port', port);
});

