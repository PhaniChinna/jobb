import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {ImLocation} from 'react-icons/im'

import './index.css'

const SimilarJobs = props => {
  const {SimilarJobsList} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = SimilarJobsList
  return (
    <li className="SimilarJobDetail-container">
      <div className="Similar">
        <div className="Similar-jobs">
          <div className="Similar-jobs-url">
            <img
              src={companyLogoUrl}
              alt="similar job company logo"
              className="Similar-jobs-company-logo"
            />
            <div className="Similar-jobs-ti-rat">
              <p className="Similar-title">{title}</p>
              <div className="Similar-raying">
                <BsStarFill className="BsStarFill" />
                <p className="SimilarJobs-rating">{rating}</p>
              </div>
            </div>
          </div>
          <h1 className="Similar-job-description"> Description</h1>
          <p className="SimilarJob-description">{jobDescription}</p>
          <div className="SimilarJob-location">
            <ImLocation className="ImLocation-similarJobs" />
            <p className="SimilarJobs-location-list">{location}</p>
            <BsBriefcaseFill className="BsBriefCase" />
            <p className="SimilarJob-employment">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
