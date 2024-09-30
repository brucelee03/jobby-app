import './index.css'

const SkillsItem = props => {
  const {skill} = props
  const {imageUrl, name} = skill

  return (
    <li className="skill-item">
      <img src={imageUrl} alt={name} className="skill-img" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillsItem
