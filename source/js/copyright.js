// 监听复制事件
document.addEventListener('copy', function(event) {
    // 创建copyNotice元素
    const copyNotice = document.createElement('div');
    copyNotice.id = 'copy-notice';
    copyNotice.textContent = '复制成功，转载请标记出处';
    copyNotice.style.position = 'fixed';
    copyNotice.style.left = '50%';
    copyNotice.style.top = '80%'; // 可以根据需要调整位置
    copyNotice.style.transform = 'translate(-50%, -50%)';
    copyNotice.style.whiteSpace = 'nowrap';
    copyNotice.style.backgroundColor = '#fff';
    copyNotice.style.border = '1px solid #ddd';
    copyNotice.style.padding = '8px 16px';
    copyNotice.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    copyNotice.style.zIndex = '1000';
    copyNotice.style.fontSize = '14px';
    copyNotice.style.color = '#333';
    copyNotice.style.fontWeight = 'bold';
    copyNotice.style.borderRadius = '4px';
  
    // 将copyNotice添加到文档中
    document.body.appendChild(copyNotice);
  
    // 设置定时器，2秒后移除copyNotice
    setTimeout(function() {
      document.body.removeChild(copyNotice);
    }, 2000);
  });
// 获取所有class为code的元素
const codeElements = document.querySelectorAll('.code');

// 版权信息
const authorMeta = document.querySelector('meta[name="author"]');
const titleMeta = document.querySelector('meta[name="title"]');
const title = titleMeta? titleMeta.content : '';
const author = authorMeta ? authorMeta.content : '';
const url = window.location.href
const copyrightInfo = `© ${author} 保留所有权利。\n 复制自:${title} \nlink" ${url}。`;


codeElements.forEach((codeElement) => {
  // 创建复制按钮
  const copyBtn = document.createElement('button');
  copyBtn.textContent = 'copy';
  copyBtn.className = 'copy-btn night box';
  
  // 将按钮添加到代码块的右上角
  codeElement.insertBefore(copyBtn, codeElement.firstChild);

  // 给按钮添加点击事件
  copyBtn.addEventListener('click', () => {
    // 创建一个临时的textarea元素来复制文本
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = codeElement.querySelector('code').textContent + '\n' + copyrightInfo;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    
    // 在控制台显示版权信息
    console.log(copyrightInfo);

  });
});