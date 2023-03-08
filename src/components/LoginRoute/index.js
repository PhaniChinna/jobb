import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    ShowErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccessData = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureData = errorMsg => {
    this.setState({ShowErrorMsg: true, errorMsg})
  }

  onSubmitSuccess = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const UserDetails = {username, password}
    const Url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(UserDetails),
    }
    const response = await fetch(Url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccessData(data.jwt_token)
    } else {
      this.onFailureData(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  OnChangePasswordName = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {username, password, ShowErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="LoginPage-container">
        <div className="LoginPage1-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            className="LoginPage-logo"
            alt="website logo"
          />
          <form
            className="LoginPage-form-container"
            onSubmit={this.onSubmitSuccess}
          >
            <label className="LoginPage-Label-user" htmlFor="username">
              USERNAME
            </label>
            <input
              className="LoginPage-input"
              id="username"
              type="text"
              value={username}
              placeholder="Username"
              onChange={this.onChangeUsername}
            />

            <label className="LoginPage-password" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="LoginPage-pass"
              type="Password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={this.OnChangePasswordName}
            />
            <button className="LoginPage-button" type="submit">
              Login
            </button>
          </form>
          {ShowErrorMsg && <p className="ErrorMsg">*{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default LoginPage
