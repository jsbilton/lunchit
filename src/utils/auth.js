const Auth0Lock = require('auth0-lock').default

module.exports = function (clientId, domain) {
  const lock = new Auth0Lock(clientId, domain, {} )
  const notify = []
  lock.on('authenticated', _doAuthentication)

  function login() {
    lock.show()
  }

  function _doAuthentication (authResult) {
    setToken(authResult.idToken)
    notify.map(fn => fn(authResult))
  }

  function logout () {
    localStorage.removeItem('id_token')
  }

  function setToken(idToken) {
    localStorage.setItem('id_token', idToken)
  }

  function getToken() {
    return localStorage.getItem('id_token')
  }

  function loggedIn() {
    return !!getToken()
  }

  function subscribe(fn) {
    notify.push(fn)
  }

  return {
    login,
    logout,
    loggedIn,
    setToken,
    getToken,
    subscribe
  }
}
