// Consts
const html = document.querySelector("#HTML-area textarea");
const css = document.querySelector("#CSS-area textarea");
const js = document.querySelector("#js-area textarea");

const go = document.querySelector("#go");

const result = document.querySelector("#result");
const errorConsole = document.querySelector("#errorConsole");

// EventListeners
go.addEventListener("click", runCode);

window.addEventListener("DOMContentLoaded", () => {
  html.innerHTML = `<h1 id="test"> Hello world! </h1>`;
  css.innerHTML = `*{
font-family: sans-serif;
}

.red{
color:red;
}`;
  js.innerHTML = `document.querySelector('#test').classList.add('red');`;

  runCode();
});

// Function
function runCode() {
  try {
    // Saving data in Local Storage
    localStorage.setItem("html", html.value);
    localStorage.setItem("css", css.value);
    localStorage.setItem("js", js.value);

    // Sending HTML, CSS and JS code to the iframe
    result.contentDocument.body.innerHTML = `<style>${localStorage.css}</style> ${localStorage.html}`;
    result.contentWindow.eval(localStorage.js);

    errorConsole.contentDocument.body.innerHTML = "";
  } catch (err) {
    localStorage.setItem("err", err);

    errorConsole.contentDocument.body.innerHTML = `
        <style>
            *{
              color:#f73b3b; 
              font-family:sans-serif;
            }
        </style>
        
        ${localStorage.err}`;
    console.log(err);
  }
}
