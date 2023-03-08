import {Link} from 'react-router-dom'
import HeaderPage from '../HeaderRoute'

import './index.css'

const HomePage = () => (
  <>
    <HeaderPage />
    <div className="HomePage-container">
      <div className="HomePage1-cont">
        <h1 className="Home-Heading">Find The Job That Fits Your Life</h1>
        <p className="Home-Para">
          Millions of People are Searching for jobs,salary information , company
          reviews.Find the jobs that fits Your abilities and potential
        </p>
        <Link to="/jobs">
          <button className="Home-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default HomePage
