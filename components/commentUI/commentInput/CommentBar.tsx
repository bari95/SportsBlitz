

import React, {ChangeEvent,useState,useRef} from "react";

import TextComment from "./TextComment";
import PhotoComment from "./PhotoComment";

interface Props {
    onTextChange:(text:string) => void,
    onPhotoChange:(photo:string) => void,
}

export default function CommentBar ({onTextChange,onPhotoChange}){

    const imageInputRef= useRef <HTMLInputElement> (null)

    const [photo,setPhoto]= useState <File | null > (null);

    const handleTextChange = (str:string) => {
      
        onTextChange(str);
    }

    const handleImageInput=()=>{
        if(imageInputRef.current){
             imageInputRef.current.click()
        }
    }

    const handlePhotoChange = (event:ChangeEvent<HTMLInputElement>) => {
        const selectedPhoto = event.target.files?.[0];
        setPhoto(selectedPhoto);
        if(selectedPhoto){
            onPhotoChange(selectedPhoto);
            console.log(selectedPhoto);
        }
    }

    return (
       <div style={styles.inputField}>
            
              <TextComment onTextChangeC={handleTextChange} />
                 <PhotoComment onPhotoChangeC={handlePhotoChange}/>
            
        </div>
    )

}

const styles = {
      inputField:{

        display:"flex",
            gap:30,
            justifyContent:"flex-end",

            borderRadius:20,
      }
} as { [key :string] : React.CSSProperties }