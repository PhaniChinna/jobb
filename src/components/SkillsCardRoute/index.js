import './index.css'

const SkillCard = props => {
  const {skillDetail} = props
  const {imageUrlImage, name} = skillDetail
  return (
    <li className="SkillCard-list">
      <div className="SkillCard">
        <img
          src={imageUrlImage}
          alt={name}
          className="SkillCard-details"
          key="skills"
        />
        <p className="JobDetails-name">{name}</p>
      </div>
    </li>
  )
}

export default SkillCard
