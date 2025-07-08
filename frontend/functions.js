
let selectedDeliveryMethods = "";

function updateSelectedDeliveryMethod() {
  const checkedRadio = document.querySelector('input[name="deliveryMethod"]:checked');
  if (checkedRadio) {
    selectedDeliveryMethod = checkedRadio.value; // Bruker 'value' attributtet til radio-knappen
  } else {
    selectedDeliveryMethod = ""; // Ingen valgt
  }
  console.log("Valgt leveringsmetode:", selectedDeliveryMethod);
}

function updateDeliveryMethodUI() {
  const deliveryMethodCards = document.querySelectorAll(".delivery-method-card");
  const checkedRadioId = selectedDeliveryMethod; // Bruker den lagrede verdien

  deliveryMethodCards.forEach((card) => {
    if (card.dataset.method === checkedRadioId) {
      card.classList.add("selected");
    } else {
      card.classList.remove("selected");
    }
  });
}


/**
 * Håndterer 'change' hendelsen på radio-knapper for leveringsmetode.
 * @param {Event} event - Change-hendelsen.
 */

setInterval(updateDeliveryMethodUI, 15)

function handleActionButtonsClick() {
  if (selectedDeliveryMethod === "shipping") {
    console.log("Handlingsknapp klikket: Fortsetter med Frakt.");
    // Logikk for frakt
  } else if (selectedDeliveryMethod === "collect") {
    console.log("Handlingsknapp klikket: Fortsetter med Henting.");
    // Logikk for henting
  } else {
    console.log("Handlingsknapp klikket: Ingen leveringsmetode valgt.");
    alert("Vennligst velg en leveringsmetode.");
  }
}


function initializeDeliveryMethodModule() {
  const deliveryOptionsContainer = document.getElementById("delivery-method-options");
  const actionButtons = document.getElementById("actionButtons");

  if (deliveryOptionsContainer) {
    deliveryOptionsContainer.addEventListener('change', handleDeliveryMethodChange);

    deliveryOptionsContainer.addEventListener('click', (event) => {
      const selectedCard = event.target.closest('.delivery-method-card');
      if (selectedCard) {
        const radio = selectedCard.querySelector('input[type="radio"]');
        if (radio && !radio.checked) { // Sjekk bare hvis den ikke allerede er sjekket
          radio.checked = true;

          updateSelectedDeliveryMethod();
          updateDeliveryMethodUI();
        }
      }
    });


    updateSelectedDeliveryMethod();
    updateDeliveryMethodUI();
  }

  if (actionButtons) {
    actionButtons.addEventListener('click', handleActionButtonsClick);
  }
}

// Vent til DOM er fullstendig lastet før initialisering
document.addEventListener('DOMContentLoaded', initializeDeliveryMethodModule);
// post
let deliveryOptionsContainers = ""
const userInputShipping = document.getElementById("shipping")
const userInputCollect = document.getElementById("collect")
const userInputDeliveryDiv = document.getElementById("delivery-method-options")
const actionButtons = document.getElementById("actionButtons")

if (deliveryOptionsContainer) {
  deliveryOptionsContainer.addEventListener('click', (event) => {
    const target = event.target;
    const selectedCard =
      target instanceof HTMLElement ? target.closest('.delivery-method-card') : null;

    if (!(selectedCard instanceof HTMLElement)) return;

    const radio = selectedCard.querySelector('input[type="radio"]');
    if (radio instanceof HTMLInputElement) {
      radio.checked = true;
      updateDeliveryMethodUI();
    }
  });
}

function dataToHandle () { // need to update automatically
    userInputShipping.value = post
    userInputCollect.value = post
    userInput.addEventListener('click', () => {
}

function handleInput()  { // need to update automatically and store data, no initial acton
    post = userInputDeliveryDiv
    post.value = 
    if (post == userInputShipping ){{userInputDeliveryDiv.}}
    
    if (post == userInputShipping )
        else
        userInputCollect

    
}

userInputStorage.oninput = handleInput

 // Click on thumb → change mainSwiper
    const thumbSlides = thumbsWrapper.querySelectorAll('[data-media-id]');
    const swiperSlides = swiperWrapper.querySelectorAll('.swiper-slide img');

    thumbSlides.forEach((thumbEl) => {
      thumbEl.addEventListener('click', () => {
        const mediaId = thumbEl.dataset.mediaId;
        for (let i = 0; i < swiperSlides.length; i++) {
          if (swiperSlides[i].dataset.mediaId === mediaId) {
            this.#swiperInstance.slideTo(i);
            break;
          }
        }
      });
    });
// handleUserInput 
function handleUserInput() {

}

// setHandler
function setHandler(elem) {

}

// validateInput
function validateInput()  {

}

//sendToCart
function sendToCart()  {

}  


//setHandler
function setHandler(elem) {
    
}

//validateInput
function validateInput() {

}
//inputValue = HTMLInputElement.value;
//addEventListener('change', function() 

function handleUserInput() {

}

function createElement() {

}

function handleUserInput() {

}

function createElement() {

}

function setHandler(elem) {

}

// CODE
// createElement
let elem = createElement();
setHandler(elem);

//handleUserInput 
function handleUserInput = () { 

}

 function validateInput() {

}

buttonListener.addEvent('change', function() {

)

//handleclick
function handleclick = () { 
    let post = ''
    const inputDiv =  ();
    const userInput = ();
}

//hasOwnProperty
function inputHandlerCreator(name, score) {
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.id = score;
  return newUser;
}

// 

const newUser = {
  increment: function () {
    this.score++;
  },
  login: function () {
    console.log('login');
  },
};
const user1 = userCreator('Will', 3);
const user2 = userCreator('Tim', 5);
user1.hasOwnProperty('score');

//sendToCart
function sendToCart() {
  let = Object.create(userFunctionStore);
  summaryVariant = name;
  newUser.id = score;
  return newUser;

const newCartTransferer = {
  increment: function () {
    this.score++;
  },
  login: function () {
    console.log('login');
  },
};

//sendToCart
function sendToCart = () {

}




const user1 = userCreator('Will', 3);
const user2 = userCreator('Tim', 5);
user1.hasOwnProperty('score');

/**
 * Initialiserer alle event listeners for leveringsmetode-valg og handlingsknappen.
 * Kalles når DOM er lastet.
 */
function initializeDeliveryMethodModule() {
  const deliveryOptionsContainer = document.getElementById("delivery-method-options");
  const actionButtons = document.getElementById("actionButtons");

  if (deliveryOptionsContainer) {
    deliveryOptionsContainer.addEventListener('click', handleDeliveryMethodClick);
    // Initialiser UI tilstanden ved lasting om det er forhåndsvalgt en radio-knapp
    updateSelectedDeliveryMethod();
    updateDeliveryMethodUI();
  }

  if (actionButtons) {
    actionButtons.addEventListener('click', handleActionButtonsClick);
  }
}

// Vent til DOM er fullstendig lastet før initialisering
document.addEventListener('DOMContentLoaded', initializeDeliveryMethodModule);