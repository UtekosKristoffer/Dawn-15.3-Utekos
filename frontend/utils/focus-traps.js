// utils/focus-trap.js

 const trapFocusHandlers = {
  keydown: (event) => {
    // F.eks. sjekk om Tab, Shift+Tab, og loop fokus innenfor en container
    console.log('Trap focus keydown handler:', event);
  }
};

// Åpne trap: legg til listener
 function addTrapFocusListener() {
  document.addEventListener('keydown', trapFocusHandlers.keydown);
}

// Fjern trap: fjern listener
 function removeTrapFocusListener() {
  document.removeEventListener('keydown', trapFocusHandlers.keydown);
}

export {trapFocusHandlers, addTrapFocusListener, removeTrapFocusListener }