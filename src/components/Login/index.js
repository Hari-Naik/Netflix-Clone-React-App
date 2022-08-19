import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {username, password} = this.state
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')

    localStorage.setItem('username', JSON.stringify(username))
    localStorage.setItem('password', JSON.stringify(password))
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onLogin = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login_container" testid="login">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dgwmfee0i/image/upload/v1659963693/logo_1x_ix9a7m.png"
            alt="login website logo"
            className="logo"
          />
        </Link>
        <form className="login_form" onSubmit={this.onLogin}>
          <h1>Login</h1>
          <div className="input_label">
            <label htmlFor="username">USERNAME</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={this.onChangeUserName}
              placeholder="Enter Username"
            />
          </div>
          <div className="input_label">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Enter Password"
            />
          </div>
          {showErrorMsg && <p className="error_msg">{errorMsg}</p>}
          <button type="submit" className="signIn_button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
