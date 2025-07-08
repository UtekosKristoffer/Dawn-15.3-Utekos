document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.size-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.size-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const selected = tab.getAttribute('data-image');
      document.querySelectorAll('.tab-image').forEach((img) => {
        img.classList.toggle('hidden', img.getAttribute('data-size') !== selected);
      });
    });
  });

  document.querySelectorAll('.insul-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.insul-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const selected = tab.getAttribute('data-type');
      document.querySelectorAll('.insul-img').forEach((img) => {
        img.classList.toggle('hidden', img.getAttribute('data-type') !== selected);
      });
    });
  });
});
