

var Free = document.getElementById("Free_subMenu");
var Free_BOX = document.querySelector(".Free_BOX");
var Test_BOX = document.querySelector(".Test_BOX");
var Test = document.getElementById("Test_subMenu");



const subMenuAdd = (subMenuName) => {
    subMenuName.classList.remove("hidden");
    console.log("13");
}

const subMenuRemove = (subMenuName) => {
    subMenuName.classList.add("hidden");
    console.log("12");
}


Free.addEventListener("mouseover",function(e){subMenuAdd(Free_BOX);subMenuRemove(Test_BOX)});//프리박스 추가
Free_BOX.addEventListener("mouseout",function(e){subMenuRemove(Free_BOX)});
Test.addEventListener("mouseover",function(e){subMenuAdd(Test_BOX); subMenuRemove(Free_BOX)});
Test_BOX.addEventListener("mouseout",function(e){subMenuRemove(Test_BOX)});

