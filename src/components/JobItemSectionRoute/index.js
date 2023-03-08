import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import JobItem from '../JobItemRoute'
import JobFilterGroup from '../JobFilterGroupRoute'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypeList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangeList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobItemSection extends Component {
  state = {
    JobList: [],
    employmentType: [],
    salaryRange: [],
    searchInput: '',
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobListDetails()
  }

  getJobListDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, salaryRange, searchInput} = this.state
    const ApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(ApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const UpdateData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        id: eachJob.id,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        JobList: UpdateData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderJobListDetails = () => {
    const {JobList} = this.state
    return (
      <div>
        <ul className="JobItemDetails-unOrderList">
          {JobList.map(eachJob => (
            <JobItem key={eachJob.id} JobItemList={eachJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobItemSectionLoader = () => (
    <div className="Render-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  changeEmploymentType = type => {
    this.setState(
      prev => ({
        employmentType: [...prev.employmentType, type],
      }),
      this.getJobListDetails,
    )
  }

  changeSalaryRange = salaryRangeId => {
    this.setState(
      {
        salaryRange: salaryRangeId,
      },
      this.getJobListDetails,
    )
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobListDetails()
    }
  }

  renderFailureDetailsView = () => (
    <div className="renderFailureView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="Render-fa-fail-fail">Oops! Something Went Wrong</h1>
      <p className="We-cant-retry">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.getJobListDetails}>
        Retry
      </button>
    </div>
  )

  renderJobDetailsList = () => {
    const {JobList, searchInput} = this.state
    const jobDisplay = JobList.length > 0
    return jobDisplay ? (
      <div className="JobItem-list-card-container">
        <div className="JobItem-section-input">
          <input
            type="search"
            className="Input-jobItem-details"
            value={searchInput}
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onEnterKey}
          />
        </div>
        <div className="Render-search-Button">
          <button
            className="Render-Button"
            type="button"
            data-testid="searchButton"
            onClick={this.getJobListDetails}
          >
            <BsSearch className="Render-BsSearch" />
          </button>
        </div>
        <ul className="JobItemDetails-unOrderList">
          {JobList.map(eachJob => (
            <JobItem key={eachJob.id} JobItemList={eachJob} />
          ))}
        </ul>
      </div>
    ) : (
      <div>
        <div className="JobItem-section-input">
          <input
            type="search"
            className="Input-jobItem-details"
            value={searchInput}
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onEnterKey}
          />
          <div className="Render-search-Button">
            <button
              className="Render-Button-icon"
              type="button"
              data-testid="searchButton"
              onClick={this.getJobListDetails}
            >
              <BsSearch className="Render-BsSearch-icon" />
            </button>
          </div>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
          className="NO-Jobs-failure"
        />
        <h1 className="Render-No-jobs">No Jobs Found</h1>
        <p className="Jobs-Render-Paragraph">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderFinalResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderJobDetailsList()
      case apiStatusConstant.inProgress:
        return this.renderJobItemSectionLoader()
      case apiStatusConstant.failure:
        return this.renderFailureDetailsView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="Render-Jobn">
        <div className="Render-job-Item-filter">
          <JobFilterGroup
            employmentTypeList={employmentTypeList}
            changeEmploymentType={this.changeEmploymentType}
            salaryRangeList={salaryRangeList}
            changeSalaryRange={this.changeSalaryRange}
            searchInput={searchInput}
            onChangeSearchInput={this.onChangeSearchInput}
            getJobListDetails={this.getJobListDetails}
          />
        </div>
        <div className="Render-jo">{this.renderFinalResult()}</div>
      </div>
    )
  }
}

export default JobItemSection
