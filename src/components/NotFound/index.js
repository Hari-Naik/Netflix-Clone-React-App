import './index.css'

const NotFound = props => {
  const goToHomePage = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">Lost Your Way ?</h1>
      <p className="not-found-para">
        We are sorry, the page you requested <br />
        could not be found
      </p>
      <p className="not-found-para">Please go back to the homepage</p>
      <button type="button" className="not-found-button" onClick={goToHomePage}>
        Go to Home
      </button>
    </div>
  )
}

export default NotFound
