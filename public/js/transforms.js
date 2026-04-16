/**
 * MAKE CUBE RESPONSIVE
 */

// get the root element, which contains  variables we will update
let root = document.querySelector(':root');
// get the first cube element, so we can extract it's width
const cube = document.querySelector('.photo-cube');
// create object to hold the css object returned by getComputedStyle
let cssObj = {};
// create variable to hold with width of the cube we will use to calculate the translate variables.
let cubeWidth = Number(0);

// callback for page load and screen resize events, which will update variables used by sides of cube
function setTransformAmounts() {
  // get the styles of the parent cube container, then get the width of it from the object
  cssObj = window.getComputedStyle(cube, null);
  cubeWidth = parseInt(cssObj.width);
  // use the width to update the variables used by the sides of the cube
  // the 'positive' translate value is half the width of the cube; 'neg' is the same but negative
  root.style.setProperty('--pos-translate-amount', `${Number((cubeWidth / 2))}px`);
  root.style.setProperty('--neg-translate-amount', `${Number(-(cubeWidth / 2))}px`);
}

// on page load + resize, run the function to update variables used by sides of the cube
addEventListener("load", setTransformAmounts);
addEventListener("resize", setTransformAmounts);
