function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      emotionsArray.push(emotion);
    }
  }
  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  const emotions = getEmotionsArray(cats);
  console.log(emotions);
  /*
Challenge:
1. Have the new function "renderEmotionsRadios" 
   take in a single parameter. Name that parameter
   "cats". 
2. Inside renderEmotionsRadios, set up a const called 
   "emotions" and set it equals to whatever is returned 
   by calling getEmotionsArray, passing in "cats" as an 
   argument.
3. For now, renderEmotionsRadios should just log out 
   "emotions".
4. Call renderEmotionsRadios passing in catsData.
*/
}

renderEmotionsRadios(catsData);
