document.addEventListener('DOMContentLoaded', function() {
  const typedOutput = document.getElementById('typed-output');
  const text = typedOutput ? typedOutput.getAttribute('data-text') : '';
  if (!text) return;

  let index = 0;
  let isDeleting = false;
  let speed = 100;

  function type() {
    const currentText = text.substring(0, index);
    typedOutput.innerHTML = currentText + '<span class="cursor">|</span>';

    if (!isDeleting && index < text.length) {
      index++;
      speed = 100;
    } else if (isDeleting && index > 0) {
      index--;
      speed = 50;
    } else if (!isDeleting && index === text.length) {
      isDeleting = true;
      speed = 1000;
    } else if (isDeleting && index === 0) {
      isDeleting = false;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  type();
});
