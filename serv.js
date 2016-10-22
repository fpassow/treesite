var express = require("express");
var app = express();
app.use('/public', express.static('public'));

app.get('/site/*',function(req,res) {
    res.sendFile('public/template.html', {root: __dirname});
});

app.listen(80);
