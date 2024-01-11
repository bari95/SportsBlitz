

import { useState } from "react";
import Image from "next/image";
import {IoIosArrowRoundBack} from 'react-icons/io'
import CommentBar from "./commentInput/commentbar/CommentBar";
import {AiOutlineLike,AiOutlineComment} from "react-icons/ai";
import {SlOptionsVertical} from "react-icons/sl";
import {RiShareForwardLine} from "react-icons/ri";
import { getInitials } from "../../utils/helpers/helpers";

import {FaRegWindowClose} from "react-icons/fa";
import { objectPhotoData } from "./commentInput/photo/PhotoComment";

import { sentTextObj } from "./commentInput/text/TextComment";


import {commentDataStructure } from "../../utils/comments/comments";


interface cmdForOptions{
   id:string,
   cmd:string
}

export interface lastsentObj {
   id:string,
   reply:sentTextObj
}
interface Props{
   comment:commentDataStructure | null,
   showID:(obj:cmdForOptions)=>void,
   fileType:string,
   sendReplyAdded:(d:lastsentObj)=>void
   callback:()=>void
 }



export default function SingleCommentUI(props:Props){
     
    

     const [resource,setResource]=useState({
                                            showReplies:false,
                                            showCommentMenu:false,
                                            menuPosition:{top:0, left:0},
                                            replyPhotoForm:false
                                          });
   

     const showMenuTrue=(event:React.MouseEvent<SVGElement>)=>{
     const buttonPosition=event.currentTarget.getBoundingClientRect();
     let updated={ 
      ...resource,
      menuPosition:{
                    top:buttonPosition.bottom + window.scrollY,            
                    left:buttonPosition.left - window.scrollX - 80 },
      showCommentMenu:true
                  }
      setResource(updated);
     }

    
     
   const showMenuFalse =()=>{
      let updated={...resource,showCommentMenu:true};
      setResource(updated);
   }

   
    const handleReplyAdded=(d:sentTextObj)=>{
      const id=props.comment.id;
      props.sendReplyAdded({id:id,reply:d});
      console.log('reply was received and sent at SingleCommentUI',`id is ${id}`)
     }
     const dropDownMenu=() =>{
                                            
                                     
                            return (
                                        <div>
                                                   
                                           <div style={{
                                                             position:"absolute",
                                                             top:resource.menuPosition.top-20,
                                                             left:resource.menuPosition.left-120,
                                                             zIndex:2,
                                                             padding:10,
                                                             width:"30%",
                                                             borderRadius:10,
                                                             backgroundColor:"rgba(220,220,220,1)"
                                                         }}>
                                                            <div style={{display:"flex",width:"100%"}}>
                                                               <FaRegWindowClose onClick={showMenuFalse} style={{marginLeft:"auto"}} />
                                                            </div>
                                                        <div>option 1</div>
                                                        <div>option 2</div>
                                                        <div onClick={()=>{
                                                          sendID("delete")
                                                        }}>Delete comment</div>
                                                        <div>Edit comment</div>
                                                         </div>
                                                     
                                                 </div>
                                             )
                                         }                                      

   const renderComment=()=>{
      const {comment}=props;

       if(resource.replyPhotoForm===true){
         return null;
       }

      if(props.fileType=="text"){
         return (
        <div key={comment.id}>
            <div style={styles.text}>
             <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",paddingRight:22}}> 
             <span style={styles.name}> {comment.commentor} </span>
              <SlOptionsVertical onClick={showMenuTrue} />
              </div>
              <div style={styles.childRColumnFlex}>
              <span style={styles.text}> {comment.text} </span>
              <span style={styles.time}> {comment.time} </span>
              </div>
              
            </div>
        
           <div style={styles.react}>
           <div style={styles.like}>
            <span>{props.comment.likes} likes</span>
   
               <AiOutlineLike onClick={likeButton} style={styles.icons}/>
         
            </div>
            <div style={styles.like}>
               <span>
                  {props.comment.replies.length} replies</span>
            <AiOutlineComment onClick={commentButton} style={styles.icons} />
            </div>
            <div style={styles.like}>
               <span>share</span>
               <RiShareForwardLine style={styles.icons} />
            </div>
         </div>
        </div>
         )
      }
      if(props.fileType === "image" && props.comment.url !== null){
         return (
            <div key={comment.id}>
            <div style={styles.text}>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",paddingRight:22}}> 
              
              <span style={styles.name}>{comment.commentor}</span>
              
              <SlOptionsVertical onClick={showMenuTrue} />
              </div>
               <div style={styles.childColumnFlex}>
                <span style={styles.text}>{comment.text}</span>
               <span style={styles.time}> {comment.time}</span>
               </div>
              </div>

            <div>
            <Image
               priority
               alt="dar es salaam"
               src={props.comment.url}
               sizes="100vw" 
               width={300}
               height={300}
               style={styles.image}
              />
           </div>
          <div style={styles.react}>
          <div style={styles.like}>
            <span>{props.comment.likes} likes</span>
   
               <AiOutlineLike onClick={likeButton} style={styles.icons}/>
         
           </div>
            <div style={styles.like}>
               <span>{props.comment.replies.length} replies</span>
            <AiOutlineComment onClick={commentButton} style={styles.icons} />
            </div>
            <div style={styles.like}>
               <span>share</span>
               <RiShareForwardLine style={styles.icons} />
            </div>
        </div>
        </div>
         )
      }
   }

   const likeButton =()=>{
        const updated={...resource};
        props.comment.likes +=1;
        setResource(updated);
   } 
   const commentButton=()=>{
      const updated={...resource,showReplies:!resource.showReplies}
      setResource(updated);
   }
 
   const commentsScreenBack=()=>{
      const updated={...resource,showReplies:!resource.showReplies}
      setResource(updated);
   }



   const renderReplies=()=>{
      if(props.fileType==="text"){
         return (

         <div style={styles.replies} className="replies">
             <div style={styles.commentsScreenHeader}>
                 <span style={styles.icons} onClick={commentsScreenBack}>
                   <IoIosArrowRoundBack style={styles.icons} />
                 </span>
            
                 <span></span>
               </div>
                <div key={props.comment.id}>
            <div style={styles.text}>
             <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",paddingRight:22}}> 
             <span style={styles.name}> {props.comment.commentor} </span>
              <SlOptionsVertical onClick={showMenuTrue} />
              </div>
              <div style={styles.childRColumnFlex}>
              <span style={styles.text}> {props.comment.text} </span>
              <span style={styles.time}> {props.comment.time} </span>
              </div>
              
            </div>
        
           <div style={styles.react}>
           <div style={styles.like}>
            <span>{props.comment.likes} likes</span>
   
               <AiOutlineLike onClick={likeButton} style={styles.icons}/>
         
            </div>
            <div style={styles.like}>
               <span>
                  {props.comment.replies.length} replies</span>
            <AiOutlineComment onClick={commentButton} style={styles.icons} />
            </div>
            <div style={styles.like}>
               <span>share</span>
               <RiShareForwardLine style={styles.icons} />
            </div>
        </div>
        </div>
               



               {
                  props.comment.replies.map((reply) =>{
                 
                if(reply.fileType ==="text"){
                
                return (<div key={reply.data.id + `${reply.data.commentor}`}>
                     <div style={styles.text}>
                     <span style={styles.name}> {reply.data.commentor} </span>
                     <span> {reply.data.text} </span>
                     <span> {reply.data.time}</span>
                 </div>
                 
                 <div style={styles.react}>
                     <button onClick={()=>{
                        likeButton();
                     }}>Like</button>
                     <button>reply</button>
                     
                 </div>
                 
                 </div>)
      }
               if(reply.fileType ==="image"){

                  
               return (  
                  <div key={reply.data.id}>

                   
                   <div style={styles.text}>
                   <span> {reply.data.commentor} </span>
                     <span> {reply.data.text} </span>
                     <span> {reply.data.time}</span>
                     </div>
                  <div>
                  <Image
                     priority
                     alt="dar es salaam"
      
                     src={props.comment.url}
                     sizes="100vw" 
                     width={300}
                     height={300}
                     style={styles.imageReply}
                    />
                    </div>
                    
                    </div>
                    )
               }}
      )
               }
               <CommentBar 
                    callback={()=>{}}
                    backCall={()=>{}}
                  
                    sendReplyAdded={handleReplyAdded} 
                    sendCommentAdded={()=>{}} 
                    commentType={"reply"} />
            </div>
         )
      }
      if(props.fileType==="image"){
         return (


            <div style={styles.replies}>
                <div style={styles.commentsScreenHeader}>
                 <span style={styles.icons} onClick={commentsScreenBack}>
                   <IoIosArrowRoundBack style={styles.icons} />
                 </span>
      
                 <span></span>
               </div>
                <div key={props.comment.id}>
            <div style={styles.text}>
             <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",paddingRight:22}}> 
             <span style={styles.name}> {props.comment.commentor} </span>
              <SlOptionsVertical onClick={showMenuTrue} />
              </div>
              <div style={styles.childRColumnFlex}>
              <span style={styles.text}> {props.comment.text} </span>
              <span style={styles.time}> {props.comment.time} </span>
              </div>
              
            </div>
            <div>
            <Image
               priority
               alt="dar es salaam"

               src={props.comment.url}
               sizes="100vw" 
               width={300}
               height={300}
               style={styles.image}
              />
              </div>
              
           <div style={styles.react}>
           <div style={styles.like}>
            <span>{props.comment.likes} likes</span>
   
               <AiOutlineLike onClick={likeButton} style={styles.icons}/>
         
            </div>
            <div style={styles.like}>
               <span>
                  {props.comment.replies.length} replies</span>
            <AiOutlineComment onClick={commentButton} style={styles.icons} />
            </div>
            <div style={styles.like}>
               <span>share</span>
               <RiShareForwardLine style={styles.icons} />
            </div>
        </div>
        </div>
              

               {
                  
                  props.comment.replies.map((reply) =>{
                 
                     if(reply.fileType ==="text"){
                     
                     return (<div key={reply.data.id + `${reply.data.commentor}`}>
                          <div style={styles.text}>
                          <span style={styles.name}> {reply.data.commentor} </span>
                          <span> {reply.data.text} </span>
                          <span> {reply.data.time}</span>
                      </div>
                      
                      <div style={styles.react}>
                          <button onClick={()=>{
                             likeButton();
                          }}>Like</button>
                          <button>reply</button>
                          
                      </div>
                      
                      </div>)
           }
                    if(reply.fileType ==="image"){
     
                       
                    return (  
                       <div key={reply.data.id}>
     
                        
                        <div style={styles.text}>
                        <span style={styles.name}> {reply.data.commentor} </span>
                          <span> {reply.data.text} </span>
                          <span> {reply.data.time}</span>
                          </div>
                       <div>
                       <Image
                          priority
                          alt="dar es salaam"
           
                          src={reply.data.url}
                          sizes="100vw" 
                          width={300}
                          height={300}
                          style={styles.imageReply}
                         />
                         </div>
                         <div style={styles.react}>
                          <button onClick={()=>{
                             likeButton();
                          }}>Like</button>
                          <button>reply</button>
                          
                      </div>
                         
                         </div>
                         )
                    }}
           )
               }
               <CommentBar 
                   callback={()=>{}}
                   backCall={()=>{}}
            
                   commentType={"reply"}  
                   sendReplyAdded={handleReplyAdded} 
                   sendCommentAdded={()=>{}} 
               
                    />
            </div>
         )
      }
   }

   const replyScreen=()=>{
      if(resource.showReplies === true){
         console.log("commentScreen");
         if(resource.replyPhotoForm === true){
         
            return null;
         }
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
    


   const sendID =(cmd:string)=>{
   let id=props.comment.id;
      props.showID({id:id,cmd:cmd});
      console.log("id sent",id);
   }

   

 return (
    
    <div style={styles.commentContainer} key={props.comment.id}>
        {
          resource.showReplies ? replyScreen():renderComment()
        }
      {resource.showCommentMenu && (
          dropDownMenu()
      )}
    </div>
 )

}

 SingleCommentUI.defaultProps= {
     url:null,
 }

const styles={
    commentContainer:{
       display:"flex",
       fontFamily:"san-serif",
       flexDirection:"column",
       width:"100%",
       padding:10,
       
    },
    childRowFlex:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between"
    },
    childColumnFlex:{
      display:"flex",
      flexDirection:"column",
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
        paddingLeft:10,
        fontWeight:500,
        fontFamily:"sans-serif",
        opacity:"0.92",
        fontSize:"92%"

     },
     react:{
        display:"flex",

        justifyContent:"space-between",
        padding:10
     },
     image:{
      width:'96%',
      alignSelf:"center",
      height:'auto',
      borderRadius:30
     },
     imageReply: {
      width:'60%',
      alignSelf:"center",
      height:'auto',
      borderRadius:30
     },
     replies:{
      position:"fixed",
      zIndex:3,
      top:0,
      left:0,
      bottom:0,
      right:0,
      paddingTop:10,
      overflow:"auto",
      scrollbarWidth:"none",
      msOverflowStyle:"none",
      backgroundColor:"white"
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
     },
     icons:{
      fontSize:"1.8em",
     },
     name:{
      fontWeight:"300",
      color:"blue"
     },
     like:{
      display:"flex",
      flexDirection:"column"
     },
     time:{
      fontSize:"80%",
      paddingLeft:10,
      opacity:"0.75"
     }

} as { [key :string] : React.CSSProperties }