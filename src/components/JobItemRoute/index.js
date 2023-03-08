import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {JobItemList} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    id,
    rating,
    title,
  } = JobItemList
  return (
    <Link to={`/jobs/${id}`} className="Link-jobItem">
      <li className="JobItemRoute-container">
        <div className="JobItem1-container">
          <div className="JobItem-tit-rat">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="JobItem-Logo"
              key=""
            />
            <div className="JobItem-rat">
              <p className="JobItem-title">{title}</p>
              <div className="JobItem-Ai-star">
                <AiFillStar className="JobItem-AiFillStar" />
                <p className="JobItem-rating-list">{rating}</p>
              </div>
            </div>
          </div>
          <div className="JobItem-container">
            <ImLocation className="JobItem-ImLocation" />
            <p className="JobItem-Location">{location}</p>
            <BsBriefcaseFill className="JobItem-bsBrief" />
            <p className="JobItem-Employment">{employmentType}</p>
          </div>
          <div className="JobItem-salary">
            <p className="JobItem-Package">{packagePerAnnum}</p>
          </div>

          <hr className="JobLine" />
          <h1 className="JobItem-description">Description</h1>
          <p className="JobItem-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
