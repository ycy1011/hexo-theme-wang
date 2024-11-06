document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    let lastScrollTop = 0; // 上一次的滚动位置
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop; // 获取当前滚动位置

        // 检查滚动方向
        if (scrollTop > lastScrollTop) {
            // 向下滚动
            header.classList.add('hidden-header');
        } else {
            // 向上滚动
            header.classList.remove('hidden-header');
        }

        // 更新上一次的滚动位置
        lastScrollTop = scrollTop;
    });
});