module.exports = {
    HTML: function(title, list, description, id){
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
                <div class="slide_box">
                    
                    <div class="slide_content slide01 hidden">
                        <img class="logoImg" src="/img/1.jpg" alt="past">
                    </div>
                    <div class="slide_content slide02 hidden">
                        <img class="logoImg" src="/img/2.jpg" alt="past">
                    </div>

                </div>
               
                <link rel="stylesheet" href="/css/mnb.css" type="text/css">
                <div class="mnb_wrap">
                    <div class="div_inner">
                        <ul class="mnb_list">
                            <li>
                                <a id="Free_subMenu" href="/Comunity/Free">자유게시판</a>
                                    <p class="Free_BOX SubMenu_BOX hidden">
                                        게시판 1<br>
                                        게시판 2<br>
                                        게시판 3<br>
                                        게시판 4<br>
                                    </p>
                                
                            </li>
                            <li>
                                <a id="Test_subMenu" href="/Comunity/Test">테스트게시판</a>
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
                <div>
                    <div class="mainTitle">
                        <p>
                        <h2>${title}<span class="date">${id}</span></h2>
                        ${description}
                        
                            ${list}
                        -------------------------------<br>    
                        <a href="/Comunity/new/create">작성</a>
                        </p>
                    </div>
                    
                </div>
                <script type="text/javascript" src="/js/slide.js"></script>
                <script type="text/javascript" src="/js/modal.js"></script>
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
            i += 1;
        }
        list = list+'</ul>';
        return list;
        
    }
}