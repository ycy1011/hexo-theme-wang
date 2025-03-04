document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.nav-toggle');

    // 显示头部的函数
    function showHeader() {
        header.classList.add('show-header');
        navToggle.classList.add('nav-hidden');
    }

    // 隐藏头部的函数
    function hideHeader() {
        header.classList.remove('show-header');
        navToggle.classList.remove('nav-hidden');
    }

    // 绑定事件
    const trigger = document.querySelector('.header-trigger');
    if (trigger) {
        trigger.addEventListener('mouseover', showHeader);
    }

    if (navToggle) {
        navToggle.addEventListener('mouseover', showHeader);
    }

    // 顶部触发区域
    const headerTriggerArea = document.querySelector('.header-trigger');
    if (headerTriggerArea) {
        headerTriggerArea.addEventListener('mouseover', showHeader);
    }

    // 头部区域
    if (header) {
        header.addEventListener('mouseleave', hideHeader);
        header.addEventListener('mouseover', showHeader);
    }

    // 窗口大小改变事件
    window.addEventListener('resize', function() {
        // 在移动设备视图下处理逻辑
        if (window.innerWidth <= 768) {
            hideHeader();
        } else {
            // 非移动设备视图下始终显示
            showHeader();
        }
    });

    // 初始化时检查窗口大小
    if (window.innerWidth <= 768) {
        hideHeader();
    } else {
        showHeader();
    }
});
