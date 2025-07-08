document.addEventListener('DOMContentLoaded', () => {
  // Håndter åpning av pop-ups
  document.querySelectorAll('.popup-trigger-button').forEach((button) => {
    button.addEventListener('click', () => {
      const targetPopupId = button.dataset.popupTarget;
      const popupToOpen = document.getElementById(targetPopupId);
      if (popupToOpen) {
        popupToOpen.style.display = 'flex';
      }
    });
  });

  document.querySelectorAll('.popup-close-button').forEach((button) => {
    button.addEventListener('click', () => {
      const popupToClose = button.closest('.popup-overlay'); // Finn nærmeste pop-up overlay
      if (popupToClose) {
        popupToClose.style.display = 'none'; // Skjul den
      }
    });
  });

  document.querySelectorAll('.popup-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (event) => {
      // Lukk kun hvis klikket er direkte på overlayen, ikke på innholdet
      if (event.target === overlay) {
        overlay.style.display = 'none';
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.popup-overlay').forEach((popup) => {
        if (popup.style.display === 'flex') {
          popup.style.display = 'none';
        }
      });
    }
  });
});
