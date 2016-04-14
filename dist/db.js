// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');


// var url = 'mongodb://localhost:27017/test';

// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server.");
//   db.close();
// });


var mongo = require('mongodb'), Server = mongo.Server, Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('test', server);

exports.getMainCategory = function(success){
  db.open(function(err, db) {
      if(!err) {
          db.collection('maincategory', function(err, collection){
            collection.find().toArray(function(error, bars){
              success(bars);
            });
          });
      }
  });
};



var mysql = require('mysql');  
      
var TEST_DATABASE = 'silk_tmp';  
  
// 创建连接  
var client = mysql.createConnection({  
  host: '123.56.204.219',
  port: '3306',
  user: 'silk_tmp',  
  password: 'silk_tmp',  
});  


// var TEST_DATABASE = 'test';  
// var client = mysql.createConnection({  
//   host: 'localhost',
//   port: '3306',
//   user: 'root',  
//   password: '',  
// });  

client.connect();
client.query("use " + TEST_DATABASE);



exports.getMedication = function(success){
  var result = {
        "name": "白加黑",
        "children": [{
            "name": "适应症",
            "children": [{
                "name": "发热"
            }, {
                "name": "头痛",
                "size": 3812
            }, {
                "name": "四肢酸痛",
                "size": 6714
            }, {
                "name": "喷嚏",
                "size": 743
            }, {
                "name": "流鼻涕",
                "size": 743
            }, {
                "name": "鼻塞",
                "size": 743
            }, {
                "name": "咳嗽",
                "size": 743
            }]
        },
        { "name": "用法用量：白天服用,一日二次,每次1～2片"},
        { "name": "不良反应：偶见轻度乏力.恶心.上腹不适.食欲不振.口干等"}
        ]
};
  success(result); 
};


exports.getSummary = function(success){
  client.query(  
    'SELECT * FROM t_data_summary order by created desc limit 1',  
    function(err, results, fields) {  
      if (err) {  
        throw err;  
      }  
        
      if(results[0]){
        var data = {
          id: results[0].id, 
          drugs: results[0].drugs, 
          illnesses: results[0].illnesses,
          medications: results[0].medications,
          inspects: results[0].inspects
        };
        success(data); 
      }    
    }  
  ); 
};

exports.getCategory = function(type, success){
  client.query(  
    'select * from t_datatype_summary where data_series = '+ type,  
    function(err, results, fields) {  
      if (err) {  
        throw err;  
      }  
        
      if(results){
        var data = new Array();
        results.forEach(function(d){
          data.push({category: d.data_type, value: parseInt(d.data_total)});
        });
        success(data); 
      }    
    }  
  ); 
};

exports.getTrends = function(success){
  client.query(  
    'select * from t_data_summary order by workdate',  
    function(err, results, fields) {  
      if (err) {  
        throw err;  
      }  
        
      if(results){
        var data = new Array();
        results.forEach(function(d){
          data.push(
            {
              dateKey: d.workdate, 
              drugs: parseInt(d.drugs), 
              illnesses: parseInt(d.illnesses), 
              medications: parseInt(d.medications), 
              inspects: parseInt(d.inspects)
            });
        });
        success(data); 
      }
    }  
  ); 
};


exports.getDrugList = function(drugName, success){
  client.query(  
    'select * from t_yongyao_detail where ypmc like "%'+ drugName +'%" limit 10',
    function(err, results, fields) {  
      if (err) {  
        throw err;  
      }  
      if(results){
        var data = new Array();
        results.forEach(function(d){
          data.push(
            {
              dateKey: d.workdate, 
              ypmc: d.ypmc,
              gg: d.gg, 
              jx: d.jx, 
              yfyl: d.yfyl,
              scqy: d.scqy
            });
        });
        success(data); 
      }
    }  
  ); 
};

exports.getDrugsType = function(success){
  client.query(  
    'select * from t_drugstype',
    function(err, results, fields) {  
      if (err) {  
        throw err;  
      }  
      if(results){
        var data = new Array();
        results.forEach(function(d){
          data.push(
            {
              type: d.type_name,
              value: d.type_count
            });
        });
        success(data); 
      }
    }  
  ); 
};


