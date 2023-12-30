
import { useState } from "react";
import Image from "next/image";
import {IoIosArrowRoundBack} from 'react-icons/io'
import CommentBar from "./commentInput/CommentBar";
import {AiOutlineLike,AiOutlineComment} from "react-icons/ai";
import {SlOptionsVertical} from "react-icons/sl";
import {RiShareForwardLine} from "react-icons/ri";
import DropdownMenu from "./DropDownMenu";
import {FaRegWindowClose} from "react-icons/fa";


import { comment,commentDataStructure } from "../../utils/comments/comments";
import { reply } from "../../utils/comments/replies";

interface cmdForOptions{
   id:string,
   cmd:string
}
interface Props{

   comment:commentDataStructure | null,
   showID:(obj:cmdForOptions)=>void,
   type:string,
   url:string | null,
   addTextReply:({id,text})=>void
 }


export default function SingleCommentUI(props:Props){
   

     const [resource,setResource]=useState({
                                       
                                            replies:[new reply("Perfect Nkosi","good picture","20 minutes ago"),new reply("Juma Mgunda","Simba is better team","10s ago")],
                                            likes:0,
                                            showComments:false,
                                          });
                                          const [showMenu, setShowMenu]= useState(false);
                                          const [menuPosition,setMenuPosition] = useState({top:0, left:0});

     const showMenuTrue=(event:React.MouseEvent<SVGElement>)=>{
      const buttonPosition=event.currentTarget.getBoundingClientRect();
      setMenuPosition({top:buttonPosition.bottom + window.scrollY,
                       left:buttonPosition.left - window.scrollX - 80 });
      
      setShowMenu(true);

     }
     
   const showMenuFalse =()=>{
      setShowMenu(false)
   }


     const handleReceivedTextReply=(text:string)=>{
      const id=props.comment.id;
      props.addTextReply({id:id,text});
      console.log('reply was received and sent at SingleCommentUI',`id is ${id}`)
     }
     const dropDownMenu=() =>{
                                            
                                     
                                             return (
                                                 <div>
                                                   
                                                         <div style={{
                                                             position:"absolute",
                                                             top:menuPosition.top-20,
                                                             left:menuPosition.left-120,
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

      if(props.type=="text"){
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
            <span>{resource.likes} likes</span>
   
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
      if(props.type == "image" && props.url !== null){
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

               src={props.url}
               sizes="100vw" 
               width={300}
               height={300}
               style={styles.image}
              />
           </div>
        <div style={styles.react}>
         <div style={styles.like}>
            <span>{resource.likes} likes</span>
   
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
        const updated={...resource,likes:resource.likes +=1};
         setResource(updated);
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
      if(props.type==="text"){
         return (

            <div style={styles.replies} className="replies">
                <div key={props.comment.id} >
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
            <span>{resource.likes} likes</span>
   
               <AiOutlineLike onClick={likeButton} style={styles.icons}/>
         
            </div>
            <div style={styles.like}>
               <span>
                  {resource.replies.length} replies</span>
            <AiOutlineComment onClick={commentButton} style={styles.icons} />
            </div>
            <div style={styles.like}>
               <span>share</span>
               <RiShareForwardLine style={styles.icons} />
            </div>
        </div>
        </div>
               <div style={styles.commentsScreenHeader}>
                 <span style={styles.icons} onClick={commentsScreenBack}>
                   <IoIosArrowRoundBack style={styles.icons} />
                 </span>
                 <span style={styles.icons}>replies</span>
                 <span></span>
               </div>

               {
                  props.comment.replies.map((reply :commentDataStructure) =>(
                 
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
               <CommentBar sendTextReplyReceived={handleReceivedTextReply}  type={"reply"} onTextChange={()=>{}} onPhotoChange={()=>{}}/>
            </div>
         )
      }
      if(props.type==="image"){
         return (


            <div >
                <div key={props.comment.id} >
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

               src={props.url}
               sizes="100vw" 
               width={300}
               height={300}
               style={styles.image}
              />
              </div>
              
           <div style={styles.react}>
           <div style={styles.like}>
            <span>{resource.likes} likes</span>
   
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
               <div style={styles.commentsScreenHeader}>
                 <span style={styles.icons} onClick={commentsScreenBack}>
                   <IoIosArrowRoundBack style={styles.icons} />
                 </span>
                 <span style={styles.icons}>replies</span>
                 <span></span>
               </div>

               {
                  props.comment.replies.map((reply :commentDataStructure) =>(
                 
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
               <CommentBar type={"reply"} sendTextReplyReceived={handleReceivedTextReply} onTextChange={()=>{}} onPhotoChange={()=>{}}/>
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
   
   const sendID =(cmd:string)=>{
   let id=props.comment.id;
      props.showID({id:id,cmd:cmd});
      console.log("id sent",id);
   }

 return (
    
    <div style={styles.commentContainer} key={props.comment.id}>
        {
          resource.showComments ? commentsScreen():renderComment()
        }
      {showMenu && (
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
     replies:{
      position:"fixed",
      zIndex:3,
      top:0,
      left:0,
      bottom:0,
      right:0,
      paddingTop:10,
      overflow:"scroll",
      scrollbarWidth:"none",
      msOverflowStyle:"none",
      backgroundColor:"white"
     },
     commentsScreenHeader:{
      display:"flex",
      justifyContent:"space-between",
      height:40,
      backgroundColor:"rgba(0,0,0,.1)",
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