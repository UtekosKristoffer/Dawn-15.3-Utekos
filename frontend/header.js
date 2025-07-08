document.addEventListener('DOMContentLoaded', () => {
  const underline = document.querySelector('.header__underline');
  const header = document.querySelector('.header');
  if (!underline || !header) return;

  const updateUnderline = (element) => {
    const rect = element.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    const offset = rect.left - headerRect.left - header.offsetLeft;

    underline.style.left = `${offset}px`;
    underline.style.width = `${rect.width}px`;
    underline.style.opacity = '1';
  };

  document.querySelectorAll('summary.header__menu-item').forEach((item) => {
    const parent = item.closest('details');

    item.addEventListener('mouseenter', () => updateUnderline(item));
    item.addEventListener('mouseleave', () => {
      if (!parent.open) {
        underline.style.opacity = '0';
        underline.style.width = '0';
      }
    });

    item.addEventListener('focus', () => updateUnderline(item));
    item.addEventListener('blur', () => {
      if (!parent.open) {
        underline.style.opacity = '0';
        underline.style.width = '0';
      }
    });

    parent.addEventListener('toggle', () => {
      if (parent.open) {
        updateUnderline(item);
      } else {
        underline.style.opacity = '0';
        underline.style.width = '0';
      }
    });
  });
});
