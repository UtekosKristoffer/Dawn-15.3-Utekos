document.addEventListener('DOMContentLoaded', function () {
  const menuItems = document.querySelectorAll('#desktop-main-menu > li.group');

  // Hjelpefunksjon for å lukke alle manuelt åpnede menyer
  const closeAllManuallyOpenedMenus = () => {
    menuItems.forEach((item) => {
      item.classList.remove('menu-is-open');
    });
  };

  menuItems.forEach((item) => {
    const button = item.querySelector('[data-toggle]');

    // 1. Når du hover over ET HVILKET SOM HELST menyelement...
    item.addEventListener('mouseenter', () => {
      // ...lukk ALLE menyer som kan ha blitt åpnet med et klikk.
      // Dette "nullstiller" tilstanden og lar CSS group-hover ta full kontroll.
      closeAllManuallyOpenedMenus();
    });

    // 2. Logikk for KLIKK (fallback for touch)
    if (button) {
      button.addEventListener('click', (event) => {
        event.preventDefault();

        const parentLi = button.closest('li.group');
        const wasAlreadyOpen = parentLi.classList.contains('menu-is-open');

        // Lukk alle andre menyer først
        closeAllManuallyOpenedMenus();

        // Hvis den ikke allerede var åpen, åpne den.
        // Hvis den var åpen, vil den nå lukkes siden vi kalte closeAll... over.
        if (!wasAlreadyOpen) {
          parentLi.classList.add('menu-is-open');
        }
      });
    }
  });

  // 3. Lukk alt ved klikk utenfor menyområdet
  document.addEventListener('click', function (e) {
    // Hvis klikket skjer utenfor en meny...
    if (!e.target.closest('li.group')) {
      // ...lukk alle manuelt åpnede menyer.
      closeAllManuallyOpenedMenus();
    }
  });
});
