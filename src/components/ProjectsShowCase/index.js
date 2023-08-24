import './index.css'

const ProjectsShowCase = props => {
  const {projectDetails} = props
  const {name, imageUrl} = projectDetails
  return (
    <li className="app-li">
      <img src={imageUrl} className="pic" alt={name} />
      <p className="name">{name}</p>
    </li>
  )
}

export default ProjectsShowCase