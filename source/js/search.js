document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.createElement('div');
    searchResults.id = 'search-results';
    document.body.appendChild(searchResults);

    let searchData = null;

    // 使用绝对路径获取搜索数据
    const rootPath = window.location.protocol + '//' + window.location.host;
    fetch(rootPath + '/search.xml')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            searchData = data;
        })
        .catch(error => {
            console.error('Error loading search data:', error);
        });

    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        if (!query) {
            searchResults.style.display = 'none';
            return;
        }

        if (!searchData) return;

        const entries = searchData.getElementsByTagName('entry');
        const results = [];

        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            const title = entry.getElementsByTagName('title')[0].textContent;
            const content = entry.getElementsByTagName('content')[0].textContent;
            const url = entry.getElementsByTagName('url')[0].textContent;

            if (title.toLowerCase().includes(query) || content.toLowerCase().includes(query)) {
                results.push({ title, content, url });
            }
        }

        displayResults(results);
    });

    function displayResults(results) {
        if (results.length === 0) {
            searchResults.style.display = 'none';
            return;
        }

        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item">
                <a href="${result.url}">
                    <h3>${result.title}</h3>
                    <p>${result.content.substring(0, 150)}...</p>
                </a>
            </div>
        `).join('');

        searchResults.style.display = 'block';
    }

    // 点击其他地方时隐藏搜索结果
    document.addEventListener('click', function(e) {
        if (!searchResults.contains(e.target) && e.target !== searchInput) {
            searchResults.style.display = 'none';
        }
    });
});
