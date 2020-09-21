const template = require('C:/Users/IOT/Desktop/123/MY_WEB-master/lib/template.js');
const mysql = require('mysql');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { format } = require('path');//모듈 설정 안해주고 사용 했을 떄 모듈 인스톨 한 파일에서 찾아서 자동 완성을 해줌

require('date-utils');


var db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'vusgkfq12!@',
    database: 'mydb'
});
db.connect(function(error){
    if (error) throw error;
    console.log("DB ... OK ");
}); 

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({
    extended: false
 }));
 app.use(bodyParser.json());



app.get('/', function(request , response) {
        db.query(`SELECT * FROM WEB_DESCRIPTION;`,function(error,WEB_DESCRIPTION){
            if (error)return response.send("잘못된 데이터 요청입니다.");
            db.query(`SELECT * FROM web_title;`,function(error,web_title){
                if (error) return response.send("잘못된 데이터 요청입니다.");
            var title = web_title[0].name;
            var description = web_title[0].description;
            var id = "";
            var list = template.list(WEB_DESCRIPTION);
            var html = template.HTML(title,list,  
                description,`<br>${id}`
                );
                return response.send(html);
                
            
            });
        });
    });


app.get('/Comunity/:ID', function(request, response){
    var idNUM = request.params.ID;
        if(idNUM==="Test"){
            db.query(`SELECT * FROM WEB_DESCRIPTION;`,function(error,WEB_DESCRIPTION){
                if (error)return response.send("잘못된 데이터 요청입니다.");
                db.query(`SELECT * FROM web_title;`,function(error,web_title){
                    if (error) return response.send("잘못된 데이터 요청입니다.");
                
                
            
                var title = web_title[1].name;
                var description = web_title[1].description;
                var id = "";
                var list = template.list(WEB_DESCRIPTION);
                var html = template.HTML(title,list,  
                    description,
                    `<br>${id}`,
                    );
                    return response.send(html);
                    
                
                });
            });
        } else if (idNUM ==="Free"){
            db.query(`SELECT * FROM WEB_DESCRIPTION;`,function(error,WEB_DESCRIPTION){
                if (error) return response.send("잘못된 데이터 요청입니다.");
                db.query(`SELECT * FROM web_title;`,function(error,web_title){
                    if (error) return response.send("잘못된 데이터 요청입니다.");
                
                var title = web_title[0].name;
                var description = web_title[0].description;
                var id = "";
                var list = template.list(WEB_DESCRIPTION);
                var html = template.HTML(title,list,  
                    description,
                    `<br>${id}`,
                    );
                    return response.send(html);
                    
                
                });
            });
        } else {
                db.query(`SELECT * FROM WEB_DESCRIPTION WHERE id=${idNUM};`,function(error,WEB_DESCRIPTION){
                    if (error || WEB_DESCRIPTION == []) return response.send("없는 페이지입니다.");
                    if (WEB_DESCRIPTION === undefined || WEB_DESCRIPTION.length == 0) return response.send("없는 페이지입니다.");
                    
                db.query(`SELECT * FROM WEB_DESCRIPTION;`,function(error,WEB_DESCRIPTION_list){
                    if (error) return response.send("잘못된 데이터 요청입니다.");
                    var title = WEB_DESCRIPTION[0].title;
                    var description = WEB_DESCRIPTION[0].description;
                    var time = WEB_DESCRIPTION[0].created.toFormat('YYYY-MM-DD HH24:MI:SS');
                    var list = template.list(WEB_DESCRIPTION_list);
                    var html = template.HTML(title,list,  
                        `${description}<br>
                        <br>
                        <br>
                        <br>
                        <a href="/Comunity/Update/${idNUM}">수정</a> 
                        <a href="/Comunity/new/create">작성</a>
                        <a href="/Comunity/Delete/${idNUM}">삭제</a>`,
                        time,
                        );
                        return response.send(html);
                    
                    });

        })
    };
});
    
    
app.get('/Comunity/new/create', function(request, response){
    db.query(`SELECT * FROM WEB_DESCRIPTION;`, function(error,WEB_DESCRIPTION){
        if (error) return response.send("잘못된 데이터 요청입니다.");
        var title = '작성!';
        var list = template.list(WEB_DESCRIPTION);
        var html = template.HTML(title, list,`
        <form action="/Comunity/new/create" method="post">
            제목 : <input type="text" name="title" value=""><br>
            내용 :<br>
            <textarea  wrap="hard" id="TextEnter" class="descriptionBox" name="description" type="textarea"></textarea><br>
            비밀번호 : <input type="text" name="passWord" value=""><br>
            <input onclick="TextBoxElnter();" type="submit">
        </form>
        <script type="text/javascript" src="/js/TextBox.js"></script>
        `," ",
        )
    
        return response.send(html);
    });
});


app.post('/Comunity/new/create', function(request, response){
    if (request.body.title == ""){
        return response.send("공백은 제목으로 할 수 없습니다.");
    }
    var title = request.body.title;
    var description = request.body.description.replace(/\r\n/g,'<br>');
    var passWord = request.body.passWord;


    db.query(`
    INSERT INTO WEB_DESCRIPTION (title, description ,passWord) VALUES (?,?,?)`,[
        title, description,passWord],function(error){
            if (error) return response.send("잘못된 데이터 요청입니다.");
            db.query(`SELECT * FROM WEB_DESCRIPTION;`, function(error,WEB_DESCRIPTION){
                db.query(`SELECT * FROM WEB_DESCRIPTION WHERE description="${description}" AND title="${title}"`,function(error,WEB_ID){
                    if (error ) return response.send("잘못된 데이터 요청입니다.");
                    if (WEB_ID.length == 0)return response.send("잘못된 데이터 요청입니다.");
                    var idNum = WEB_ID[0].id;
                    var time = WEB_DESCRIPTION[0].created.toFormat('YYYY-MM-DD HH24:MI:SS');
                    var list = template.list(WEB_DESCRIPTION);
                    var html = template.HTML(title,  
                        list,`${description}<br>
                        <br>
                        <br>
                        <br>
                        <a href="/Comunity/Update/${idNum}">수정</a> 
                        <a href="/Comunity/new/create">작성</a>
                        <a href="/Comunity/Delete/${idNum}">삭제</a>`,
                        time,
                        );
                        return response.send(html);
                    });
                });
            });
        });

