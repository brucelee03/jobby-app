import ProfileCard from '../ProfileCard'

import './index.css'

const FilterJobsItem = props => {
  const renderSalaryRangeFiltersList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(salary => {
      const {changeSalaryRangeId, activeSalaryRangeId} = props
      const onClickSalaryRangeItem = () =>
        changeSalaryRangeId(salary.salaryRangeId)

      return (
        <li className="salary-range-item" key={salary.salaryRangeId}>
          <input
            type="radio"
            value={activeSalaryRangeId}
            onChange={onClickSalaryRangeItem}
            id={salary.salaryRangeId}
            className="salary-range-input"
          />
          <label htmlFor={salary.salaryRangeId} className="salary-range">
            {salary.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRangeFilters = () => (
    <div>
      <h1 className="salary-heading">Salary Range</h1>
      <ul className="salary-list">{renderSalaryRangeFiltersList()}</ul>
    </div>
  )

  const renderEmploymentTypeListFilter = () => {
    const {
      employmentTypesList,
      activeEmploymentTypeId,
      changeEmploymentTypeId,
    } = props

    return employmentTypesList.map(employmentType => {
      const onClickEmploymentType = () => {
        let newActiveIds = [...activeEmploymentTypeId] // create a copy of the array

        if (newActiveIds.includes(employmentType.employmentTypeId)) {
          newActiveIds = newActiveIds.filter(
            id => id !== employmentType.employmentTypeId,
          )
        } else {
          newActiveIds.push(employmentType.employmentTypeId)
        }

        changeEmploymentTypeId(newActiveIds)
      }

      return (
        <li
          className="employment-type-item"
          key={employmentType.employmentTypeId}
        >
          <input
            type="checkbox"
            value={activeEmploymentTypeId}
            onChange={onClickEmploymentType}
            id={employmentType.employmentTypeId}
            className="emloyment-type-input"
          />
          <label
            htmlFor={employmentType.employmentTypeId}
            className="employment-type"
          >
            {employmentType.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypeList = () => (
    <>
      <h1 className="employment-type-heading">Type of Employment</h1>
      <ul className="employment-type-list">
        {renderEmploymentTypeListFilter()}
      </ul>
    </>
  )

  return (
    <div className="filters-Jobs-container">
      <ProfileCard />
      <hr className="horizontal-line" />
      {renderEmploymentTypeList()}
      <hr className="horizontal-line" />
      {renderSalaryRangeFilters()}
    </div>
  )
}

export default FilterJobsItem
