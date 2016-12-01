const React = require('react')
const { Link } = require('react-router')

const Home = React.createClass({
  render() {
    return (
      <div>
        <h1 className="fw1 san francisco">LunchIt</h1>
        <h3 className="fw1 san francisco">Menu</h3>
        <ul className="fw1 san francisco">
          <li>
            <a className="no-underline" href="/favorites">Favorites</a>
          </li>
          <li>
            <a className="no-underline" href="">Circles</a>
          </li>
          <li>
            <Link to="/about" className="no-underline">About</Link>
          </li>
        </ul>
      </div>
    )
  }
})

module.exports = Home
