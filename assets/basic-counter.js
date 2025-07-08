let countEl = document.getElementById('count-el');
let restartEl = document.getElementById('restart-el'); // pass in arguments

let count = 0;

function incrementBtn() {
  count += 1;
  countEl.innerText = count;
  console.log(count);
}

function save() {
  console.log('Saved count:', count);
}

function restartBtn() {
  count = 0;
  countEl.innerText = 0;
  console.log('Restarted!');
}

// Eksponer til HTML
window.incrementBtn = incrementBtn;
window.save = save;
window.restartBtn = restartBtn;
