import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";

export default function AccountPage(){
    const {user} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    async function logout(){
        await axios.post('/logout');
        setRedirect(true);
    }

    const {subpage} = useParams();
    console.log(subpage);

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <nav className="navlinks">
                <Link className="link" to={'/account'}>My profile</Link>
                <Link className="link" to={'/account/bookings'}>My Bookings</Link>
                <Link className="link" to={'/account/places'}>My Accomodations</Link>
            </nav>
            {subpage === undefined && (
                <div className='logged'>
                    You are Logged in. <br/>
                    <button onClick={logout}>Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <div>
                    <PlacesPage/>
                </div>
            )}
        </div>
    )
}