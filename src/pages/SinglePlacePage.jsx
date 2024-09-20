import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";

export default function SinglePlacePage(){

    const {id} = useParams();
    const [place,setPlace] = useState(null);

    useEffect(()=>{
        console.log(id);
        if (!id){
            return; 
        }
        axios.get('/places/'+id).then(response => {
            setPlace(response.data);
        });
    },[id]);

    if (!place) return '';

    return (
        <div className="Singlepage">
            <h2>{place.title}</h2>
            <a target="_blank" href={'https://maps.google.com/?q='+place.address}>{place.address}</a>
            <div className="Imagebox">
                <div className="first">
                    {place.photos?.[0] && (
                        <img src={'http://localhost:8000/uploads/'+place.photos[0]} alt="" />
                    )}
                </div>
                <div className="second">
                {place.photos?.[1] && (
                        <img src={'http://localhost:8000/uploads/'+place.photos[1]} alt="" />
                )}
                {place.photos?.[2] && (
                        <img src={'http://localhost:8000/uploads/'+place.photos[2]} alt="" />
                )}
                </div>
            </div>
            <div className="description">
                <h2>Description</h2>
                {place.description}
            </div>            
            
            <div className="InandOutbox">
                <div className="first">
                    <div className="extrainfo">
                        {place.extraInfo}
                    </div>
                    <div>CheckIn : {place.checkIn}</div>
                    <div>CheckOut : {place.checkOut}</div>
                    <div>MaxGuests : {place.maxGuests}</div>
                </div>
                
                <BookingWidget place={place}/>
            </div>
        </div> 
    )
}