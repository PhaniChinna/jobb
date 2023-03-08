import './index.css'

const NotFoundPage = () => (
  <>
    <div className="NotFound-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        className="NotFound-image"
        alt="not found"
      />
      <h1 className="NotFound-Heading">Page Not Found</h1>
      <p className="NotFound-Para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFoundPage
