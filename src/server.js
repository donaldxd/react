
var express = require('express'); // Web Framework
var app = express();
var sql = require('mssql');

var config = {  
    user: 'iopvview',  
    password: 'iopvview1234',  
    server: 'CSOPETFDB', 
    database: 'CSOPMKTREAL',
    port: 1443,    
    options:{
        instanceName: 'CSOPETFDB',
    }
         
}; 

app.listen(3028, function () {
    var host = '192.168.152.116'
    var port = 3028

    console.log("app listening at http://%s:%s", host, port)
});

//v_etf_Premium_history
app.get('/historic_datafeed', function (req, res) {
    sql.connect(config, function() {
        var request = new sql.Request();
        request.query('select * from CSOPMKTREAL.dbo.v_etf_Premium_history order by updatedon', function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset.recordsets[0]));
             // Result in JSON format
             sql.close();
        });
    });
})

/*
app.get('/realtime_datafeed', function (req, res) {
    sql.connect(config, function() {
        var request = new sql.Request();
        request.query('select * from CSOPMKTREAL.dbo.v_etf_Premium_history order by updatedon', function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset.recordsets[0]));
             // Result in JSON format
             sql.close();
        });
    });
})
*/