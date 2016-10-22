var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//"Global" object for this application
var TREESITE = {};

TREESITE.nodes = require('./tree.json');

//Serve static files
app.use('/public', express.static('public'));

//Tree of metadata nodes for the whole site. 
//JavaScript uses it to build a page's navigation.
app.get('/tree', function(req, res) {
    res.json(TREESITE.nodes);
});

//User's see these URLs. 
//The path element after "site" identifies the virtual site, with it's own navigation style.
//Each virtual site has it's own code for sending out template(s) based on the path. 
//And the templates load their own JavaScript which loads the content and builds the navigation.
app.get('/site/s1*',function(req,res) {
    res.sendFile('public/sites/s1/template1.html', {root: __dirname});
});

app.get('/content*', function(req, res) {
    res.send(req.path);
    
});


app.listen(80);


