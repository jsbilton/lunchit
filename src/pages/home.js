const React = require('react')
const { Link, Redirect } = require('react-router')

const Home = React.createClass({
  getInitialState() {
    return {
      logout: false,
      picture: 'http://www.fillmurray.com/50/50',
      nickname: 'Jared Bilton'
    }
  },
  componentDidMount() {
    this.props.auth.notify(profile => {
      this.setState({
        picture: profile.picture,
        nickname: profile.nickname
      })
    })
      if (!this.props.auth.loggedIn() && this.props.location.hash.indexOf('access_token') === -1) {
      this.props.auth.login()
    }
    if (localStorage.getItem('profile')) {
      const profile = JSON.parse(localStorage.getItem('profile'))
      this.setState({
        picture: profile.picture,
        nickname: profile.nickname
      })
    }
  },
  render() {
    return (
      <div>
        { this.state.logout
          ? <Redirect to="/about" />
          : null }
        <img
          className="br-100"
          style={{height: '60px'}} src={this.state.picture} />
        {this.state.username}
        <h1 className="fw1 san francisco">LunchIt</h1>
        <h3 className="fw1 san francisco">Menu</h3>
        <ul className="fw1 san francisco list">
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
