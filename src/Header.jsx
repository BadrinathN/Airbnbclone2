import airbnblogo from './assets/arrow.svg'
import searchlogo from './assets/search.svg'
import barslogo from './assets/bars.svg'
import userlogo from './assets/user.svg'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from './UserContext'

export default function Header(){
    const {user} = useContext(UserContext);

    return (
        <header>
        <Link to={'/'} className="logo">
          <img src={airbnblogo} alt="airbnb logo" />
          AIRBNB
        </Link>    
        <div className="searchbar">
          <div>Anywhere</div>
          <div className="separator"></div>
          <div>Any week</div>
          <div className="separator"></div>
          <div>Add guests</div>
          <button>
            <img src={searchlogo} alt="search logo" />
          </button>
        </div>
        <div>  
        <Link to={user?'/account':'/login'} className="sign">
          <img src={barslogo} alt="" />
          <img src={userlogo} alt="" />
          {/* {!!user && (
            <div>
                {user.name}
            </div>
          )} */}
        </Link>
        </div>
        </header>
    )
}