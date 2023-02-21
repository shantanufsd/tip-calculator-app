const headerElement = document.querySelector(".header");

const pageTitle = headerElement.innerHTML;
const PageTitleUpperCase = pageTitle.toUpperCase();
const firstHalfOfTitle = PageTitleUpperCase.slice(0,4);
const secondHalfOfTitle  = PageTitleUpperCase.slice(4);
const outputString = `<span class="first-half">${firstHalfOfTitle}</span><span class="second-half">${secondHalfOfTitle}</span>`;
console.log(outputString);
headerElement.innerHTML= outputString;
// string.toUpperCase();
// console.log(string);