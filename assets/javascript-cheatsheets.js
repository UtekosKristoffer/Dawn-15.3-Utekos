// const hvis du aldri kommer til å bytte ut verdien
// let hvis du trenger å endre hvilken verdi variabelen peker til senere.
const heading = document.querySelector('h1');
heading.textContent = 'Velkommen!'; // 
// const betyr at variabelen alltid peker til samme DOM-element, men innholdet i elementet kan fortsatt endres.

// Funksjon vs enkel handling
// Kommer jeg til å bruke denne koden flere ganger, eller ønsker jeg å skille den ut for klarhet?"
// Hvis ja → lag en funksjon.
// Hvis nei (kun én gang, helt enkel handling) → du kan skrive det direkte.

// Uten funksjon
button.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Som funksjon
function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

button.addEventListener('click', toggleDarkMode);

// Eksempel meny-åpning
function toggleMenu() {
  document.querySelector('#menu').classList.toggle('open');
}

document.querySelector('#button').addEventListener('click', toggleMenu);

// FUNCTION BASIC ØVELSER

// Function declaration
function greetUser(name, time) {
  console.log(`Good ${time}, ${name}`);
}

// Call the function
greetUser('Kristoffer', 'morning');

// Function declaration
function main() {
  return 'Hello World';
}

// Call the function
console.log(main());

// Function declaration
function convertUSDtoAUD (USD, AUD) {
return AUD * USD;
}
console.log(convertUSDtoAUD(1000, 1.5));
// Function declaration
function sum(num1, num2) {
  return num1 + num2;
}

// Call the function
console.log(sum(5, 4));

// ULIKE PROPERTIES PÅ DOM-ELEMENTER

// textContent
document.querySelector('#output').textContent = sum(5, 4);

// innerHTML
element.innerHTML = '<strong>Hei</strong>';

// Endre src på et bilde <img id="bilde" src="">
element.src = 'bilde.jpg';

// Endre lenke <a id="link" href="#">Klikk her</a>
document.querySelector('#link').href = 'https://example.com';

//-------------------
// Legge til CSS-klasse
element.classList.add('navn');

// Eksempel <div id="box" class="red"></div>
const box = document.getElementById('box');
box.classList.add('rounded');
// Resultat <div id="box" class="red rounded"></div>

// Eller ved setAttribute
const box = document.getElementById('box');
box.setAttribute('class', 'rounded');
// Resultat <div id="box" class="rounded"></div>
// --------------------------------

//classList
const box = document.getElementById('box');
box.classList.add('rounded');

// Oppdatere en <input>-verdi
// <input id="navn"></input>
document.querySelector('#navn').value = 'Kristoffer';

// EVENT TYPER / METODER
//click	Klikk (venstreklikk)
//dblclick	Dobbelklikk
//mousedown	Når musetast trykkes ned
//mouseup	Når musetast slippes
//mouseenter	Når musen går inn i elementet
//mouseleave	Når musen går ut av elementet
//mouseover	Når musen går over elementet (og evt. barn)
//mousemove	Når musen beveger seg over elementet
//contextmenu	Høyreklikk (viser kontekstmeny)

// Keyboard Events
//keydown	En tast trykkes ned
//keyup	En tast slippes opp
//keypress	(Utgått – bruk keydown i stedet)

// Form Events
//submit	Når et skjema sendes inn
//change	Når inputfeltets verdi endres og mister fokus
//input	Når inputfeltet endres mens du skriver
//focus	Når elementet får fokus
//blur	Når elementet mister fokus
//reset	Når skjemaet nullstilles

// Window/Document Events
//DOMContentLoaded	Når HTML er ferdig lastet (men før bilder osv.)
//resize	Når vinduet endres i størrelse
//scroll	Når brukeren scroller

// Touch Events
//touchstart	Når finger berører skjermen
//touchmove	Når finger flytter seg på skjermen
//touchend	Når finger slippes
//touchcancel	Når touch-interaksjon avbrytes (f.eks. innkommende samtale)

