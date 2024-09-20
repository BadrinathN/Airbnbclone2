import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({addedPhotos,onChange}){

    const [photoLink,setPhotoLink] = useState('');

    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/uploadbylink',{link: photoLink});
        console.log(addedPhotos);
        onChange(prev =>{
            return[...prev, filename];
        });
        setPhotoLink('');
    }

    return (
        <>
        <div className="photolink">
            <input type="text" placeholder="Add using a link... jpg" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)}/>
            <button onClick={addPhotoByLink} className="photobutton">Add photo</button>                        
        </div>
        <div className="addedphotos">
            {addedPhotos.length > 0 && addedPhotos.map(link =>(
                <div key={link}>
                    <img src={'https://airbnbapi1.onrender.com/uploads/'+link} alt="" />
                </div>
            ))}
        </div></>
    );
}