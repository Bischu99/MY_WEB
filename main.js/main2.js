const template = require('C:/Users/IOT/Desktop/setInterval/lib/template.js');
const mysql = require('mysql');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { format } = require('path');

require('date-utils');


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
app.use(bodyParser.urlencoded({
    extended: false
 }));
 app.use(bodyParser.json());



app.get('/', function(request , response) {
        db.query(`SELECT * FROM WEB_DESCRIPTION;`,function(error,WEB_DESCRIPTION){
            if (error)throw error
            db.query(`SELECT * FROM web_title;`,function(error,web_title){
                if (error) throw error;
            
            
        
            var title = web_title[0].name;
            var description = web_title[0].description;
            var id = "Free"
            var list = template.list(WEB_DESCRIPTION);
            var html = template.HTML(title,list,  
                description,
                    id ,
                );
                return response.send(html);
                
            
            });
        });
            //로그인 추가해야될 듯 아마 
        
        });


app.get('/Comunity/:ID', function(request, response){
    var idNUM = request.params.ID;
        if(idNUM==="Test"){
            db.query(`SELECT * FROM WEB_DESCRIPTION;`,function(error,WEB_DESCRIPTION){
                if (error)throw error
                db.query(`SELECT * FROM web_title;`,function(error,web_title){
                    if (error) throw error;
                
                
            
                var title = web_title[1].name;
                var description = web_title[1].description;
                var id = "Test"
                var list = template.list(WEB_DESCRIPTION);
                var html = template.HTML(title,list,  
                    description,
                        id ,
                    );
                    return response.send(html);
                    
                
                });
            });
        } else if (idNUM ==="Free"){
            db.query(`SELECT * FROM WEB_DESCRIPTION;`,function(error,WEB_DESCRIPTION){
                if (error) throw error;
                db.query(`SELECT * FROM web_title;`,function(error,web_title){
                    if (error) throw error;
                
                
            
                var title = web_title[0].name;
                var description = web_title[0].description;
                var id = "Free"
                var list = template.list(WEB_DESCRIPTION);
                var html = template.HTML(title,list,  
                    description,
                        id ,
                    );
                    return response.send(html);
                    
                
                });
            });
        } else {
                db.query(`SELECT * FROM WEB_DESCRIPTION WHERE id=${idNUM};`,function(error,WEB_DESCRIPTION){
                    if (error)throw error;
                db.query(`SELECT * FROM WEB_DESCRIPTION;`,function(error,WEB_DESCRIPTION_list){
                    if (error)throw error;
                    var title = WEB_DESCRIPTION[0].title;
                    var description = WEB_DESCRIPTION[0].description;
                    var time = WEB_DESCRIPTION[0].created.toFormat('YYYY-MM-DD HH24:MI:SS');
                    var list = template.list(WEB_DESCRIPTION_list);
                    var html = template.HTML(`${title}      ${time}`,list,  
                        `<br>${description}<br>
                        <a href="/Comunity/Update/${idNUM}">수정</a><br>
                        <a href="/Comunity/new/create">작성</a><br>
                        <a href="/Comunity/Delete/${idNUM}">삭제</a><br>`,
                        '',"",
                        );
                        return response.send(html);
                        //로그인 추가해야될 듯 아마 
                    
                    });

        })
    };
});
    
    
app.get('/Comunity/new/create', function(request, response){
    db.query(`SELECT * FROM WEB_DESCRIPTION;`, function(error,WEB_DESCRIPTION){
        if (error) throw error;
        var title = 'Create';
        var list = template.list(WEB_DESCRIPTION);
        var html = template.HTML(title, list,`<h2>${title}</h2>
        <form action="/Comunity/new/create" method="post">
            <input type="text" name="title" value=""><br>
            <input type="text" name="description" value=""><br>
            <input type="submit">
        </form>
        `," ",
        )
    
        return response.send(html);
    });
});


app.post('/Comunity/new/create', function(request, response){
            var title = request.body.title;
            var description = request.body.description;
            db.query(`
            INSERT INTO WEB_DESCRIPTION (title, description) VALUES (?,?)`,[
                title, description],function(error){
                    if (error) throw error;
                }
            )
            var html = template.HTML(title,  
                `<h2>${title}___</h2>${description}<br>`,
                '',"",
                );
                return response.send(html);
            });

app.get('/Comunity/Update/:ID', function(request, response){
    const idNUM = request.params.ID;
    db.query(`SELECT * FROM WEB_DESCRIPTION WHERE id=${idNUM};`,function(error,WEB_DESCRIPTION){
        if (error)throw error
        var title = 'Update';
        var list = template.list(WEB_DESCRIPTION);
        var html = template.HTML(title, list,`<h2>${title}</h2>
        <form action="/Comunity/Update/${idNUM}" method="post">
            <input type="text" name="title" value="${WEB_DESCRIPTION[0].title}"><br> 
            <input type="text" name="description" value="${WEB_DESCRIPTION[0].description}"><br>
            <input type="submit">
        </form>`,
        "");
        return response.send(html);

        ///post 만들어야함 업데이트 
    });
});

app.post('/Comunity/Update/:ID', function(request, response){
    var title = request.body.title;
    var description = request.body.description;
    db.query(`
    UPDATE WEB_DESCRIPTION SET title=${title},description=${description} WHERE id=${request.params.ID};`,function(error){
            if (error) throw error;
        }
    );
    var html = template.HTML(title,  
        `<h2>${title}___</h2>${description}<br>`,
        '',"",
        );
        return response.send(html);
    });

app.get('/Comunity/Delete/:ID', function(request, response){
    db.query(`DELETE FROM WEB_DESCRIPTION WHERE id=${request.params.ID};`);
    db.query(`SELECT * FROM WEB_DESCRIPTION`,function(error,WEB_DESCRIPTION){
        if (error)throw error
        var title = WEB_DESCRIPTION[0].title;
        var description = WEB_DESCRIPTION[0].description;
        var id = WEB_DESCRIPTION[0].id;
        var list = template.list(WEB_DESCRIPTION);
        var html = template.HTML(title,list,  
            description,id
            );
            return response.send(html);
            //로그인 추가해야될 듯 아마 
        });
})
app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
});