// EKSEMPLER PÅ BRUK AV .getAttribute
//Navigere automatisk til lenken:
window.location.href = lenke.getAttribute('href');

// Bruke det som kilde i et bilde:
const lenke = document.querySelector('#lenke');
const bilde = document.querySelector('img');
bilde.setAttribute('src', lenke.getAttribute('href'));

// Vise verdien i et annet element:
// <a id="lenke" href="https://utekos.no">Gå til Utekos</a>
//<div id="visUrl"></div>// <- Her defineres 'lenke'
document.querySelector('#visUrl').textContent = lenke.getAttribute('href');

// Bruke den som betingelse:
if (lenke.getAttribute('href').includes('utekos')) {
  lenke.classList.add('er-utekos-lenke');
}
// Kombinere med addEventListener:
lenke.addEventListener('click', (e) => {
  e.preventDefault(); // Hindrer vanlig navigering
  const url = lenke.getAttribute('href');
  alert('Du er på vei til: ' + url);
});

// "PIL" CALL-METODE
// STRUKTUR
element.addEventListener("eventtype", () => {
  const verdi = document.querySelector("#id").value;
  document.querySelector("#output").textContent = verdi;
});

// EKSEMPLER
// Som funksjon
function siHei(navn) {
  return `Hei, ${navn}`;
}

// Pil-call metoden
const siHei = (navn) => `Hei, ${navn}`;

const siHei = (navn) => `Hei, ${navn}`;
console.log(siHei("Kristoffer")); // Hei, Kristoffer

// Hente info fra HTML
<input id="navn" />
<button id="hils">Si hei</button>
<p id="output"></p>

const knapp = document.querySelector("#hils");
const input = document.querySelector("#navn");
const output = document.querySelector("#output");

knapp.addEventListener("click", () => {
  const navn = input.value;
  output.textContent = `Hei, ${navn}`;
});

// Fange flere elementer og loop over dem
<button class="valg" data-verdi="A">A</button>
<button class="valg" data-verdi="B">B</button>
<button class="valg" data-verdi="C">C</button>

const knapper = document.querySelectorAll(".valg");

knapper.forEach((knapp) => {
  knapp.addEventListener("click", () => {
    const verdi = knapp.getAttribute("data-verdi");
    console.log(`Du valgte: ${verdi}`);
  });
});

// forEach
liste.forEach((element) => {
  // Gjør noe med hvert element
});

//
const navnListe = ["Kristoffer", "Maren", "Iman"];

navnListe.forEach((navn) => {
  console.log(`Hei, ${navn}`);
});

//
const knapper = document.querySelectorAll(".valg");

knapper.forEach((knapp) => {
  knapp.addEventListener("click", () => {
    console.log("Du trykket på", knapp.textContent);
  });
});

// Tilgang til ekstra info
navnListe.forEach((navn, index, heleListen) => {
  console.log(`${index}: ${navn}`);
});


// CART 
// Åpne cart drawer når noe legges til i kurven – f.eks.:
document.querySelector("#CartDrawer")?.classList.add("is-open");
// Kombiner dette med event eller respons fra cart API.

// Sende kunden cart
window.location.href = window.routes.cart_url;



// Fullt eksempel
document.querySelectorAll('.add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const variantId = button.getAttribute('data-variant-id');
    const sectionId = button.getAttribute('data-section-id');
    addToCart(variantId, sectionId);
  });
});


