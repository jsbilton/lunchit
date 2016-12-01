const React = require('react')
const { Link } = require('react-router')
const data = require('../../utils/data')()
const { map } = require('ramda')
const Favorites = React.createClass({
  getInitialState() {
    return {
      favorites: []
    }
  },
  componentDidMount () {
    data.list('favorites')
      .then(favorites => this.setState({favorites}))

  },
  render () {
    const transform = map(fav => {
      return <div key={fav.id}>
        <Link to={`/favorites/${fav.id}/show`}>
        {fav.name}
        </Link>
      </div>
    })
    return (
      <div>
        <header>
          <h1 className="fw1 san francisco">Favorites</h1>
          <Link to="/favorites/new">New Favorite</Link>
        </header>
        {transform(this.state.favorites)}
      </div>
    )
  }
})

module.exports = Favorites
