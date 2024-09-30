import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobsItem = props => {
  const {similarJobItem} = props
  const {
    title,
    rating,
    location,
    jobDescription,
    employmentType,
    companyLogoUrl,
  } = similarJobItem

  return (
    <li className="similar-job-item-card">
      <div className="logo-title-rating">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="job-description-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJobsItem
