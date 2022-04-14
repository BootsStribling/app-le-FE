import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <>
      {user ?
        <nav className='btm-nav-content'>
          <ul>
            <li><Link to="" onClick={handleLogout}>LOG OUT</Link></li>
          </ul>
        </nav>
      :
        <nav className='btm-nav-content'>
          <ul>
            <li>
              <Link to="/login" className=''>
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                <span>Log In</span>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <i className="fa-solid fa-user-plus"></i>
                <span>Sign Up</span>
              </Link>
            </li>
          </ul>
        </nav>
      }
    </>
  )
}

export default NavBar
