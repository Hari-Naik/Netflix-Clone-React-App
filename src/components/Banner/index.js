import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Banner = props => {
  const {apiStatus, movieData, onClickRetry} = props

  const onClickTryAgain = () => {
    onClickRetry()
  }

  const renderBannerView = () => {
    const style = {
      backgroundImage: `url(${movieData?.backdropPath})`,
      backgroundSize: 'cover',
    }

    return (
      <div className="banner" testid="banner" style={style}>
        <div className="banner-content">
          <h2 className="banner-title">{movieData.title}</h2>
          <p className="banner-description">{movieData?.overview}</p>
          <button type="button" className="banner-button">
            Play
          </button>
        </div>
      </div>
    )
  }
  const renderBannerFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-view-img"
        src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426934/homepage-failure_egb8fl.png"
        alt="failure view"
      />
      <p className="failure-description">
        Something went wrong. Please try again.
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="banner-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  const renderBanner = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderBannerView()
      case apiStatusConstants.failure:
        return renderBannerFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return renderBanner()
}

export default Banner
