import HeaderPage from '../HeaderRoute'

import JobItemSection from '../JobItemSectionRoute'

import './index.css'

const JobPage = () => (
  <>
    <HeaderPage />
    <div className="JobsPage_Route">
      <JobItemSection />
    </div>
  </>
)

export default JobPage
