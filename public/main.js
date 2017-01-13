/******************************/
// Globals
/******************************/
let query = ''

/******************************/
// DOM related Vue handlers
/******************************/
const search = new Vue({

  el: '#search',
  methods: {
    searchEvents: function() {
      // Streamline the search query
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

      // Check query to ensure that it is a valid search
      if (query) {
        fetch('/search/events?q=' + query)
          .then(response => response.json())
          .then(response => {
            // Show results view and append search query results
            landing.active = false
            resultsView.active = true
            resultsView.events = response
            resultsView.convertTime()
          })
          .catch(err => console.log(err))
      }
    }
  }

})

const logo = new Vue({

  el: '#logo',
  methods: {
    viewLanding: function() {
      landing.active = true
      resultsView.active = false
      document.getElementById('searchbar').textContent = ''
    }
  }

})

const landing = new Vue({

  el: '#landing',
  data: {
    active: true
  }

})

const resultsView = new Vue({

  el: '#results',
  data: {
    active: true,
    events: []
  },
  methods: {
    convertTime: function() {
      this.events.map((event) => {
        event.starttime = moment(event.starttime).format('ddd, MMMM Do YYYY, h:mm A')
      })
    }
  }

})
