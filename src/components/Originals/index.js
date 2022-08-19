import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import MovieItem from '../MovieItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const Originals = props => {
  const {movies, apiStatus, title, onClickRetry} = props

  const renderSuccessView = () => (
    <div className="main-container">
      <ul className="slick-container">
        <h1 className="title-category">{title}</h1>
        <Slider {...settings}>
          {movies.map(eachMovie => (
            <MovieItem key={eachMovie.id} movie={eachMovie} slickMovieItem />
          ))}
        </Slider>
      </ul>
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-container">
      <h1 className="title-category align">{title}</h1>
      <div className="failure-view height">
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
          onClick={() => onClickRetry()}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  const renderLoadingView = () => (
    <div className="banner-loader-container">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  const renderViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return <div className="trending-container">{renderViews()}</div>
}

export default Originals