function addToCart(variantId, sectionId) {
  const quantityInput = document.querySelector(`#quantity-input-${sectionId}`);
  const antall = quantityInput ? parseInt(quantityInput.value, 10) || 1 : 1;
  console.log(`Items w/ ID in cart: ${variantId}, Antall = ${antall}`);


  fetch(window.routes.cart_add_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: [
        {
          id: variantId,
          quantity: antall
        }
      ]
    })
  })
    .then((response) => {
      if (!response.ok) throw new Error('Kunne ikke legge til i kurv');
      return response.json();
    })
    .then((data) => {
      console.log('Lagt til i kurv:', data);
      const cartDrawerElement = document.querySelector('cart-drawer');
      console.log('Cart-drawer funnet?', cartDrawerElement); 
      if (cartDrawerElement && typeof cartDrawerElement.open === 'function') {
        cartDrawerElement.open();
      } else {
        console.warn('Fant ikke cart-drawer eller mangler open()-metode. Navigerer til cart.');
        window.location.href = window.routes.cart_url;
      }
    })
    .catch((error) => {
      console.error('Feil ved legg til i kurv:', error);
    });
}



// --- Strategisk kontrollmodul, under System Architect-veiledning ---
(() => {
  // Bindingspunkter mellom arkitektonisk beslutningssignal og operativ node
  const architectSignal = document.getElementById('dnb-architect-signal');
  const protocolActivator = document.getElementById('critical-core-trigger');

  if (!architectSignal || !protocolActivator) return;

  const state = {
    isMandated: architectSignal.checked
  };

  const render = () => {
    const { isMandated } = state;

    protocolActivator.disabled = !isMandated;
    protocolActivator.textContent = isMandated
      ? 'Operasjon aktivert under Architect-mandat'
      : 'Avventer godkjenning fra System Architect';
    protocolActivator.classList.toggle('architect-mandated', isMandated);
  };

  const handleToggle = () => {
    state.isMandated = architectSignal.checked;
    render();
  };

  architectSignal.addEventListener('change', handleToggle);
  render();
})();











// --- Strategisk kontrollmodul, under System Architect-veiledning ---
(() => {
  // Bindingspunkter mellom arkitektonisk beslutningssignal og operativ node
  const architectSignal = document.getElementById('dnb-architect-signal');
  const protocolActivator = document.getElementById('critical-core-trigger');

  if (!architectSignal || !protocolActivator) return;

  const state = {
    isMandated: architectSignal.checked
  };

  const render = () => {
    const { isMandated } = state;

    protocolActivator.disabled = !isMandated;
    protocolActivator.textContent = isMandated
      ? 'Operasjon aktivert under Architect-mandat'
      : 'Avventer godkjenning fra System Architect';
    protocolActivator.classList.toggle('architect-mandated', isMandated);
  };

  const handleToggle = () => {
    state.isMandated = architectSignal.checked;
    render();
  };

  architectSignal.addEventListener('change', handleToggle);
  render();
})();


// Fil: preview-handler.js (din handleAddToCart funksjon)

