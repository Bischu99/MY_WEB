module.exports = {
    HTML: function(title, list, description, time){
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>${title}웹</title>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="apple-mobile=web-app-title" content="김수근 웹">
                <link rel="stylesheet" href="/css/bbq.css" type="text/css">
                
            </head>
            <body>
                <link rel="stylesheet" href="/css/mnb.css" type="text/css">
                
                <div class="mnb_wrap">
                    <div class="mnb_size">
                        <ul class="mnb_list">
                            <li>
                                <a id="Free_subMenu" href="/Comunity/Free"><img src=/img/Free.png></a>
                                    <p class="Free_BOX SubMenu_BOX hidden">
                                       <a href="/Comunity/128">게시판 1</a><br>
                                        게시판 2<br>
                                        게시판 3<br>
                                        게시판 4<br>
                                    </p>
                                
                            </li>
                            <li>
                                <a id="Test_subMenu" href="/Comunity/Test"><img src=/img/Test.png></a>
                                    <p class="Test_BOX SubMenu_BOX hidden">
                                        게시판 1<br>
                                        게시판 2<br>
                                        게시판 3<br>
                                        게시판 4<br>
                                    </p>
                            </li>
                        </ul>
                    </div>
                </div>
            

                <div class="main_text_box">
                    <div class="mainTitle">
                        <br>
                        <p>
                        <h2 class="title_Size">${title}</h2>
                        <span class="date">${time}</span><br><br>
                        <div class="description">${description}</div>
                        
                        ${list}
                        -------------------------------<br>    
                        <a href="/Comunity/new/create">작성</a>
                        </p>
                        <br>
                    </div>
                </div>
                
                 <div class="slide_box">
                    
                    <div class="slide_content slide01 hidden">
                        <img class="logoImg" src="/img/1.jpg" alt="past">
                    </div>
                    <div class="slide_content slide02 hidden">
                        <img class="logoImg" src="/img/2.jpg" alt="past">
                    </div>

                </div>
                
                <script type="text/javascript" src="/js/slide.js"></script>
                <script type="text/javascript" src="/js/mnb.js"></script>
                
            </body>
        </html>
        `;
    },list: function(filelist){
        var list = '<ul>';
        var i = 0;
        while(i < filelist.length){
            list = list + `
            <li><a href="/Comunity/${filelist[i].id}">${filelist[i].title}</a></li>`;
            i++;
        }
        list = list+'</ul>';
        return list;
        
    }
}