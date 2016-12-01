const Auth0Lock = require('auth0-lock').default

module.exports = function (clientId, domain) {
  const lock = new Auth0Lock(clientId, domain, {} )
  lock.on('authenticated', _doAuthentication)

  function login() {
    lock.show()
  }

  let notifyFunction = null

  function _doAuthentication (authResult) {
    setToken(authResult.idToken)
    lock.getUserInfo(authResult.accessToken, function(error, profile) {
      if (error) return console.log(error.message)
      localStorage.setItem('profile', JSON.stringify(profile))
      if (notifyFunction) { notifyFunction(profile)}

    })
  }

  function logout () {
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
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
  function notify (fn) {
    notifyFunction = fn
  }

  return {
    login,
    logout,
    loggedIn,
    setToken,
    getToken,
    notify
  }
}
