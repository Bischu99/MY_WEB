const http = require('http');
const url = require('url');
const fs = require('fs');
const template = require('C:/Users/IOT/Desktop/setInterval/lib/template.js');
const mysql = require('mysql');
const express = require('express');
const app = express();
const path = require('path');

var db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'vusgkfq12!@',
    database: 'mydb'
});
db.connect(function(error) {
    if (error) throw error
    console.log("DB ... OK ");
}); 

app.use(express.static(path.join(__dirname,'public')));


app.get('/', function(request , response) {
    db.query(`SELECT * FROM WEB_DESCRIPTION`,function(error,WEB_DESCRIPTION){
        if (error)throw error
        console.log("DB load ok ");
    
        var title = WEB_DESCRIPTION[0].title;
        var description = WEB_DESCRIPTION[0].description;
        var id = WEB_DESCRIPTION[0].id;
        var list = template.list(WEB_DESCRIPTION);
        var html = template.HTML(title,list,  
            `<h2>${title}</h2>${description}`,
                id ,
            );
            return response.send(html);
            //로그인 추가해야될 듯 아마 
        
        });
    });
    
app.get('/Comunity/:ID', function(request, response){
    app.use(express.static(path.join(__dirname,'public')));
    
    var idNUM = request.params.ID;
    
    
        db.query(`SELECT * FROM WEB_DESCRIPTION`,function(error,WEB_DESCRIPTION){
        if (error)throw error
        console.log("DB load ok ",idNUM);
    
        var title = WEB_DESCRIPTION[idNUM].title;
        var description = WEB_DESCRIPTION[idNUM].description;
        var id = WEB_DESCRIPTION[idNUM].id;
        var list = template.list(WEB_DESCRIPTION);
        var html = template.HTML(title,list,  
            `<h2>${title}</h2>${description}`,
                id ,
            );
            return response.send(html);
            //로그인 추가해야될 듯 아마 
        
        });
    });
    

    // db.query(`SELECT * FROM WEB_DESCRIPTION`, function(error,mainText){
    //     if(error){
    //         console.log("[mysql error]",error);
    //     }
    //     var title = '수근 웹';
    //     var description = 'Hello';
    //     var list = template.list(mainText);
    //     var html = template.HTML(title, list,
    //         `<h2>${title}</h2>${description}`,
    //     );
app.use(function(red, res, next){
    next(createError(404));
})

app.listen(3000, function(){
    console.log('Example app listening on port 3000!')
});
