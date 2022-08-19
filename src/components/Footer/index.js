import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container" testid="footer">
    <div className="footer-icons-container">
      <button type="button" className="icon-button">
        <a href="https://www.netflix.com/in/" rel="noreferrer" target="_blank">
          <FaGoogle color="#fff" size={18} />
        </a>
      </button>
      <button type="button" className="icon-button">
        <a
          href="https://twitter.com/WeAreNetflix/"
          rel="noreferrer"
          target="_blank"
        >
          <FaTwitter color="#fff" size={18} />
        </a>
      </button>
      <button type="button" className="icon-button">
        <a
          href="https://www.instagram.com/wearenetflix/"
          rel="noreferrer"
          target="_blank"
        >
          <FaInstagram color="#fff" size={18} />
        </a>
      </button>
      <button type="button" className="icon-button">
        <a
          href="https://www.youtube.com/channel/UCWOA1ZGywLbqmigxE4Qlvuw"
          rel="noreferrer"
          target="_blank"
        >
          <FaYoutube color="#fff" size={18} />
        </a>
      </button>
    </div>
    <p>Contact Us</p>
  </div>
)

export default Footer
