function attachGradientEvents() {
  let resultElement = document.getElementById('result');
  let gradientElement = document.getElementById('gradient');

  gradientElement.addEventListener('mousemove', (e) => {
    let currentPosition = e.offsetX;
    let max = e.target.clientWidth;
    resultElement.textContent = `${Math.round((currentPosition / max) * 100)}%`;
  });
}
