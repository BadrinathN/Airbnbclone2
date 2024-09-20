import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PhotosUploader from "../PhotosUploader";

export default function PlacesPage(){
    const {action} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirectToPlacesList, setRedirectToPlacesList] = useState(false);

    const [places,setPlaces] = useState([]);
    useEffect(()=>{
        axios.get('/places').then(({data})=>{
            setPlaces(data);
            console.log(data);
        });
    },[]);

    async function addNewPlace(ev) {
        ev.preventDefault();
        await axios.post('/places', {
            title, address, addedPhotos,
            description, extraInfo, checkIn, 
            checkOut, maxGuests, price
        });
        setRedirectToPlacesList(true);
    }

    if (redirectToPlacesList) {
        return (<Navigate to= {'/account/places'}/>)
    }  
    
    return (
        <div>
            {action !== 'new' && (
                <div>
                <div className="newplace">
                <Link to={'/account/places/new'} className="newplaces">
                Add new Place
                </Link>
                </div>
                <div className="ownplace">
                    {places.length > 0 && places.map(place => (
                        <div className="title">
                            <div className="img">
                                {place.photos.length > 0 && (
                                    <img src={'https://airbnbapi1.onrender.com/uploads/'+place.photos[0]} alt="" />
                                )}
                            </div>
                            <div>
                            <h4>{place.title}</h4>
                            <p>{place.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form className="newplaceform" onSubmit={addNewPlace}>
                        <h2>Title</h2>
                        <input type="text" placeholder="Title , Lovely House" value={title} onChange={ev => setTitle(ev.target.value)}/>
                        <h2>Address</h2>
                        <input type="text" placeholder="address" value={address} onChange={ev => setAddress(ev.target.value)}/>
                        <h2>Photos</h2>
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />                       
                        <h2>Description</h2>
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
                        {/* <h2>Perks</h2> */}
                        
                        <h2>Extra Info</h2>
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                        <h2>Check In&Out times</h2>
                        <div className="checktimes">
                            <div>
                                <h3>Check in time</h3>
                                <input type="text" placeholder="14:00" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                            </div>
                            <div>
                                <h3>Check Out time</h3>
                                <input type="text" placeholder="16:00" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                            </div>
                            <div>
                                <h3>Max no. of guests</h3>
                                <input type="text" placeholder="4" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}/>
                            </div>
                            <div>
                                <h3>Price per night</h3>
                                <input type="text" value={price} onChange={ev => setPrice(ev.target.value)}/>
                            </div>
                        </div>
                        <div>
                            <button className="save">Save</button>
                        </div>
                    </form>
                </div>
            )}           
        </div>
    )
}