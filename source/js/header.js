document.addEventListener('DOMContentLoaded', function() {
    let lastScrollPosition = 0;
    const header = document.querySelector('header');
    const trigger = document.querySelector('.header-trigger');
    const navToggle = document.querySelector('.nav-toggle');
    const searchInput = document.getElementById('search-input');
    
    function showHeader() {
        header.classList.add('show-header');
        navToggle.classList.add('nav-hidden');
    }
    
    function hideHeader() {
        header.classList.remove('show-header');
        navToggle.classList.remove('nav-hidden');
    }
    
    [trigger, navToggle].forEach(element => {
        element.addEventListener('mouseover', showHeader);
    });
    
    header.addEventListener('mouseleave', hideHeader);
    header.addEventListener('mouseover', showHeader); // 鼠标在header上时保持显示

    // 当视窗宽度变化时，检查宽度并调整header显示逻辑
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            hideHeader();
            header.classList.add('vertical-layout');
        } else {
            showHeader();
            header.classList.remove('vertical-layout');
        }
    });

    // 初始检查视窗宽度
    if (window.innerWidth <= 768) {
        hideHeader();
        header.classList.add('vertical-layout');
    }

    window.addEventListener('scroll', () => {
        // 如果搜索框处于焦点状态，不要隐藏header
        if (document.activeElement === searchInput) {
            header.style.transform = 'translateY(0)';
            return;
        }

        // ...existing code...
    });
});