import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import JobCard from '../JobCard'
import FilterJobsItem from '../FilterJobsItem'

import './index.css'

const employmentTypesList = [
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

const salaryRangesList = [
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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeSalaryRangeId: '',
    searchInput: '',
    activeEmploymentTypeId: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {
      activeSalaryRangeId,
      searchInput,
      activeEmploymentTypeId,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentTypeId}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        id: job.id,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        title: job.title,
        rating: job.rating,
      }))
      console.log('Updated data:', updatedData)
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      console.error('Error fetching jobs:', response.status)
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value}) // Update searchInput state
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs() // Trigger search on Enter key press
    }
  }

  onSearchButtonClick = () => {
    this.getJobs() // Trigger search on search button click
  }

  onChangeSalaryRangeId = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobs)
  }

  onChangeEmploymentTypeId = activeEmploymentTypeId => {
    this.setState({activeEmploymentTypeId}, this.getJobs)
  }

  onClickRetryButton = () => {
    this.getJobs()
  }

  renderSearchInputBar = () => {
    const {searchInput} = this.state
    return (
      <div className="searching-filtering-container">
        <input
          type="search"
          value={searchInput}
          onChange={this.onChangeSearch}
          onKeyDown={this.onEnterSearchInput}
          placeholder="Search"
          className="search-input"
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-job-btn"
          onClick={this.onSearchButtonClick}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderMobileSearchInputBar = () => {
    const {searchInput} = this.state
    return (
      <div className="mobile-searching-filtering-container">
        <input
          type="search"
          value={searchInput}
          onChange={this.onChangeSearch}
          onKeyPress={this.onEnterSearchInput}
          placeholder="Search"
          className="search-input"
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-job-btn"
          onClick={this.onSearchButtonClick}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderJobsListView = () => {
    const {jobsList} = this.state

    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <div className="all-jobs-container">
        {this.renderSearchInputBar()}
        <ul className="jobs-list">
          {jobsList.map(job => (
            <JobCard jobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-view-container">
        {this.renderSearchInputBar()}
        <div className="no-jobs-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            className="no-jobs-img"
            alt="no jobs"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-description">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      {this.renderSearchInputBar()}
      <div className="jobs-error-view-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="jobs-failure-img"
        />
        <h1 className="job-failure-heading-text">Oops! Something Went Wrong</h1>
        <p className="jobs-failure-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="failure-view-button"
          onClick={this.onClickRetryButton}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="jobs-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeEmploymentTypeId, activeSalaryRangeId} = this.state
    return (
      <div className="all-jobs-section">
        {this.renderMobileSearchInputBar()}
        <FilterJobsItem
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          activeEmploymentTypeId={activeEmploymentTypeId}
          changeEmploymentTypeId={this.onChangeEmploymentTypeId}
          activeSalaryRangeId={activeSalaryRangeId}
          changeSalaryRangeId={this.onChangeSalaryRangeId}
        />
        {this.renderAllJobs()}
      </div>
    )
  }
}

export default AllJobSection
