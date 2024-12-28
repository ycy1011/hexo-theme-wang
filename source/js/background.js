// 创建星空容器
const container = document.createElement('div');
container.id = 'starry-background';
document.body.appendChild(container);

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
    container.appendChild(star);  // 改为添加到容器中
    
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
        star.classList.add('fade-out');
        
        setTimeout(() => {
            try {
                if (container.contains(star)) {  // 添加检查
                    container.removeChild(star);
                }
                const index = stars.indexOf(star);
                if (index > -1) {
                    stars.splice(index, 1);
                }
                const newStar = createStar();
                stars.push(newStar);
            } catch (error) {
                console.warn('Star removal failed:', error);
            }
        }, 2000);
    });
}

function startUpdatingStars() {
    setInterval(() => {
        requestIdleCallback(updateStars);
    }, UPDATE_INTERVAL);
}

startUpdatingStars();