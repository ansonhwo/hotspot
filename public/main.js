/******************************/
// Globals
/******************************/
const CE = createElement
let query = ''

/******************************/
// DOM Operations
/******************************/
const search = new Vue({

  el: '#search',
  methods: {
    searchEvents: function() {
      // User has entered a search query and initiated a search
      // Validate user query
      console.log('in searchEvents')
      query = document.getElementById('searchbar')
        .value
        .trim()
        .split(' ')
        .filter((word) => {
          return word.replace(/[^A-Za-z0-9\s]/g, '')
        })
        .map((word) => {
          return word.toLowerCase()
        })
        .join('+')
      if (query) {
        // Backend should query the DB using the user query
        // Backend returns query result to frontend
        console.log('/search/events?q=' + query)
        const searchResults =
          fetch('/search/events?q=' + query)
            .then(response => response.json())
            // If query results are non-null, update views
            // Else, inform user that the search yielded no results
            .then(response => console.log(response))
            .catch(err => console.log(err))
      }
      else {
        // Tell user to enter a valid search query
      }
    }
  }

})

/******************************/
// Helper Functions
/******************************/
function createElement(tagName, attributes, children) {
  let element = document.createElement(tagName);

  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }

  for (let index = 0; index < children.length; index++) {
    let child = children[index];

    if (child instanceof Element) {
      element.appendChild(child);
    }
    else {
      element.appendChild(document.createTextNode(child));
    }
  }
  return element;
}
