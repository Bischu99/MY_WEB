module.exports = {
    HTML: function(title, list, body, id){
        // const express = require('express');
        // const path = require('path');
        // const app = express();
        
        // app.use(express.static(path.join(__dirname,'public')),function(error){
        //     if (error) {throw error;
        // } else {
        //     console.log("문제 없음");
        // }
        // });


        return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>김수근 웹</title>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="apple-mobile=web-app-title" content="김수근 웹">
                <link rel="stylesheet" href="/bbq.css" type="text/css">
                
            </head>
            <body>
                <div class="slide_box">
                    <button type="button" onclick="prev();" class="slide_btn left"><img class="but_img" src="/button1.png"></button>
                    <button type="button" onclick="Next();" class="slide_btn right"><img class="but_img" src="/button1.png"></button>
                    <div class="slide_content slide01 hidden">
                        <img class="logoImg" src="/1.jpg" alt="razer">
                    </div>
                    <div class="slide_content slide02 hidden">
                        <img class="logoImg" src="/2.jpg" alt="razer">
                    </div>
                    <div class="slide_content slide03 hidden">
                        <img class="logoImg" src="/3.jpg" alt="razer">
                    </div>
                    <div class="slide_content slide04 hidden">
                        <img class="logoImg" src="/4.jpg" alt="razer">
                    </div>
                    <div class="slide_content slide05 hidden">
                        <img class="logoImg" src="/5.png" alt="razer">
                    </div>
                </div>
                <div class="loginButton" onload="Aonload()">
                    <button class="login right" id="login">Login</button>
                    <div class="modal hidden">
                        <div class="overlay"></div>
                        <div class="content"> 
                            <link rel="stylesheet" href="/modal.css" type="text/css">
                            <input type="text" name="id" value="ID"><br>
                            <input type="password"><br>
                            <button class="login" id="loginSelf">login</button>
                        </div>
                    </div>
                </div>
                <link rel="stylesheet" href="/mnb.css" type="text/css">
                <div class="mnb_wrap">
                    <div class="div_inner">
                        <ul class="mnb_list">
                            <li class="active">
                                <a href="/Comunity/Free">자유게시판</a>
                            </li>
                            <li>
                                <a href="/Comunity/Test">테스트게시판</a>
                            </li>
                        </ul>
                        <span class="mnb_line"></span>
                    </div>
                </div>
                <div>
                    <div class="white">
                        <p>
                        -------------------------------   <br>
                            ${title}
                        -------------------------------            
                            ${list}
                        -------------------------------
                            ${body}
                        -------------------------------
                            ${id}
                        -------------------------------
        
                        </p>

                        <a href="/create">create</a>
                    </div>
                </div>
                <script type="text/javascript" src="/slide.js"></script>
                <script type="text/javascript" src="/modal.js"></script>
                <script type="text/javascript" src="/mnb.js"></script>
                
            </body>
        </html>
        `;
    },list: function(filelist){
        var list = '<ul>';
        var i = 0;
        console.log(filelist.length);
        while(i < filelist.length){
            list = list + `<li><a href="/Comunity/${filelist[i].id}">${filelist[i].title}
            </a></li>`;
            i += 1;
        }
        list = list+'</ul>';
        return list;
        
    }
}