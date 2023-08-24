import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProjectsShowCase from './components/ProjectsShowCase'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class App extends Component {
  state ={
    projectsList:[],
    apiStatus:apiStatusConstants.initial,
    selectInput:'ALL',
  }

  componentDidMount(){
    this.getProjects()
  }

  getProjects = async () => {
   this.setState({apiStatus:apiStatusConstants.loading})
   const {selectInput} = this.state 
   const url= `https://apis.ccbp.in/ps/projects?category=${selectInput}`
   const options = {
    method: 'get'
   }
   const response = await fetch(url,options)
   if(response.ok === true){
    const data=await response.json() 
    const updatedData = data.projects.map(eachProject => ({
      id:eachProject.id,
      imageUrl:eachProject.image_url,
      name:eachProject.name
    }))
    this.setState({projectsList:updatedData,apiStatus:apiStatusConstants.success})
  } else{
    this.setState({apiStatus:apiStatusConstants.fail})
  }
  }

  onChangeSelectInput = event => {
    this.setState({selectInput:event.target.value},this.getProjects)
  }

  loadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {projectsList} = this.state 
    return (
      <div className='success-container'>
        <ul className='ul-container'>
          {projectsList.map(eachItem => (
            <ProjectsShowCase key={eachItem.id} projectDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => (
    <div className="fail-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        className="ima"
        alt="failure view"
      />
      <h1 className="header">Oops! Something Went Wrong</h1>
      <p className="para">
        We cannot seem to find the page you are looking for
      </p>
      <button className="button" type="button" onClick={this.getProjects}>
        Retry
      </button>
    </div>
  )

  renderProjects = () => {
    const {apiStatus} = this.state 
    switch(apiStatus){
      case apiStatusConstants.loading:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.fail:
          return this.failureView()
      default:
        return null
    }
  }

  render(){
    const {selectInput} = this.state 
    return (
      <div>
       <nav className='nav-element'>
         <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            className="website-logo"
            alt="website logo"
          />
       </nav>
       <div>
        <ul>
          <select className='select' value={selectInput} onChange={this.onChangeSelectInput}>
            {categoriesList.map(project => (
              <option key={project.id} value={project.id}>
                {project.displayText}
              </option>
            ))}
          </select>
          {this.renderProjects()}
        </ul>
       </div>
      </div>
    )

}
}
export default App