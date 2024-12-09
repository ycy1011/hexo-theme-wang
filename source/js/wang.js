// 获取所有包含代码的<td class="code">元素
const codeCells = document.querySelectorAll('figure.highlight td.code');

// 版权信息
const copyrightInfo = `© 版权所有。\n复制自: ${document.title} \n链接: ${window.location.href}。`;

codeCells.forEach(cell => {
  // 创建复制按钮
  const copyBtn = document.createElement('button');
  copyBtn.textContent = 'copy';
  copyBtn.className = 'copy-btn night box';
  copyBtn.style.position = 'absolute';
  copyBtn.style.top = '10px'; // 根据需要调整位置
  copyBtn.style.right = '10px';
  copyBtn.style.zIndex = '10';

  // 将按钮添加到代码单元格中
  cell.appendChild(copyBtn);

  // 给按钮添加点击事件
  copyBtn.addEventListener('click', () => {
    // 创建一个临时的textarea元素来复制文本
    const tempTextArea = document.createElement('textarea');
    tempTextArea.style.position = 'absolute';
    tempTextArea.style.left = '-9999px';
    tempTextArea.value = cell.textContent + '\n' + copyrightInfo;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? '成功' : '失败';
      console.log('复制代码到剪贴板' + msg);
      // 显示复制成功的提示
      const copyNotice = document.createElement('div');
      copyNotice.textContent = 'Copy Success!';
      copyNotice.style.position = 'fixed';
      copyNotice.style.left = '50%';
      copyNotice.style.top = '80%';
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
      document.body.appendChild(copyNotice);
      setTimeout(() => {
        document.body.removeChild(copyNotice);
      }, 2000);
    } catch (err) {
      console.log('复制失败', err);
    }
    document.body.removeChild(tempTextArea);
  });
});