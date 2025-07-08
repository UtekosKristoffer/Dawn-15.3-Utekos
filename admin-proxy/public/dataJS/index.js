// const emojis = ['🐥','🐯','🐼']
// console.log(emojis.includes('🐴'))
//@ts-nocheck
const addItemBtn = document.getElementById('add-item-btn');
const itemInput = document.getElementById('item-input');
const list = document.getElementById('list');

const shoppingList = [];

addItemBtn.addEventListener('click', function () {
  /*
Challenge:
1. Add an if else to the event listener's function.
2. Only add an item to the shoppingList array if it 
   is not already in the shoppingList array.
3. If an item is a duplicate, clear the input field
   and log out "no duplicates".
*/
  if (shoppingList.includes(itemInput.value)) {
    console.log('no duplicates');
  } else {
    shoppingList.push(itemInput.value);
    render();
  }
  itemInput.value = '';
});

function render() {
  let html = '';
  for (let item of shoppingList) {
    html += `<li class="list-item">${item}</li>`;
  }
  list.innerHTML = html;
}

render();


import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')

function getEmotionsArray(cats){
    const emotionsArray = []
        
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
/*
Challenge:
1. Refactor this nested for of so that an 
   emotion is only pushed to emotionsArray
   if it is not already in emotionsArray.
   Extra kudos if you use the "logical not"
   operator - feel free to google it!
*/
            emotionsArray.push(emotion)
        }
    }
    return emotionsArray
}


function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)







