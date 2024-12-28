// 定义一个简单的i18n函数，根据语言返回不同的提示信息
function i18n(key, lang) {
  const messages = {
    'en': {
      'copySuccess': 'Code copied to clipboard!'
    },
    'zh-CN': {
      'copySuccess': '代码已复制到剪贴板！'
    }
  };
  
  // 默认语言为英文
  const defaultLang = 'en';
  
  // 如果没有指定语言或者指定的语言不支持，则使用默认语言
  if (!messages[lang] || !messages[lang][key]) {
    lang = defaultLang;
  }
  
  return messages[lang][key];
}

// 获取浏览器的语言设置
const browserLang = navigator.language || navigator.userLanguage;

// 获取所有带有highlight类名的代码块
const codeBlocks = document.querySelectorAll('.highlight');

codeBlocks.forEach(block => {
  // 创建复制按钮
  const copyButton = document.createElement('button');
  copyButton.textContent = 'Copy';
  copyButton.className = 'copy-btn';
  
  // 将按钮添加到代码块的右上角
  block.appendChild(copyButton);

  // 为按钮添加点击事件
  copyButton.addEventListener('click', () => {
    // 获取代码块中的代码内容，不包括行号
    const codeLines = block.querySelectorAll('.code span.line');
    let codeText = '';
    
    codeLines.forEach(line => {
      // 只添加代码文本，忽略行号
      codeText += line.textContent.trim() + '\n';
    });

    // 将文本复制到剪贴板
    navigator.clipboard.writeText(codeText).then(() => {
      alert(i18n('copySuccess', browserLang));
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  });
});