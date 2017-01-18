/******************************/
// Globals
/******************************/
let query = ''

/******************************/
// DOM related Vue handlers
/******************************/
const menuBar = new Vue({

  el: '#menubar',
  data: {
    users: [],
    host: false
  },
  methods: {
    viewLanding: function() {
      landing.active = true
      resultsView.active = false
      detailsView.active = false
    },
    getUsers: function() {
      fetch('/users')
        .then(response => response.json())
        .then(response => { this.users = response })
        .catch(err => console.log(err))
    },
    setUser: function(event) {
      this.host = event.target.dataset.host
      document.querySelector('#current-user .text').textContent = event.target.innerText
    },
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
            detailsView.active = false
            formatDisplayStrings(response)
            resultsView.events = response
            resultsView.active = true
          })
          .catch(err => console.log(err))
      }
    }
  }

})

const landing = new Vue({

  el: '#landing',
  data: {
    active: true,
    events: []
  },
  methods: {
    getFeatured: function() {
      fetch('/featured')
        .then(response => response.json())
        .then(response => {
          formatDisplayStrings(response)
          this.events = response
        })
        .catch(err => console.log(err))
    },
    loadDetails: function(event) {
      this.active = false
      detailsView.loadDetails(this.events, event)
    }
  }

})

const resultsView = new Vue({

  el: '#results',
  data: {
    active: true,
    events: []
  },
  methods: {
    loadDetails: function(event) {
      this.active = false
      detailsView.loadDetails(this.events, event)
    }
  }

})

const detailsView = new Vue({

  el: '#event-details',
  data: {
    active: false,
    details: null,
    showTime: false
  },
  methods: {
    checkTime: function() {
      if (this.details.startDayFormatted === this.details.endDayFormatted) this.showTime = true
      else this.showTime = false
    },
    loadDetails: function(eventList, event) {
      // Get element that contains the data propety eventid
      const theEvent = getElementData(event.target, 'event')

      // Filter out information related to the clicked event
      const eventInfo = eventList.filter((eventItem) => {
        return eventItem.id == theEvent.dataset.eventid
      })

      // Render clicked event details
      this.details = eventInfo[0]
      this.checkTime()
      this.active = true
    }
  }

})

/******************************/
// Helper Functions
/******************************/
function getElementData(element, data) {
  while (!element.classList.contains(data)) {
    element = element.parentElement
  }

  return element
}

function formatDisplayStrings(eventList) {
  eventList.map((event) => {
    event.startDayFormatted = moment(event.starttime).format('ddd, MMMM Do YYYY')
    event.startTimeFormatted = moment(event.starttime).format('h:mm A')
    event.endDayFormatted = moment(event.endtime).format('ddd, MMMM Do YYYY')
    event.endTimeFormatted = moment(event.endtime).format('h:mm A')
    event.dayString = ''
    event.timeString = ''
    event.costString = ''

    if (event.startDayFormatted === event.endDayFormatted) {
      event.dayString = event.startDayFormatted
      if (event.starttime === event.endtime) event.timeString = event.startTime
      else event.timeString = `${event.startTimeFormatted} to ${event.endTimeFormatted}`
    }
    else {
      event.dayString = `${event.startDayFormatted} ${event.startTimeFormatted} to\n ${event.endDayFormatted} ${event.endTimeFormatted}`
    }

    if (event.costlower === 0) event.costString = 'FREE'
    else if (event.costlower === event.costupper) event.costString = `$${event.costlower}`
    else event.costString = `$${event.costlower} - $${event.costupper}`
  })
}

/******************************/
// Initializations
/******************************/
menuBar.getUsers()
landing.getFeatured()
