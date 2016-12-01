const React = require('react')
const { Match, HashRouter, Redirect } = require('react-router')
const { Home, About, Favorites, FavoriteForm, Favorite } = require('./pages')


const auth = require('./utils/auth')(
  process.env.REACT_APP_ID,
  process.env.REACT_APP_DOMAIN
)

const App = React.createClass({
  logout(e) {
    auth.logout()
    // setState ... to pop up login
  },
  render() {
    return (
      <HashRouter>
        <div>
          <Match exactly pattern="/" render={(props) => <Home {...props} auth={auth} />} />
          <MatchWhenAuthorized exactly pattern="/favorites" component={Favorites} />
          <MatchWhenAuthorized pattern="/favorites/new" component={FavoriteForm} />
          <MatchWhenAuthorized pattern="/favorites/:id/show" component={Favorite} />
          <MatchWhenAuthorized pattern="/favorites/:id/edit" component={FavoriteForm} />
          <MatchWhenAuthorized pattern="/about" component={About} />
        </div>
      </HashRouter>
    )
  }
})

const MatchWhenAuthorized = ({component: Component, ...rest}) =>
  <Match {...rest} render={props => auth.loggedIn() ?
    <div>
      <div style={{float: 'right'}}><button onClick={props.logout}>Logout</button></div>
      <Component {...props} />
    </div> : <Redirect to="/" />} />


module.exports = App
