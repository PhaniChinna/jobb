import ProfileDetails from '../ProfileDetailsRoute'

import './index.css'

const JobFilterGroup = props => {
  const getEmploymentList = () => {
    const {employmentTypeList} = props
    return employmentTypeList.map(employ => {
      const {changeEmploymentType} = props
      const onChangeEmployment = () =>
        changeEmploymentType(employ.employmentTypeId)
      return (
        <li
          className="JobItem-Filter-key-value"
          key={employ.employmentTypeId}
          onChange={onChangeEmployment}
        >
          <input
            className="JobFilterGroup"
            type="checkbox"
            id={employ.employmentTypeId}
            value={employ.employmentTypeId}
          />
          <label
            className="JobFilterGroupList-Route"
            htmlFor={employ.employmentTypeId}
          >
            {employ.label}
          </label>
        </li>
      )
    })
  }
  const renderEmploymentTypeData = () => (
    <div>
      <h1>Type of Employment</h1>
      <ul className="GetSalary">{getEmploymentList()}</ul>
    </div>
  )

  const getSalaryRangeList = () => {
    const {salaryRangeList} = props
    return salaryRangeList.map(salary => {
      const {changeSalaryRange} = props
      const OnchangeSalary = () => changeSalaryRange(salary.salaryRangeId)
      return (
        <li
          className="JobItem-Filter-key-value"
          key={salary.salaryRangeId}
          onChange={OnchangeSalary}
        >
          <input
            type="radio"
            id={salary.salaryRangeId}
            name="salary"
            className="JobFilterGroup"
          />
          <label
            className="JobFilterGroupList-Route"
            htmlFor={salary.salaryRangeId}
          >
            {salary.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div>
      <h1>salary Range</h1>
      <ul className="GetSalary">{getSalaryRangeList()}</ul>
    </div>
  )

  return (
    <div className="JobRouteList">
      <ProfileDetails />
      <hr className="JobItem-FilterGroup-Route-hr" />
      {renderEmploymentTypeData()}
      <hr className="JobItem-FilterGroup-Route-hr-Route" />
      {renderSalaryRange()}
      <hr className="JobItem-FilterGroup-Route-hr-Route" />
    </div>
  )
}

export default JobFilterGroup
