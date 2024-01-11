

import React, {ChangeEvent,useState,useRef} from "react";

import TextComment from "../text/TextComment";
import PhotoComment from "../photo/PhotoComment";
import { objectPhotoData } from "../photo/PhotoComment";
import { commentDataStructure } from "../../../../utils/comments/comments";
import { sentTextObj } from "../text/TextComment";


interface Props {
    sendReplyAdded:(d:sentTextObj)=>void,
    sendCommentAdded:(d:sentTextObj,fn:()=>void)=>void,
    commentType:string,
    callback:()=>void,
    backCall:() => void,
}

export default function CommentBar (props:Props){

    const imageInputRef= useRef <HTMLInputElement> (null)

    const [photo,setPhoto]= useState("");

    const handleCommentAdded = (d:sentTextObj,f:()=>void) => { 
        props.sendCommentAdded(d,()=>{});
    }

    
    
    const handleReplyAdded=(d:sentTextObj)=>{
        props.sendReplyAdded(d);
        console.log("console at sendReplyAdded is here");
    }

   


    const handleImageInput=()=>{
        if(imageInputRef.current){
             imageInputRef.current.click()
        }
    }
    return (
       <div style={styles.inputField}>
              <PhotoComment 
                    callback={props.callback}
                    backCall={props.backCall}
                
                    commentType={props.commentType} 
                    addReply={handleReplyAdded} 
                    addComment={handleCommentAdded}/>
              <TextComment commentType={props.commentType}  addReply={handleReplyAdded} addComment={handleCommentAdded} /> 
        </div>
    )

}

CommentBar.defaultProps={
    replyCallBack:()=>{},
   // callback:()=>{},
  //  backCall:()=>{},

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