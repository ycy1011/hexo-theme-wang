// 获取header元素
var header = document.getElementById("myHeader");

// 监听页面的滚动事件
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    // 如果页面向下滚动超过header的高度
    if (document.body.scrollTop > header.offsetHeight) {
        header.classList.add("hidden");
    } else {
        header.classList.remove("hidden");
    }
}