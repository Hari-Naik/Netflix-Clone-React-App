import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import './index.css'

function Pagination({totalPages, currentPage, onClickNextPage, onPrevPage}) {
  return (
    <nav className="pagination">
      <button type="button" className="page-link" onClick={() => onPrevPage()}>
        <AiOutlineLeft size={16} color="#fff" />
      </button>
      <p>
        {currentPage} of {totalPages}
      </p>
      <button
        type="button"
        className="page-link"
        onClick={() => onClickNextPage()}
      >
        <AiOutlineRight size={16} color="#fff" />
      </button>
    </nav>
  )
}

export default Pagination
