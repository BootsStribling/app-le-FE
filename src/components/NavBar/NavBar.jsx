import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <>
      {user ?
        <nav className='btm-nav-content'>
          <ul>
            <li>
              <Link className='link' to="" onClick={handleLogout}>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <span className='nav-span'>Log Out</span>
              </Link>
              <img src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${user.name}`} alt="avatar" />
            </li>
          </ul>
        </nav>
      :
        <nav className='btm-nav-content'>
          <ul>
            <li>
              <Link to="/login" className='link'>
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                <span className='nav-span'>Log In</span>
              </Link>
            </li>
            <li>
              <Link to="/signup" className='link'>
                <i className="fa-solid fa-user-plus"></i>
                <span className='nav-span'>Sign Up</span>
              </Link>
            </li>
          </ul>
        </nav>
      }
    </>
  )
}

export default NavBar
