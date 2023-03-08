import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileDetails extends Component {
  state = {
    ProfileData: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const ApiURL = 'https://apis.ccbp.in/profile'
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const respone = await fetch(ApiURL, option)
    const data = await respone.json()
    if (respone.ok === true) {
      const ProfileDataList = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        ProfileData: ProfileDataList,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderProfileDataListDetails = () => {
    const {ProfileData} = this.state
    const {name, profileImageUrl, shortBio} = ProfileData
    return (
      <div className="ProfileDetail-container">
        <img
          src={profileImageUrl}
          className="Profile-image-avatar"
          alt="Profile"
        />
        <h1 className="ProfileDetails-Name">{name}</h1>
        <p className="ProfileDetails-ShortBio">{shortBio}</p>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="Render-Loader-ProfileDetails" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureViewData = () => (
    <div className="profile-detail-but">
      <button
        className="ProfileDetail-button-retry"
        type="button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderProfileDataListDetails()
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      case apiStatusConstant.failure:
        return this.renderFailureViewData()

      default:
        return null
    }
  }
}

export default ProfileDetails
