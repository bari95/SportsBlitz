

import React, {ChangeEvent,useState,useRef} from "react";

import TextComment from "./TextComment";
import PhotoComment from "./PhotoComment";

interface Props {
    onTextChange:(text:string) => void,
    onPhotoChange:(photo:string) => void,
    sendTextReplyReceived:(text:string)=>void,
    type:string,
    
}

export default function CommentBar ({onTextChange,onPhotoChange,sendTextReplyReceived,type}){

    const imageInputRef= useRef <HTMLInputElement> (null)

    const [photo,setPhoto]= useState("");

    const handleTextChange = (str:string) => { 
        onTextChange(str);
    }
    
    const handleTextReplyReceived=(text:string)=>{
        sendTextReplyReceived(text)
    }


    const handleImageInput=()=>{
        if(imageInputRef.current){
             imageInputRef.current.click()
        }
    }

    const handlePhotoChange = (src:string) => {
    
        setPhoto(src);
        if(src){
            onPhotoChange(src);
            console.log(src);
        }
    }

    return (
       <div style={styles.inputField}>
        
              <PhotoComment onPhotoChangeC={handlePhotoChange}/>
              <TextComment type={type} sendTextReply={handleTextReplyReceived} onTextChangeC={handleTextChange} />
            
        </div>
    )

}

const styles = {
      inputField:{

        display:"flex",
            gap:10,
            paddingTop:10,
            paddingBottom:6,
           // width:"100%",
            paddingLeft:100,
            justifyContent:"center",
            borderRadius:20,
            backgroundColor:"rgba(0,10,10,0.1)"
      }
} as { [key :string] : React.CSSProperties }