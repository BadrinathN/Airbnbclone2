import axios from "axios";
import { useEffect, useState } from "react";
import {differenceInCalendarDays, format} from "date-fns";
import { Link } from "react-router-dom";

export default function BookingsPage(){

    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    },[]);

    return(
        <div>
            {bookings?.length > 0 && bookings.map(booking => (
                <Link to ={'/account/bookings/'+booking._id} className="BookingContainer"> 
                    <div className="BookingImage">
                    {booking.place.photos?.[0] && (
                        <img src={'https://airbnbapi1.onrender.com/uploads/'+booking.place.photos?.[0]} alt="" />
                    )}
                    </div>
                    <div className="bookingcontainerdetails">
                        <h2>{booking.place.title}</h2>
                        <div>
                        {format(new Date(booking.checkIn), 'dd-MM-yyyy')} - {format(new Date(booking.checkOut), 'dd-MM-yyyy')}
                        </div>
                        <div className="bookingdays">
                            <h4>Number of Days : {differenceInCalendarDays( new Date(booking.checkOut) , new Date(booking.checkIn))} </h4>
                            <h4>Total Price : Rs. {booking.price}</h4>
                        </div>
                    </div>
                </Link>                
            ))}
        </div>
    );
}