const pubSub = {
  events: {},

  subscribe(eventName, callback) {
    // Hvis denne "kanalen" (eventName) ikke eksisterer, opprett den.
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    // Legg til lytteren (callback) til kanalen.
    this.events[eventName].push(callback);

    // Returner en "avregistreringsfunksjon" for god praksis og minnehåndtering.
    return () => {
      this.events[eventName] = this.events[eventName].filter(
        (eventCallback) => callback !== eventCallback
      );
    };
  },

  publish(eventName, data) {
    // Hvis kanalen eksisterer og har lyttere...
    if (this.events[eventName]) {
      // ...send meldingen (data) til hver eneste lytter på kanalen.
      this.events[eventName].forEach((callback) => {
        callback(data);
      });
    }
  },
};

// Eksporter objektet slik at andre filer kan importere og bruke det.
export default pubSub;
