const React = require('react')
const { Link } = require('react-router')

const Home = React.createClass({
  componentDidMount() {
    if (!this.props.auth.loggedIn() && this.props.location.hash.indexOf('access_token') === -1) {
      this.props.auth.login()
    }
  },
  render() {
    return (
      <div>
        <h1 className="fw1 san francisco">LunchIt</h1>
        <h3 className="fw1 san francisco">Menu</h3>
        <ul className="fw1 san francisco">
          <li>
            <Link
              to="/favorites"
              className="no-underline">Favorites
            </Link>
          </li>
          <li>
            <a
              className="no-underline"
              href="">Circles
            </a>
          </li>
          <li>
            <Link
              to="/about"
              className="no-underline">About
            </Link>
          </li>
        </ul>
      </div>
    )
  }
})

module.exports = Home
