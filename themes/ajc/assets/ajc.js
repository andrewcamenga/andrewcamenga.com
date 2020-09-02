document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function toggleVisible(element){
  element.classList.toggle('is-hidden');
}

function getFootnoteContent(index) {
    const id = "fn:" + index;
    const fn = document.getElementById(id);
    return fn.innerHTML.trim();
};

function footnoteEnhancer() {
  const footnoteSups = document.querySelectorAll("sup[id^='fnref:']");
  footnoteSups.forEach(function(fnref) {
    const footnoteID = fnref.id.substring(6);
    /*const anchor = fnref.querySelector(".footnote-ref");
    anchor.innerHTML = "x";*/
    const newDiv = document.createElement("div");
    newDiv.innerHTML = getFootnoteContent(footnoteID);
    newDiv.classList.add("inlinefootnote","is-hidden");
    newDiv.id = "divid-"+footnoteID;
    const backRef = newDiv.querySelector(".footnote-backref");
    backRef.remove();
    insertAfter(fnref,newDiv);
    newDiv.addEventListener("click", function(event) {
      toggleVisible(this);
    })
    fnref.addEventListener("click", function(event) {
      event.preventDefault();
      toggleVisible(newDiv);
    })
  })
  document.querySelector(".footnotes").classList.add("is-hidden");
}

footnoteEnhancer();