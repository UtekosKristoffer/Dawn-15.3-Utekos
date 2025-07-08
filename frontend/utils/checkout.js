//@ts-nocheck
const decrement = document.getElementById('decrement');
const increment = document.getElementById('increment');
const quantityDisplay = document.getElementById('quantity-display');
const cartBtn = document.getElementById('cartBtn');

let quantity = 0;

decrement.addEventListener('click', function () {
  quantity--;
  if (quantity === 0) {
    decrement.disabled = true;
    cartBtn.disabled = true;
  }
  quantityDisplay.innerText = quantity;
});

increment.addEventListener('click', function () {
  quantity++;
  decrement.disabled = false;
  quantityDisplay.innerText = quantity;
});

cartBtn.addEventListener('click', function () {
  console.log(`Your order for ${quantity} pairs of shoes is being processed`);
  /*
Challenge:
1. Disable the 'Add to Cart' button when 
   quantity is at zero. Remember: quantity
   will be at zero when the page loads!
*/
});

const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const consentForm = document.getElementById('consent-form');
const modalText = document.getElementById('modal-text');

setTimeout(function () {
  modal.style.display = 'inline';
}, 1500);

modalCloseBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

consentForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const consentFormData = new FormData(consentForm);
  console.log(consentFormData);

  /*   
Challenge: 
1. Create a const to store the user's name and
   use a FormData method to extract the 
   submitted name from the FormData object.
2. Insert the user's name into the HTML string
   that contains the final message we show our
   users.
*/

  mconst modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
const consentForm = document.getElementById('consent-form')
const modalText = document.getElementById('modal-text')

setTimeout(function(){
    modal.style.display = 'inline'
}, 1500)

modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none'
})

consentForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const consentFormData = new FormData(consentForm)
    const fullName = consentFormData.get('fullName')

/*   
Challenge: 
1. Create a const to store the user's name and
   use a FormData method to extract the 
   submitted name from the FormData object.
2. Insert the user's name into the HTML string
   that contains the final message we show our
   users.
*/ 
    
    
    modalText.innerHTML = `
    <div class="modal-inner-loading">
        <img src="images/loading.svg" class="loading">
        <p id="upload-text">Uploading your data to the dark web...</p>
    </div>` 
    
    setTimeout(function(){
        document.getElementById('upload-text').innerText = `
        Making the sale...`
    }, 1500)
    
    
    setTimeout(function(){
        document.getElementById('modal-inner').innerHTML = `
        <h2>Thanks <span class="modal-display-name">${fullName}</span>, you sucker! </h2>
        <p>We just sold the rights to your eternal soul.</p>
        <div class="idiot-gif">
            <img src="images/pirate.gif">
        </div>
    `
    }, 3000)
  
}) 

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const loginFormData = new FormData(loginForm);

  const name = loginFormData.get('astronautName');
  console.log(name);
});

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const loginFormData = new FormData(loginForm);

  const name = loginFormData.get('astronautName');
  const email = loginFormData.get('astronautEmail');
  const password = loginFormData.get('astronautPassword');
  console.log(name, email, password);

  /* 
Challenge: 
1. Log out the email and password from loginFormData.
*/
});

formElem.addEventListener('submit', (e) => {
  // on form submission, prevent default
  e.preventDefault();

  // construct a FormData object, which fires the formdata event
  new FormData(formElem);
});

formElem.addEventListener('formdata', (e) => {
  console.log('formdata fired');

  // Get the form data from the event object
  const data = e.formData;
  for (const value of data.values()) {
    console.log(value);
  }

  // Submit the data via fetch()
  fetch('/formHandler', {
    method: 'POST',
    body: data,
  });
});


       emotionTags: ["scared"],
        isGif: true,
        image: "nervous2.gif",
        alt: "A cat looking scared",
    },
    {
        emotionTags: ["sad"],
        isGif: true,
        image: "sad.gif",
        alt: "A cat looking sad",
    },
]

function getEmotionsArray(cats){
    for (let cat of cats){
/*
Challenge:
1. Add a nested "for of" to log out just 
   the emotions from the emotionTags array 
   in each object.
*/ 
        console.log(cat)
    }
}

getEmotionsArray(catsData)

    const emotionsArray = []
    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            emotionsArray.push(emotion)
        }
        
    }
    console.log(emotionsArray)
}

getEmotionsArray(catsData)


const emotionsArray = []
    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            emotionsArray.push(emotion)
        }
        
    }
    return emotionsArray
}


function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            emotionsArray.push(emotion)
        }
    }
    return emotionsArray
}

console.log(getEmotionsArray(catsData))