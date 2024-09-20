import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function BookingWidget({place}){

    const [checkIn , setCheckIn] = useState('');
    const [checkOut , setCheckOut] = useState('');
    const [numberofGuests , setNumberofGuests] = useState(1);
    const [name , setName] = useState('');
    const [phone , setPhone] = useState('');
    const [redirect, setRedirect] = useState('');

    let numberofDays = 0

    if (checkIn && checkOut) {
        numberofDays = differenceInCalendarDays(new Date(checkOut) , new Date(checkIn))
    }

    async function BookthisPlace(){
        const response = await axios.post('/bookings',{
            checkIn,checkOut,numberofGuests,name,phone,
            place:place._id,
            price:numberofDays * place.price,
        });
         const bookingId = response.data._id;
         setRedirect('/account/bookings/');
         console.log(bookingId);
    }   
 
    if(redirect){
        return (<Navigate to = {redirect} />);
    }

    return (
        <div className="second">
            <div className="price" >Price : Rs.{place.price} per Day</div>
            <div className="checkdates">
                <label>Check in : </label>
                <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
            </div>
            <div className="checkdates">
                <label>Check out : </label>
                <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
            </div>
            <div className="numberofguests">
                <label>Number of Guests : </label>
                <input type="number" value={numberofGuests} onChange={ev => setNumberofGuests(ev.target.value)}/>
            </div>
            {numberofDays && (
                <>
                <div className="bookingdetails">
                    <label>Your Name : </label>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)}/>
                </div>
                <div className="bookingdetails"> 
                    <label>Mobile Number : </label>
                    <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)}/>
                </div>
                </>
            )}
            <div>
                <button onClick={BookthisPlace} className="Bookingbutton">
                    Book this Place
                    {numberofDays > 0 && (
                        <span> - Rs.{numberofDays*place.price} </span>
                    )}
                </button>                
            </div>                
        </div>                     
    );
}