document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const trigger = document.querySelector('.header-trigger');
    const navToggle = document.querySelector('.nav-toggle');
    
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
});