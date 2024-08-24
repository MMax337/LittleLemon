import Logo from '../../assets/big_logo.png'
import './Footer.css'
import NavList from '../Nav/NavList'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt='logo'></img>
      <section>
        <h3>Little Lemon</h3>
        <nav className='footer-nav'>
        <NavList />
        </nav>
      </section>
      <section>
        <h3>Find Us in Social Media</h3>
        <ul className='social-media-list'>
          <li>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
              <FaInstagram />
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h3>Contact</h3>
        <ul>
          <li>Chicago</li>
          <li>123456789</li>
          <li>sample_email@gmail.com</li>
        </ul>
      </section>
    </footer>
  )
}


export default Footer;