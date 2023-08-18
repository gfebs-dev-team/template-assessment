scrapper = function () {

  function find(win) {
    let findAttempts = 0
    const findAttemptsLimit = 500

    while (win.API_1484_11 == null && win.parent != null && win.parent != win) {
      findAttempts++
      if (findAttempts > findAttemptsLimit) {
        return null
      }
      win = win.parent
    }

    return win.API_1484_11
  }

  function getAPI(win) {
    let API = null
    if (win.parent != null && win.parent != win) {
      API = find(win.parent)
    }

    if (API == null && win.opener != null) {
      API = find(win.opener)
    }
  }

  function getHandle() {

  }

  function initialize() {

  }

  function terminate() {

  }


  function getData(string) {

  }

  function setData(param, value) {

  }

  function save() {

  }
  
  function debug() {

  }

  return {
    find: find,
    getAPI: getAPI
  }
}
