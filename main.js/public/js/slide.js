var imgIndex = 0;
var slideImg = new Array(
    document.querySelector(".slide01"),
    document.querySelector(".slide02")
)
window.onload = function(){
    slideImg[imgIndex].classList.remove("hidden");
}
setInterval(function() {
    Next();
},3000)
function Next()
{
    if (slideImg.length == 0)
        return
    var last = imgIndex;
    imgIndex = Math.abs(imgIndex + 1) % slideImg.length;

    slideImage(imgIndex,last);
}

function prev()
{
    if (slideImg.length == 0)
        return;
    var last =imgIndex;
    imgIndex = imgIndex == 0 ? slideImg.length -1 : imgIndex -1;
    slideImage(imgIndex,last);
}

function slideImage(index, lastIndex) {
    slideImg[lastIndex].classList.add("hidden");
    slideImg[index].classList.remove("hidden");
}

