

import React, {ChangeEvent,useState,useRef} from "react";
import {BiCamera} from "react-icons/bi"

interface Props {
    onPhotoChangeC:(src:string)=> void;
}

export default function PhotoComment(props:Props){
    const imageInputRef= useRef <HTMLInputElement> (null)

    const [photo,setPhoto]= useState <File | null > (null);

    const handleImageInput=()=>{
        if(imageInputRef.current){
             imageInputRef.current.click()
        }
    }

    const handlePhotoChange = (event:ChangeEvent<HTMLInputElement>) => {
        const selectedPhoto = event.target.files?.[0];
        setPhoto(selectedPhoto);
        if(selectedPhoto){
            const blob= new Blob ([selectedPhoto], {type:selectedPhoto.type});
            const src = URL.createObjectURL(blob);
            props.onPhotoChangeC(src);
            console.log(selectedPhoto);
        }
    }

    return(
        <div>
            <BiCamera onClick={handleImageInput} style={{fontSize:"2em"}}/>
            
                <input 
                 type="file" 
                 accept="image/*"
                 ref={imageInputRef}
                 style={{display:"none"}}
                 onChange={handlePhotoChange} />
       </div>
    )
}