
    const stars = [];
    const TOTAL_STARS = 300;
    const UPDATE_INTERVAL = 2000;
    const STARS_TO_UPDATE = 15;
    
    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        document.body.appendChild(star);
        
        // 使用 requestAnimationFrame 确保渐变效果正常触发
        requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            star.classList.add('fade-in');
        });
        });
        
        return star;
    }
    
    // 初始化星星
    for (let i = 0; i < TOTAL_STARS; i++) {
        stars.push(createStar());
    }
    
    function updateStars() {
        const starsToRemove = stars
        .sort(() => Math.random() - 0.5)
        .slice(0, STARS_TO_UPDATE);
    
        starsToRemove.forEach(star => {
        // 添加淡出类
        star.classList.add('fade-out');
        
        // 等待淡出动画完成后删除元素
        setTimeout(() => {
            document.body.removeChild(star);
            const index = stars.indexOf(star);
            if (index > -1) {
            stars.splice(index, 1);
            }
            // 创建新星星
            const newStar = createStar();
            stars.push(newStar);
        }, 2000);
        });
    }
    
    setInterval(updateStars, UPDATE_INTERVAL);