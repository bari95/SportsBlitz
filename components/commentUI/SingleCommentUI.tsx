
import { useState } from "react";
import Image from "next/image";
import {IoIosArrowRoundBack} from 'react-icons/io'
import CommentBar from "./commentInput/CommentBar";





import { comment,commentDataStructure } from "../../utils/comments/comments";
import { reply } from "../../utils/comments/replies";

interface Props{
   comment:commentDataStructure | null,
   showID:(id:string)=>void,
   type:string,
   url:string | null
 }

export default function SingleCommentUI(props:Props){
   

     const [resource,setResource]=useState({
                                       
                                            replies:[new reply("Perfect Nkosi","good picture","20 minutes ago"),new reply("Juma Mgunda","Simba is better team","10s ago")],
                                            likes:0,
                                            showComments:false,
                                          });

   const renderComment=()=>{
      const {comment}=props;

      if(props.type=="text"){
         return (
        <div key={comment.id}>
            <div style={styles.text}>
              <span> {comment.commentor} </span>
              <span> {comment.text} </span>
              <span style={{alignSelf:"flex-end"}}>options </span>
              <span> {comment.time} </span>
              <span style={{alignSelf:"flex-end",marginRight:20}}>options </span>
            </div>
        
           <div style={styles.react}>
              <button onClick={likeButton}>Like</button>
              <button onClick={commentButton}>comment</button>
              <button>share</button>
           </div>
        </div>
         )
      }
      if(props.type == "image" && props.url !== null){
         return (
            <div key={comment.id}>
            <div style={styles.text}>
              
            <h4>{comment.commentor}</h4>
              
            <span>{comment.text}</span>
            <button onClick={sendID} style={{alignSelf:"flex-end",marginRight:20}}>options </button>
            <Image
               priority
               alt="dar es salaam"

               src={props.url}
               sizes="100vw" 
               width={300}
               height={300}
               style={styles.image}
              />
            
           <span> {comment.time}</span>
           
        </div>
        
        <div style={styles.react}>
            <button onClick={likeButton}>Like</button>
            <button onClick={commentButton}>comment</button>
            <button>share</button>
        </div>
        </div>
         )
      }
   }

   const likeButton =()=>{
         resource.likes +=1;
         console.log(resource);
   } 
   const commentButton=()=>{
      const updated={...resource,showComments:!resource.showComments}
      setResource(updated);
   }

   const commentsScreenBack=()=>{
      const updated={...resource,showComments:!resource.showComments}
      setResource(updated);
   }

   const renderReplies=()=>{
      if(resource.replies.length !== 0){
         return (
            <div style={styles.replies}>
               <div style={styles.commentsScreenHeader}>
                 <span style={styles.icons} onClick={commentsScreenBack}>
                   <IoIosArrowRoundBack style={styles.icons} />
                 </span>
                 <span style={styles.icons}>replies</span>
                 <span></span>
               </div>

               {
                  resource.replies.map((reply :commentDataStructure) =>(
                     <div key={reply.id + `${reply.commentor}`}>
                     <div style={styles.text}>
                     <span> {reply.commentor} </span>
                     <span> {reply.text} </span>
                     <span> {reply.time}</span>
                 </div>
                 
                 <div style={styles.react}>
                     <button onClick={()=>{
                        likeButton();
                     }}>Like</button>
                     <button>reply</button>
                     
                 </div>
                 
                 </div>
                  ))
               }
               <CommentBar onTextChange={()=>{}} onPhotoChange={()=>{}}/>
            </div>
         )
      }
   }

   const commentsScreen=()=>{
      if(resource.showComments === true){
         console.log("commentScreen");
           return (
            <div style={styles.commentsScreen}>
              
              <span>
               comments
              </span>
            {renderReplies()}
            </div>
            
           )
      }
   }
   
   const sendID =()=>{
   let id=props.comment.id;
      props.showID(id);
      console.log("id sent",id);
   }

 return (
    
    <div style={styles.commentContainer} key={props.comment.id}>
        {
          resource.showComments ? commentsScreen():renderComment()
        }
    </div>
 )

}

 SingleCommentUI.defaultProps= {
     url:null,
 }

const styles={
    commentContainer:{
       display:"flex",
       flexDirection:"column",
       width:"100%",
       padding:10
    },
    commentsScreen:{
      display:"flex",
      flexDirection:"column",
      border:"1px solid black",
    },
     text:{
        display:"flex",
        flexDirection:"column",
        width:"100%",
        padding:10,
     },
     react:{
        display:"flex",
        justifyContent:"space-between",
        padding:10
     },
     image:{
      width:'90%',
      alignSelf:"center",
      height:'auto',
      borderRadius:30
     },
     replies:{
      position:"fixed",
      top:0,
      left:0,
      bottom:0,
      right:0,
      paddingTop:10,
      backgroundColor:"white"
     },
     commentsScreenHeader:{
      display:"flex",
      justifyContent:"space-between",
      height:40,
      backgroundColor:"rgba(0,0,0,.1)",
     },
     icons:{
      fontSize:"1.2em",
      paddingTop:10,
     }

} as { [key :string] : React.CSSProperties }