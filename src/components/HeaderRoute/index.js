import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const HeaderPage = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/')
  }
  return (
    <>
      <div className="HeaderPage-container">
        <div className="HeaderPage1-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="HeaderPage-logo"
              alt="website logo"
            />
          </Link>
          <ul className="HeaderPage-unOrderedList">
            <li className="HeaderPage-Home">
              <Link className="HeaderPage-Home" to="/">
                Home
              </Link>
            </li>
            <li className="HeaderPage-Jobs">
              <Link className="HeaderPage-Jobs" to="/jobs">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            className="HeaderPage-button"
            type="button"
            onClick={onClickLogOut}
          >
            Logout
          </button>
          <div className="HeaderPage-mobile-container">
            <ul className="HeaderPage1-unOrderedList">
              <li>
                <Link to="/">
                  <AiFillHome className="AiFillHome" />
                </Link>
              </li>
              <li>
                <Link to="/jobs">
                  <BsBriefcaseFill className="BsBriefCaseFill" />
                </Link>
              </li>
            </ul>
            <FiLogOut onClick={onClickLogOut} className="FiLogout" />
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(HeaderPage)
