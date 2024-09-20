import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";



export default function IndexPage(){
const [allplaces,setAllPlaces] = useState([]);
useEffect(() =>{
    axios.get('allplaces').then(response =>{
        setAllPlaces(response.data);
    });
},[]);

    return (
        <div className="IndexContainer">
            {allplaces.length > 0 && allplaces.map(place => (
                <Link to={'/place/'+place._id}>  
                <div className="details">
                    <div className="allplaces">
                    {place.photos?.[0] && (
                        <img src={'https://airbnbapi1.onrender.com/uploads/'+place.photos?.[0]} alt="" />
                    )}
                    </div>
                    <h4>{place.title}</h4>
                    <h5>{place.address}</h5>
                    <div>
                        <span>${place.price} per night</span>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    )
}