document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('areas-of-use');
  if (!el) {
    console.warn('Ingen #areas-of-use div funnet');
    return;
  }

  const raw = el.dataset.origin;
  console.log('Data-origin raw:', raw);

  try {
    const gids = JSON.parse(raw);
    console.log('GID-liste parsed:', gids);
  } catch (err) {
    console.error('Kunne ikke parse JSON:', err);
  }
});
