const React = require('react')
const data = require('../../utils/data')()
const { Redirect, Link } = require('react-router')

import confirm from 'react-confirm2'

const Favorite = React.createClass({
  getInitialState() {
    return {
      favorite: {
        id: -1,
        name: ''
      },
      removed: false

    }
  },
  componentDidMount() {
    data.get('favorites', this.props.params.id)
    .then(favorite => this.setState({favorite}))
  },
  handleRemove(e) {
    e.preventDefault()
    confirm('Delete? That place is good!', () => {
      data.remove('favorites', this.props.params.id, this.state.favorite)
      .then(res => this.setState({removed: true}))
    })
  },
  render() {
    return(
      <div>
        {this.state.removed
        ? <Redirect to="/favorites" />
        : null }
        <h3>{this.state.favorite.name}</h3>
        <Link
          className="f6 grow link dim br-pill ph3 pv2 mb2 dib white bg-black" href="#0"
          to={`/favorites/${this.state.favorite.id}/edit`}>Edit</Link>
        <a
          className="f6 grow link dim br-pill ph3 pv2 ma2 mb2 dib white bg-black" href="#0"
          onClick={this.handleRemove}>
          Remove
        </a>
        <Link
          className="f6 grow link dim br-pill ph3 pv2 mb2 dib white bg-black" href="#0"
          to='/favorites'>Return</Link>
      </div>
    )
  }
})

module.exports = Favorite
