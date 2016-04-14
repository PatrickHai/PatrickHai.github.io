var express = require('express')
var app = express()

app.use(express.static(__dirname))
app.listen(process.env.PORT || 9000)

var url = require('url')


var db_service = require('./db')


app.get('/api/category', function(req,res){
    db_service.getCategory(1, function(result){
        res.contentType('json')
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(result))
        res.end()
    });
})

app.get('/api/illnessType', function(req,res){
    db_service.getCategory(2, function(result){
        res.contentType('json')
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(result))
        res.end()
    });
})

app.get('/api/rationalUse', function(req,res){
    db_service.getCategory(3, function(result){
        res.contentType('json')
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(result))
        res.end()
    });
})

app.get('/api/inspects', function(req,res){
    db_service.getCategory(4, function(result){
        res.contentType('json')
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(result))
        res.end()
    });
})

app.get('/api/trends', function(req,res){
    db_service.getTrends(function(result){
        res.contentType('json')
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(result))
        res.end()
    });
})

app.get('/api/maincategory', function(req,res){
    db_service.getMainCategory(function(result){
        res.contentType('json')
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(result))
        res.end()
    });
})

app.get('/api/medication', function(req,res){
    db_service.getMedication(function(result){
        res.contentType('json')
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(result))
        res.end()
    });
})

app.get('/api/summary', function(req,res){
    db_service.getSummary(function(result){
        res.contentType('json')
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(result))
        res.end()
    });
})

app.get('/api/druglist', function(req,res){
    var urlObj = url.parse(req.url, true, false);
    db_service.getDrugList(urlObj.query.drugName, function(result){
        res.contentType('json')
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(result))
        res.end()
    });
})

app.get('/api/drugsType', function(req,res){
    db_service.getDrugsType(function(result){
        res.contentType('json')
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.write(JSON.stringify(result))
        res.end()
    });
})