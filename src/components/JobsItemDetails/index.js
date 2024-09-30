import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'
import SkillsItem from '../SkillsItem'
import SimilarJobsItem from '../SimilarJobsItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsItemDetails extends Component {
  state = {
    jobData: null,
    similarJobsItemLists: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsItemDetails()
  }

  getJobsItemDetails = async () => {
    const {match} = this.props
    const jobCardId = match.params.id
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${jobCardId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.job_details.id,
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        location: fetchedData.job_details.location,
        rating: fetchedData.job_details.rating,
        title: fetchedData.job_details.title,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        jobDescription: fetchedData.job_details.job_description,
        skills: fetchedData.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: fetchedData.job_details.life_at_company.description,
          imageUrl: fetchedData.job_details.life_at_company.image_url,
        },
        similarJobs: fetchedData.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
      }

      this.setState({
        jobData: updatedData,
        similarJobsItemLists: updatedData.similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetryButton = () => {
    this.getJobsItemDetails()
  }

  renderLoadingView = () => (
    <div data-testid='loader' className='job-details-loader-container'>
      <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
    </div>
  )

  renderFailureView = () => (
    <>
      <div className='jobs-item-detail-error-container'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
          alt='failure view'
          className='job-error-img'
        />
        <h1 className='job-error-title'>Oops! Something Went Wrong</h1>
        <p className='job-error-text'>
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type='button'
          onClick={this.onClickRetryButton}
          className='job-item-retry-btn'
        >
          Retry
        </button>
      </div>
    </>
  )

  renderJobsItemDetails = () => {
    const {jobData, similarJobsItemLists} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      location,
      rating,
      title,
      packagePerAnnum,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobData

    return (
      <div className='job-item-details-container'>
        <div className='job-item-details-card'>
          <div className='logo-title-rating'>
            <img
              src={companyLogoUrl}
              alt='job details company logo'
              className='company-logo'
            />
            <div className='title-and-rating'>
              <h1 className='job-title'>{title}</h1>
              <div className='rating-card'>
                <FaStar className='rating-star-icon' />
                <p className='rating'>{rating}</p>
              </div>
            </div>
          </div>
          <div className='location-employment-type-package'>
            <div className='location-employment-type'>
              <div className='location-card'>
                <MdLocationOn className='location-icon' />
                <p className='job-location'>{location}</p>
              </div>
              <div className='employment-type-card'>
                <BsBriefcaseFill className='job-type-icon' />
                <p className='job-employment-type'>{employmentType}</p>
              </div>
            </div>
            <p className='package-per-annum'>{packagePerAnnum}</p>
          </div>
          <hr className='horizontal-line' />
          <div className='job-description-and-company-website'>
            <h1 className='job-item-heading'>Description</h1>
            <a href={companyWebsiteUrl} className='website-link'>
              Visit <FaExternalLinkAlt className='website-link-img' />
            </a>
          </div>
          <p className='job-item-description'>{jobDescription}</p>
          <h1 className='skills-heading'>Skills</h1>
          <ul className='skills-list'>
            {skills.map(eachSkill => (
              <SkillsItem key={eachSkill.name} skill={eachSkill} />
            ))}
          </ul>
          <h1 className='life-at-company-heading'>Life at Company</h1>
          <div className='life-at-company-card'>
            <p className='life-at-company-description'>
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt='life at company'
              className='life-at-company-img'
            />
          </div>
        </div>
        <h1 className='similar-jobs-heading'>Similar Jobs</h1>
        <ul className='similar-jobs-list'>
          {similarJobsItemLists.map(eachJobItem => (
            <SimilarJobsItem
              key={eachJobItem.id}
              similarJobItem={eachJobItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderAllJobsItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderAllJobsItemDetails()}
      </div>
    )
  }
}

export default withRouter(JobsItemDetails)
