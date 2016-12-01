const React = require('react')
const { Match, HashRouter, Redirect } = require('react-router')
const { Home, About, Favorites, FavoriteForm, Favorite } = require('./pages')


const auth = require('./utils/auth')(
  process.env.REACT_APP_ID,
  process.env.REACT_APP_DOMAIN
)

const App = React.createClass({
  getInitialState() {
    return {
        logout: false
    }
  },
  logout(e) {
    auth.logout()
    this.setState({logout: true})
  },
  render() {
    return (
      <HashRouter>
        <div>
          <Match exactly pattern="/" render={(props) => <Home {...props} auth={auth} />} />
          <MatchWhenAuthorized exactly pattern="/favorites" component={Favorites} logout={this.logout} />
          <MatchWhenAuthorized pattern="/favorites/new" component={FavoriteForm} logout={this.logout} />
          <MatchWhenAuthorized pattern="/favorites/:id/show" component={Favorite} logout={this.logout} />
          <MatchWhenAuthorized pattern="/favorites/:id/edit" component={FavoriteForm} logout={this.logout} />
          <MatchWhenAuthorized pattern="/about" component={About} logout={this.logout} />
        </div>
      </HashRouter>
    )
  }
})

const MatchWhenAuthorized = ({component: Component, logout: logout, ...rest}) =>
  <Match {...rest} render={props => auth.loggedIn() ?
    <div>
      <div style={{float: 'right'}}>
        <button
          className="f6 fw1 san francisco grow link dim br-pill ph3 pv2 mb2 dib black bg-grey" href="#0"
          onClick={logout}>Logout</button></div>
      <Component {...props} logout={logout} />
    </div> : <Redirect to="/" />}
  />


module.exports = App
