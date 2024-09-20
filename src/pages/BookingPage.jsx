import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {differenceInCalendarDays, format} from "date-fns";

export default function BookingPage(){

    const {id} = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(()=>{
        if (id){
        axios.get('/bookings').then(response =>{
            const foundBooking = response.data.find(({_id}) => _id === id);
            if (foundBooking) {
                setBooking(foundBooking);
            }
            console.log(foundBooking);
            console.log(response.data);
        });
    }
    },[id]);


    if (!booking) {
        return '';
    }

    return(
        <div className="singlebooking">
            <h2>{booking.place.title}</h2>
            <a target="_blank" href={'https://maps.google.com/?q='+booking.place.address}>{booking.place.address}</a>
            <div className="singlebookingdetails">
                <h2>Your booking information:</h2>
                <div>
                    {format(new Date(booking.checkIn), 'dd-MM-yyyy')} - {format(new Date(booking.checkOut), 'dd-MM-yyyy')}
                </div>
                <div className="bookingdays">
                    <h4>Number of Days : {differenceInCalendarDays( new Date(booking.checkOut) , new Date(booking.checkIn))} </h4>
                    <h4>Total Price : Rs. {booking.price}</h4>
                </div>
            </div>
            <div className="Imagebox">
                <div className="first">
                    {booking.place.photos?.[0] && (
                        <img src={'http://localhost:8000/uploads/'+booking.place.photos[0]} alt="" />
                    )}
                </div>
                <div className="second">
                {booking.place.photos?.[1] && (
                        <img src={'http://localhost:8000/uploads/'+booking.place.photos[1]} alt="" />
                )}
                {booking.place.photos?.[2] && (
                        <img src={'http://localhost:8000/uploads/'+booking.place.photos[2]} alt="" />
                )}
                </div>
            </div>
        </div>
    );
}