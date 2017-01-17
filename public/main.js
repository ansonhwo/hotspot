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
    loginStatus: 'Login',
    loggedIn: false,
    currentUser: ''
  },
  methods: {
    viewLanding: function() {
      landing.active = true
      resultsView.active = false
      detailsView.active = false
    },
    renderLogin: function() {
      if (this.loginStatus === 'Logout') {
        this.loginStatus = 'Login'
        this.loggedIn = false
        this.currentUser = ''
      }
      else {
        loginView.loginDone = false
        loginView.signupDone = false
        loginView.invalidUser = false
        loginView.userExists = false
        loginView.loginActive = true
        loginView.signupActive = false
        loginView.active = true
        this.loggedIn = false
        this.currentUser = ''
      }
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
            resultsView.events = response
            resultsView.convertMetrics()
            resultsView.active = true
          })
          .catch(err => console.log(err))
      }
    }
  }

})

const loginView = new Vue({

  el: '#login-view',
  data: {
    active: false,
    loginDone: false,
    signupDone: false,
    invalidUser: false,
    userExists: false,
    loginActive: true,
    signupActive: false
  },
  methods: {
    close: function() {
      this.active = false
      this.loginDone = false
    },
    validateLogin: function(event) {
      const formData = new FormData(event.target)

      fetch('/login?email=' + formData.get('email'))
        .then(response => response.json())
        .then(([ response ]) => {
          if (response) {
            this.invalidUser = false
            this.loginDone = true
            setTimeout(() => {
              this.close()
              menuBar.loginStatus = 'Logout'
              menuBar.loggedIn = true
              menuBar.currentUser = response.email
            }, 3000)
          }
          else {
            this.invalidUser = true
          }
        })
        .catch(err => console.log(err))
    },
    validateSignup: function(event) {
      const formData = new FormData(event.target)
      const data = {
        name: formData.get('name'),
        email: formData.get('email')
      }

      this.signupRequest(data)
        .then(([ response ]) => {
          if (response) {
            this.userExists = false
            this.signupDone = true
            setTimeout(() => {
              this.close()
              menuBar.loginStatus = 'Logout'
              menuBar.loggedIn = true
              menuBar.currentUser = response
            }, 3000)
          }
        })
        .catch(err => {
          this.userExists = true
        })
    },
    showSignup: function() {
      this.signupActive = true
      this.loginActive = false
    },
    signupRequest: function(data) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }

      return fetch('/signup', options)
              .then(response => response.json())
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
    // Convert search result times and costs to a sensible, readable format
    convertMetrics: function() {
      this.events.map((event) => {
        event.starttimeFormatted = moment(event.starttime).format('ddd, MMMM Do YYYY, h:mm A')
        if (event.costlower === 0) event.costlowerFormatted = 'FREE'
        else event.costlowerFormatted = `$${event.costlower}`
      })
    },
    loadDetails: function(event) {
      // Retrieve id of clicked event
      let target = event.target
      while(!target.classList.contains('piece')) {
        target = target.parentElement
      }

      // Filter out information related to the clicked event
      const eventID = target.dataset.eventid
      const eventInfo = this.events.filter((event) => {
        return event.id == eventID
      })

      // Render clicked event details
      detailsView.details = eventInfo[0]
      detailsView.formatDisplayStrings()
      resultsView.active = false
      detailsView.active = true
    }
  }

})

const detailsView = new Vue({

  el: '#event-details',
  data: {
    active: false,
    details: null,
    dayString: null,
    timeString: null,
    costString: '',
    showTime: false
  },
  methods: {
    // Convert times and costs to a sensible, readable format
    formatDisplayStrings: function() {
      const startDay = moment(this.details.starttime).format('ddd, MMMM Do YYYY')
      const startTime = moment(this.details.starttime).format('h:mm A')
      const endDay = moment(this.details.endtime).format('ddd, MMMM Do YYYY')
      const endTime = moment(this.details.endtime).format('h:mm A')

      if (startDay === endDay) {
        this.showTime = true
        this.dayString = startDay
        if (startTime === endTime) this.timeString = startTime
        else this.timeString = `${startTime} to ${endTime}`
      }
      else {
        this.showTime = false
        this.dayString = `${startDay} ${startTime} to\n ${endDay} ${endTime}`
      }

      if (this.details.costlower === 0) this.costString = 'FREE'
      else if (this.details.costlower === this.details.costupper) this.costString = `$${this.details.costlower}`
      else this.costString = `$${this.details.costlower} - $${this.details.costupper}`
    }
  }

})
