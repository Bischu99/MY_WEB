var TextBox = document.getElementById("TextEnter");
TextBox.addEventListener("mouseout",function(){
    var str = document.getElementById("TextEnter").value;
    console.log(str);
    str = str.replace('\n/g','<br>');
    

});





