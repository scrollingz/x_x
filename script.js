// --- Load saved background color ---
const savedBg = localStorage.getItem('bg-color');
if (savedBg) {
  document.body.style.background = savedBg;
}

// --- Optional: listen for color input if it exists ---
const bgInput = document.getElementById('bg-color');
if (bgInput) {
  // Set initial value if saved
  bgInput.value = savedBg || bgInput.value;

  // Update background live
  bgInput.addEventListener('input', () => {
    document.body.style.background = bgInput.value;
    localStorage.setItem('bg-color', bgInput.value);
  });
}