async function handleAddToCart(event) {
  event.preventDefault();

  const btn = event.currentTarget;
  const form = btn.closest('form');
  if (!form) return;

  const variantIdInput = form.querySelector('input[name="id"]');
  const quantityInput = form.querySelector('input[name="quantity"]');
  // Type guards for variantIdInput og quantityInput (hvis ikke allerede gjort)
  if (!(variantIdInput instanceof HTMLInputElement)) {
    console.error('Mangler variant ID-input eller er ikke en HTMLInputElement.');
    return;
  }
  if (!(quantityInput instanceof HTMLInputElement)) {
    console.warn('Mangler quantity input eller er ikke en HTMLInputElement. Bruker standardverdi 1.');
    // Ikke return, da vi kan bruke standardverdi.
  }

  const formVariantId = variantIdInput.value;
  const formQuantity = quantityInput ? parseInt(quantityInput.value, 10) : 1;
  const selectedRadio = document.querySelector('input[name="delivery_method"]:checked');
  const selectedDelivery =
    selectedRadio instanceof HTMLInputElement ? selectedRadio.value : undefined;

  if (!formVariantId) {
    console.error('Mangler variant ID.');
    return;
  }

  if (!selectedDelivery) {
    alert('Velg leveringsmetode før du legger til i handleposen.');
    return;
  }

  try {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: formVariantId, quantity: formQuantity }),
    });

    if (!res.ok) throw new Error('Kunne ikke legge til i handleposen.');

    const itemAdded = await res.json();
    const cart = await fetchAndUpdateCartCount(); // Denne oppdaterer allerede cart-boblen

    const cartItem =
      cart?.items?.find((i) => String(i.variant_id) === String(itemAdded.variant_id)) || itemAdded;

    const formatted = {
      productId: String(cartItem.product_id),
      variantId: String(cartItem.variant_id),
      key: cartItem.key,
      title: cartItem.product_title,
      variantTitle: cartItem.variant_title,
      variantOptionsArray: getFormattedVariantOptions(cartItem.options_with_values),
      quantity: cartItem.quantity,
      image: cartItem.image ? cartItem.image.replace(/(\.[^.]*)$/, '_200x$1') : null,
      price: cartItem.price,
      original_price: cartItem.original_price,
      line_price: cartItem.final_line_price || cartItem.line_price,
      url: cartItem.url,
    };

    optionClickCollect(formatted); // Oppdaterer Click & Collect data og popup-visning

    if (selectedDelivery === 'collect') {
      const popup = document.getElementById('ClickCollectPopUp'); // Korrigert ID
      if (popup instanceof HTMLElement) {
        popup.style.display = 'flex';
      }
      setTimeout(() => {
        if (ClickCollectInitialized) {
          updateClickCollectSummary();
        } else {
          initializeClickCollectLogicIfNeeded();
        }
      }, 0);
    } else if (selectedDelivery === 'send') {
      // Åpne cart drawer og Tving den til å oppdatere innhold
      const cartDrawerElement = document.querySelector('cart-drawer'); // Finn <cart-drawer> elementet

      // Sjekk for å sikre at cartDrawerElement er en instans av CartDrawer Web Component
      // og at den har en onCartUpdate metode (som er fra CartItems, men CartDrawer ofte delegerer til)
      // Dette er en litt avansert Type Guard hvis CartDrawer selv ikke er en 'CartItems'
      if (cartDrawerElement instanceof HTMLElement) {
        // En mer robust måte å tvinge oppdatering i Shopify er ofte å dispatche en custom event
        // som lytteren i cart-drawer.js eller cart.js reagerer på.
        // Først, sjekk om 'cart-drawer' Web Componenten har en 'renderContents' metode ELLER
        // om det er en 'cart-items' komponent inni den som har 'onCartUpdate'.

        // Antar at 'cart-drawer' elementet (som er HTMLElement) også er en instans av CartDrawer classen,
        // og kan derfor ha metoder definert i den classen.
        const cartItemsInDrawer = cartDrawerElement.querySelector('cart-items') || cartDrawerElement.querySelector('cart-drawer-items');

        if (cartItemsInDrawer instanceof HTMLElement && typeof (cartItemsInDrawer).onCartUpdate === 'function') {
            // Kall onCartUpdate for å tvinge oppdatering av innholdet i drawer'en
            await (cartItemsInDrawer).onCartUpdate(); // Bruk await her for å vente på oppdateringen
        } else {
            console.warn('Could not find a suitable cart update mechanism in cart drawer. Falling back to simple open.');
        }

        // Send 'cart:open' event ETTER at innholdet er oppdatert, eller i det minste i samme runde
        document.dispatchEvent(new CustomEvent('cart:open'));

        // Valgfritt: Hvis du fortsatt har en global icon.click() som erstatning:
        const icon = document.querySelector('[data-cart-toggle], .header__icon--cart');
        if (icon instanceof HTMLElement && typeof icon.click === 'function') {
          // icon.click(); // Dette er ofte ikke nødvendig hvis 'cart:open' fungerer
        }
      }
    }
  } catch (error) {
    console.error('Feil under håndtering av "Add to Cart":', error);
  }
}
