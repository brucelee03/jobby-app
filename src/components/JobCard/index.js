import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    id,
    title,
    packagePerAnnum,
    location,
    rating,
    jobDescription,
    employmentType,
    companyLogoUrl,
  } = jobData

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="job-link">
        <div className="logo-title-rating">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-and-rating">
            <h1 className="job-title">{title}</h1>
            <div className="rating-card">
              <FaStar className="rating-star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employment-type-package">
          <div className="location-employment-type">
            <div className="location-card">
              <MdLocationOn className="location-icon" />
              <p className="job-location">{location}</p>
            </div>
            <div className="employment-type-card">
              <BsBriefcaseFill className="job-type-icon" />
              <p className="job-employment-type">{employmentType}</p>
            </div>
          </div>
          <p className="package-per-annum">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobCard
