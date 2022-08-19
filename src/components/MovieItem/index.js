import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movie, slickMovieItem, similarMovies} = props

  const classValue = slickMovieItem ? 'movie-item' : 'similar-movies-item'

  return (
    <>
      {similarMovies ? (
        <li className={classValue}>
          <img
            src={movie.backdropPath}
            className="movie-img"
            alt={movie.title}
          />
        </li>
      ) : (
        <Link to={`movies/${movie.id}`} className="nav-link-item">
          <li className={classValue}>
            <img
              src={movie.backdropPath}
              className="movie-img"
              alt={movie.title}
            />
          </li>
        </Link>
      )}
    </>
  )
}

export default MovieItem
