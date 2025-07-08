Propert 'dataset does not exist' on type 'Element'

if (element instanceof HTMLElement) {
  // trygt og riktig
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.popup-overlay').forEach((popup) => {
      if (popup.style.display === 'flex') {
        popup.style.display = 'none';
      }
    });
  }
});