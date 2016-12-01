const React = require('react')
const { Match, BrowserRouter } = require('react-router')
const { Home, About, Favorites, FavoriteForm, Favorite } = require('./pages')
const Auth = require('./utils/auth-service')

const App = React.createClass({
  render() {
    return (
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={Auth(Home)} />
          <Match exactly pattern="/favorites" component={Favorites} />
          <Match pattern="/favorites/new" component={FavoriteForm} />
          <Match pattern="/favorites/:id/show" component={Favorite} />
          <Match pattern="/favorites/:id/edit" component={FavoriteForm} />
          <Match pattern="/about" component={About} />
        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App
