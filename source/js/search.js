document.addEventListener('DOMContentLoaded', function() {
    // 首先定义 debounce 函数
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchOverlay = document.querySelector('.search-overlay');
    let searchData;

    // 获取当前语言
    const lang = document.documentElement.lang || 'en';
    
    // 获取翻译文本
    const i18n = {
        zh: {
            noResults: '没有找到相关结果',
            loading: '加载中...'
        },
        en: {
            noResults: 'No results found',
            loading: 'Loading...'
        }
    };
    
    const t = (key) => {
        const langTexts = i18n[lang] || i18n.en;
        return langTexts[key] || i18n.en[key];
    };

    // 加载搜索数据
    const loadSearchData = async () => {
        try {
            const response = await fetch('/search.xml');
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            const entries = xmlDoc.getElementsByTagName('entry');
            
            searchData = Array.from(entries).map(entry => ({
                title: entry.getElementsByTagName('title')[0]?.textContent || '',
                content: entry.getElementsByTagName('content')[0]?.textContent || '',
                url: entry.getElementsByTagName('url')[0]?.textContent || '',
                date: entry.getElementsByTagName('date')[0]?.textContent || '',
                tags: Array.from(entry.getElementsByTagName('tag')).map(tag => tag.textContent)
            }));
            console.log('搜索数据加载成功:', searchData.length, '条记录');
        } catch (error) {
            console.error('搜索数据加载失败:', error);
        }
    };

    // 执行搜索
    const performSearch = (keyword) => {
        console.log('执行搜索:', keyword);
        
        if (!searchData || !keyword) {
            searchResults.style.display = 'none';
            searchOverlay.style.display = 'none';
            return;
        }

        const results = searchData.filter(post => {
            return post.title.toLowerCase().includes(keyword.toLowerCase()) ||
                   post.content.toLowerCase().includes(keyword.toLowerCase()) ||
                   (post.tags && post.tags.some(tag => 
                       tag.toLowerCase().includes(keyword.toLowerCase())
                   ));
        });

        if (results.length === 0) {
            searchResults.innerHTML = `<div class="no-results">${t('noResults')}</div>`;
        } else {
            let html = '<div class="search-results-list">';
            results.forEach(post => {
                html += `
                    <article class="search-result-item">
                        <h2 class="result-title">
                            <a href="${post.url}">${post.title}</a>
                        </h2>
                        <div class="result-meta">
                            <span class="result-date">
                                <img src="/images/calendar.svg" alt="calendar" width="16" height="16">
                                ${new Date(post.date).toLocaleDateString()}
                            </span>
                        </div>
                        <div class="result-excerpt">${post.content.slice(0, 200)}...</div>
                        <div class="result-tags">
                            ${post.tags ? post.tags.map(tag => 
                                `<a href="/tags/${tag}" class="tag">${tag}</a>`
                            ).join('') : ''}
                        </div>
                    </article>
                `;
            });
            html += '</div>';
            searchResults.innerHTML = html;
        }
        searchResults.style.display = 'block';
        searchOverlay.style.display = 'block';
        console.log('搜索结果已显示，共找到', results.length, '条记录');
    };

    // 监听搜索输入
    searchInput.addEventListener('input', debounce((e) => {
        const keyword = e.target.value.trim();
        if (keyword.length > 0) {
            if (!searchData) {
                loadSearchData().then(() => performSearch(keyword));
            } else {
                performSearch(keyword);
            }
        } else {
            searchResults.style.display = 'none';
            searchOverlay.style.display = 'none';
        }
    }, 300));

    // 点击外部关闭搜索结果（排除搜索框和结果区域）
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && 
            !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
            searchOverlay.style.display = 'none';
        }
    });

    // 阻止搜索结果区域的点击事件冒泡
    searchResults.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // 修改搜索框占位符
    //searchInput.setAttribute('placeholder', t('placeholder'));

    // 初始加载搜索数据
    loadSearchData();
});
