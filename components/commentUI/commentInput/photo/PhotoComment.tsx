

import React, {ChangeEvent,useState,useRef} from "react";
import {BiCamera} from "react-icons/bi"
import { comment, commentDataStructure } from "../../../../utils/comments/comments";
import { reply } from "../../../../utils/comments/replies";
import { sentTextObj } from "../text/TextComment";
import {IoIosArrowRoundBack} from 'react-icons/io'

interface photoData {
    url:string,
    caption:string,
}

export interface objectPhotoData {
    type:string,
    photo:photoData,
}

interface Props {
    addComment:(d:sentTextObj,c:()=>void) => void,
    commentType:string,
    addReply:(d:sentTextObj)=> void,
    callback:() => void,
    backCall:() => void,

}


export default function PhotoComment(props:Props){
    const imageInputRef= useRef <HTMLInputElement> (null)

    const [photo,setPhoto]= useState({ url:"",caption:""} || null);
    const [formUI,setFormUI] = useState(false);

    const handleImageInput=()=>{
        if(imageInputRef.current){
             imageInputRef.current.click()
        }
    }

    const handlePhotoChange = (event:ChangeEvent<HTMLInputElement>) => {
        const selectedPhoto = event.target.files?.[0];
    
        if(selectedPhoto){
            const blob= new Blob ([selectedPhoto], {type:selectedPhoto.type});
            const src = URL.createObjectURL(blob);
            const updated= {...photo,url:src};
            setPhoto(updated);
        }
    }

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
       if(props.commentType==="reply"){ 
        let comm = new reply("Massawe",photo.caption,"1hrs ago",photo.url);
        console.log(comm);
        props.addReply({fileType:"image",data:comm});
    }
       if(props.commentType==="comment"){ 
        let comm = new comment("Marry",photo.caption,"23hrs ago",photo.url)
        props.addComment({fileType:"image",data:comm},()=>{console.log("photodata sent")});
       }
       backToComments();
    }
    
       

     const handleCaptionChange= (e:React.ChangeEvent <HTMLTextAreaElement>) =>{
        e.preventDefault();
        const caption=e.currentTarget.value;
        const updated={...photo,caption:caption};
        setPhoto(updated);
        console.log(updated)
     }


    const photoFormBackUI=()=>{
        return (
            <div style={styles.commentsScreenHeader}>
            <span style={styles.icons} onClick={backToComments}>
              <IoIosArrowRoundBack style={styles.icons} />
            </span>
       
            <span> </span>
          </div>
        )
    }

    const photoFormUI = ()=>{
        props.callback();
       
        return (

           
            <form onSubmit={handleSubmit} style={styles.form}>
             
             {photoFormBackUI()}

            <textarea 
            id="commentsTextArea" 
            style={
               {width:"30%",
               borderRadius:10,
               borderWidth:2,
               paddingLeft:2,
               backgroundColor:"none",
           }}  
            value={photo.caption} 
            rows={1}
            cols={30}
            onChange={handleCaptionChange} placeholder="add a caption" ></textarea>

            <input 
                 type="file" 
                 accept="image/*"
               //
                 onChange={handlePhotoChange} />

            <input style={{backgroundColor:"none",borderRadius:10}} type="submit" value={"ok"} />
            </form>
            
        )
        
    }

    const backToComments=()=>{
        setFormUI(false)
        props.backCall()
     }

    const changeFormUI=()=>{
        setFormUI(!formUI)
    }

    return (
        <div>
          { formUI ? (photoFormUI()) : <BiCamera onClick={changeFormUI} style={{fontSize:"2em"}}/> }
       </div>
    )
}


const styles={
    form:{
        position:"absolute",
        top:0,
        left:0,
        bottom:0,
        right:0,
        zIndex:3,
        paddingTop:30,
        paddingLeft:10,
        paddingRight:10,
        display:"flex",
        msFlexDirection:"column",
        flexDirection:"column",
        gap:14,
        backgroundColor:"white",
        
    },
    icons:{
        fontSize:"1.8em"
    },

    commentsScreenHeader:{
        display:"flex",
      justifyContent:"space-between",
      height:40,
      width:80,
      backgroundColor:"rgba(0,0,0,.1)",
      paddingBottom:10,
      borderRadius:10,
      marginBottom:5,
      }
} as { [key :string] : React.CSSProperties }