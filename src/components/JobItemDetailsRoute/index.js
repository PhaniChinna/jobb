import {Component} from 'react'
import Cookies from 'js-cookie'
import {ImLocation} from 'react-icons/im'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import HeaderPage from '../HeaderRoute'
import SkillCard from '../SkillsCardRoute'
import SimilarJobs from '../SimilarJobRoute'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    JobListItemData: {},
    similarJobDataList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobListItemDetails()
  }

  getFormattedSkillData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
  })

  getFarmattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    skills: data.skills.map(eachSkill => ({
      imageUrlImage: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobListItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const ApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(ApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedJobItem = this.getFarmattedData(data.job_details)
      const SimilarUpdatedData = data.similar_jobs.map(eachSimilar =>
        this.getFormattedSkillData(eachSimilar),
      )

      this.setState({
        JobListItemData: updatedJobItem,
        similarJobDataList: SimilarUpdatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobItemDel = () => {
    const {JobListItemData, similarJobDataList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      title,
      rating,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = JobListItemData
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="JobItem-detail-container">
        <div className="JobItemDetail-cont">
          <div className="JobItemDetails-R">
            <img
              src={companyLogoUrl}
              key="name"
              alt="job details company logo"
              className="JobItemDetails-image"
            />
            <div className="jobItemDetails-C">
              <h1 className="JobItem-Title">{title}</h1>
              <div className="JobItemDetail-RR">
                <BsStarFill className="BsStar" />
                <p className="JobItem-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="JobItemDetails-loc-emp">
            <ImLocation className="ImLocation" />
            <p className="JobItem-location">{location}</p>
            <BsBriefcaseFill className="BsBriefcase" />
            <p className="JobItemDetails-EmpType">{employmentType}</p>
          </div>
          <div className="JobItemDetails-PackagePerAnnum">
            <p className="Package-Per-Annum">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="Space-between-cards">
            <h1 className="JobItem-Description">Description</h1>
            <a className="Visit-link" href={companyWebsiteUrl}>
              Visit
              <BiLinkExternal className="Link-to-next-page" />
            </a>
          </div>
          <p className="JobDescription">{jobDescription}</p>
          <h1 className="JobItemDetail-Skill">Skills</h1>
          <ul className="JobItemDetail-unOrderedList">
            <div className="Skills-card-item">
              {skills.map(eachSKill => (
                <SkillCard key={eachSKill.id} skillDetail={eachSKill} />
              ))}
            </div>
          </ul>
          <h1 className="LifeAtACompany">Life at company</h1>
          <div className="Life-company-list">
            <p className="lifeAtCompanyDec">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              key="name"
              className="JobItemDetails-Image"
            />
          </div>
        </div>
        <h1 className="SimilarJobRoute-Heading" key="title">
          Similar Jobs
        </h1>
        <div className="Similar-job-wrap">
          <ul className="Similar-job-list">
            {similarJobDataList.map(eachItem => (
              <SimilarJobs key={eachItem.id} SimilarJobsList={eachItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="Render-failure-view"
      />
      <h1 className="Failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paar">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="JobItem-button"
        type="button"
        onClick={this.getJobListItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="JobItemLoader-list-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" Width="50" />
    </div>
  )

  renderJobsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDel()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <HeaderPage />
        <div className="JobItem-detail-container-list">
          {this.renderJobsView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
