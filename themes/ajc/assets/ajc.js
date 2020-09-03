//
// control the menu when it is necessary
//

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

//
// Footnote Handler
//

// function to collect the content of a footnote identified by its reference id
function getFootnoteContent(index) {
    const id = "fn:" + index;
    const fn = document.getElementById(id);
    return fn.innerHTML.trim();
};


// function to insert the footnote content inline after the footnote marker
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// I'm not quite sure what this does at the moment -- we'll sort it later. For now, it provides protection
// against closing a footnote with selected text. (using the variable in the newdiv listener)
var get_selected_text = (function() {
    if (window.getSelection || document.getSelection) {
        return function() {
            var selection = (window.getSelection || document.getSelection)();
            if (selection.text) {
                return selection.text;
            } else {
                return selection.toString();
            }
        };
    } else if (document.selection && document.selection.type !== "Control") {
        return function() {
            return document.selection.createRange().text;
        };
    }
    return function() {
        return '';
    };
})();

// function to handle opening and closing footnotes
function toggleVisible(element){
    const footnoteID = element.id.substring(6);
    const newdivID   = "divid-"+footnoteID;
    if (element.getAttribute("data-vis") === "hidden") {
      element.setAttribute("data-vis","seen");
      element.querySelector("a.footnote-ref").innerHTML = "x";
      document.querySelector("#"+newdivID).classList.remove("is-hidden");
    } else {
      element.setAttribute("data-vis","hidden");
      element.querySelector("a.footnote-ref").innerHTML = footnoteID;
      document.querySelector("#"+newdivID).classList.add("is-hidden");
    }
}

// function for traversing the DOM, creating the inline footnote, and setting up the listeners
function footnoteEnhancer() {
  // check to see if there are any footnotes, if not "DO NOTHING"
  if ( document.querySelector(".footnotes") !== null ) {
          //Select all the footnotes identified by <sup> and the right kind of id
	  const footnoteSups = document.querySelectorAll("sup[id^='fnref:']");
	  
	  // now step through each one
	  footnoteSups.forEach(function(fnref) {
	    const footnoteID = fnref.id.substring(6); // Get the ID that is used throughout
	    fnref.setAttribute("data-vis","hidden");
	    fnref.addEventListener("click", function(event) {
	      event.preventDefault();
	      toggleVisible(fnref);
	    })
	    
	    // setup a div for the inline footnote
	    const newDiv = document.createElement("div"); // create the div
	    newDiv.innerHTML = getFootnoteContent(footnoteID); // insert the footnote content from the generated footnotes
	    newDiv.classList.add("inlinefootnote","is-hidden"); // add style & start hidden
	    newDiv.id = "divid-"+footnoteID; // create a unique id for the div
	    const backRef = newDiv.querySelector(".footnote-backref"); // remove the backlink, not needed for inline use
	    backRef.remove();
	    insertAfter(fnref,newDiv); //now insert the div after the sup
	    newDiv.addEventListener("click", function(event) {
                 if (get_selected_text() === '') { // guard to avoid closing if text is selected.
	             toggleVisible(fnref);
                 }
	    })

	   // if the newDiv contains anchors -- set them up to function rather than closing the div
           var anchorlist = newDiv.querySelectorAll("a");
	   if (anchorlist !== null) {
	      var j;
	      for (j=0; j<anchorlist.length; j++){
	        anchorlist[j].addEventListener('click', function (event) {
	          event.stopPropagation();
	        })
	      }
	    }
	  })
	  
	  document.querySelector(".footnotes").classList.add("is-hidden"); //if the javascript hasn't bombed out, hide the footnotes at the bottom of the document
  }
}

// run the footnote setup
footnoteEnhancer();