app.get('/Comunity/Update/:ID', function(request, response){
    const idNUM = request.params.ID;
    db.query(`SELECT * FROM WEB_DESCRIPTION WHERE id=${idNUM};`,function(error,WEB_DESCRIPTION){
        if (error)return response.send("잘못된 데이터 요청입니다.");
        if (WEB_DESCRIPTION.length == 0)return response.send("잘못된 데이터 요청입니다.");
        var title = '수정';
        var description = WEB_DESCRIPTION[0].description.replace(/<br>/g,'\n');
        var list = template.list(WEB_DESCRIPTION);
        var html = template.HTML(title, list,`
        <form action="/Comunity/Update/${idNUM}" method="post">
            제목 : <input type="text" name="title" value="${WEB_DESCRIPTION[0].title}"><br> 
            내용 :<br>
            <textarea wrap="hard" class="descriptionBox" type="textarea" name="description" >${description}</textarea><br>
            비밀번호 : <input type="text" name="passWord" value=""><br>
            <input type="submit">
        </form>`,
        "");
        return response.send(html);

    });
});

app.post('/Comunity/Update/:ID', function(request, response){
    if (request.body.title == ""){
        return response.send("공백은 제목으로 할 수 없습니다.");
    }
    var idNum = request.params.ID;
    var title = request.body.title;
    var description = request.body.description;
    var passWord = request.body.passWord;
    db.query(`SELECT * FROM WEB_DESCRIPTION WHERE id=${request.params.ID}`,function(error,WEB_passWord){
        if (passWord == WEB_passWord[0].passWord){
            db.query(`
                UPDATE WEB_DESCRIPTION SET title="${title}",description="${description}" WHERE id=${request.params.ID};`,function(error){
                if (error) return response.send("잘못된 데이터 요청입니다.");
                db.query(`SELECT * FROM WEB_DESCRIPTION`,function(error,WEB_list){
                    var time = WEB_passWord[0].created.toFormat('YYYY-MM-DD HH24:MI:SS');
                    var list = template.list(WEB_list);
                    var html = template.HTML(title,  
                        list,`${description}<br>
                        <br>
                        <br>
                        <br>
                        <a href="/Comunity/Update/${idNum}">수정</a> 
                        <a href="/Comunity/new/create">작성</a>
                        <a href="/Comunity/Delete/${idNum}">삭제</a>`,
                        time,
                        );
                        return response.send(html);
                });
            });
        } else {
            return response.send("비밀번호가 틀렸습니다.");
        }
    });
});

app.get('/Comunity/Delete/:ID', function(request, response){
    db.query(`SELECT * FROM WEB_DESCRIPTION WHERE id=${request.params.ID};`, function(error,WEB_DESCRIPTION){  
        const idNUM = request.params.ID;
        if (error)return response.send("잘못된 데이터 요청입니다.");
        db.query(`SELECT * FROM WEB_DESCRIPTION`,function(error,WEB_list){
            if (error) return response.send("잘못된 데이터 요청입니다.");
            if (WEB_DESCRIPTION.length == 0)return response.send("잘못된 데이터 요청입니다.");
            var title = WEB_DESCRIPTION[0].title;
            var description = WEB_DESCRIPTION[0].description;
            var time = WEB_DESCRIPTION[0].created.toFormat('YYYY-MM-DD HH24:MI:SS');
            var list = template.list(WEB_list);
            var html = template.HTML(title,list,  
                `${description}<br>
                <br>
                <br>
                <form action="/Comunity/Delete/${idNUM}" method="post">
                    비밀번호 : <input type="text" name="passWord" value=""><br>
                    <input type="submit">
                </from>`,time
                );
            return response.send(html);
        });
    });
});

app.post(`/Comunity/Delete/:ID`, function(request,response){
    var passWord = request.body.passWord;
    db.query(`SELECT passWord FROM WEB_DESCRIPTION WHERE id=${request.params.ID}`,function(error,WEB_passWord){
        if (passWord == WEB_passWord[0].passWord){
            db.query(`DELETE FROM WEB_DESCRIPTION WHERE id=${request.params.ID};`);
            db.query(`SELECT * FROM WEB_DESCRIPTION`, function(error,WEB_DESCRIPTION){
                if (error) return response.send("잘못된 데이터 요청입니다."); 
                var title = WEB_DESCRIPTION[0].title;
                var description = WEB_DESCRIPTION[0].description;
                var time = WEB_DESCRIPTION[0].created.toFormat('YYYY-MM-DD HH24:MI:SS');
                var list = template.list(WEB_DESCRIPTION);
                var html = template.HTML(title,list,description,time)
                return response.send(html);                
            });
        } else {
            return response.send("비밀번호가 틀렸습니다.");
        }
    });
});


app.listen(80,'192.168.0.160', function(){
    console.log('Example app listening on port 80!')
});