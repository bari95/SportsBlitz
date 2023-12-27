

import React, {ChangeEvent,useState,useRef} from "react";

interface Props {
    onPhotoChangeC:(event:ChangeEvent<HTMLInputElement>)=> void;
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
            props.onPhotoChangeC(event);
            console.log(selectedPhoto);
        }
    }

    return(
        <div>
            <button onClick={handleImageInput}>Photo
            </button>

                 
                <input 
                 type="file" 
                 accept="image/*"
                 ref={imageInputRef}
                 style={{display:"none"}}
                 onChange={handlePhotoChange} />
       </div>
    )
}