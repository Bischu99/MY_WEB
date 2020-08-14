const http = require('http');
const url = require('url');
const template = require('C:/Users/IOT/Desktop/setInterval/lib/template.js');
const mysql = require('mysql');
const fs = require('fs');



var db = mysql.createConnection({
    host    : 'localhost',
    port    : '3306',
    user    : 'root',
    password: 'vusgkfq12!@',
    database: 'mydb'
});
db.connect(function(error) {
    if (error) throw error;
    console.log("Successfully Connected!");
});




const Server =http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    
    if(pathname === '/'){
        if(queryData.id === undefined){
            db.query(`SELECT * FROM WEB_DESCRIPTION`, function(error,mainText){
                if(error){
                    console.log("[mysql error]",error);
                }
                var title = '수근 웹';
                var description = 'Hello';
                var list = template.list(mainText);
                var html = template.HTML(title, list,
                    `<h2>${title}</h2>${description}`,
                );
                

                // fs.readFile(__dirname + '/MY_WEB-master/', function( error, data){
                //     if (error) throw error;
                //     response.writeHead(200, {'Content-Type':'text/javascript'});
                //     response.write(data);
                //     response.end();
                // })
            
                response.writeHead(200);
                response.end(html);
            });
        }
    }
});
Server.listen(3000);