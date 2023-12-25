
import React, {ChangeEvent,useState,useRef} from "react";

interface Props {
    onTextChange:(text:string) => void,
    onPhotoChange:(photo:string) => void
}

export default function CommentBar ({onTextChange,onPhotoChange}){

    const imageInputRef= useRef <HTMLInputElement> (null)

    const [text,setText] = useState("");
    const [photo,setPhoto]= useState <File | null > (null);

    const handleTextChange = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        onTextChange(event.target.value);
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
        }
    }

    return (
        <div style={styles.inputField}>
            
                <textarea 
                 id="commentsTextArea" 
                 style={
                    {width:"30%",
                    borderRadius:10}
                    } 
                 
                 value={text} 
                 rows={2}
                 cols={40}
                 onChange={handleTextChange} />

                 <button onClick={handleImageInput}> Photo</button>
                 
                <input 
                 type="file" 
                 accept="image/*"
                 ref={imageInputRef}
                 style={{display:"none"}}
                 
                 onChange={handlePhotoChange} />
            
        </div>
    )

}

const styles = {
      inputField:{
            display:"flex",
            justifyContent:"space-around",
            borderRadius:20,
      }
} as { [key :string] : React.CSSProperties }