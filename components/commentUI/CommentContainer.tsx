
import React, {useState,useRef,ChangeEvent} from  "react";
import { commentDataStructure } from "../../utils/comments/comments";

import SingleCommentUI from "./SingleCommentUI";
import { comment } from "../../utils/comments/comments";
import { reply } from "../../utils/comments/replies";
import CommentBar from "./commentInput/CommentBar";

  const firstComment = {type:"image",url:"/images/dar.jpg",comment:new comment('Bari',"Jembe jipya linakuja Yanga","2hrs ago")};
  const secondComment = {type:"text",url:null,comment:new comment('Jerry',"Maumivu yako pale pale","2hrs ago")};
  const thirdComment = {type:"image",url:"/images/advert.jpg",comment:new comment('Juma',"Bado Hamjasema","2hrs ago")};
  let curID:string;


  export default function CommentsContainer(){
     
     const [comments,setComments] = useState([firstComment,secondComment,thirdComment])
   
   const renderComments=() =>{
    console.log(Object.values(comments))
       
      return (
        <div key="list-of-comments">
           {
              comments.map(comment=>(
                <SingleCommentUI addTextReply={handleReplyAdded} url={comment.url} type={comment.type} showID={setID} comment={comment.comment}/>
            ))
            }
            <CommentBar type={'comment'} sendTextReplyReceived={null} onPhotoChange={addPhotoComment} onTextChange={addTextComment}/>
        </div>
      )
     }

   const setID=({id,cmd
   })=>{
      curID = id;
      if(cmd==="delete")deleteComment();
   }

   const searchIdIndex=(id:string)=>{
      for(let i=0; i<comments.length; i++){
         if(comments[i].comment.id === id){
             return i;
         }
      }
      console.log('Error occured on deleting a comment')
      return false;
   }
   const deleteComment=() =>{
    
     for(let i=0; i<comments.length; i++){
        if(comments[i].comment.id === curID){
            comments.splice(i,1);
            let updated=[...comments];
            setComments(updated);
            console.log("new reply was added")
            return true;
        }
     }
     console.log('Error occured on deleting a comment')
   
   }

   const handleReplyAdded=({id,text})=>{
   console.log(`id at top is ${id}`);
      for(let i=0; i<comments.length; i++){
         if(comments[i].comment.id === id){
            
            let rep =new reply("Mpamire",text,"1hr ago");
            comments[i].comment.replies.push(rep)
             console.log("reply addded succesfull")
             let updated=[...comments];
             setComments(updated);
             return true;
         }
      }
         console.log('the id was not founnd');  
      
   }


   const addTextComment=(text:string)=>{
     const newCom ={type:"text", url:null, comment:new comment("James",text,"2hrs ago") };
      const updated = [...comments,newCom];
      setComments(updated)
      console.log(text)
      console.log(comments);
   }

   const addPhotoComment=(src:string)=>{
      const newCom ={type:"image", url:src, comment:new comment("James","Hii picha hatari","2hrs ago") };
       const updated = [...comments,newCom];
       setComments(updated)
       console.log(src)
       console.log(comments);
    }

     return (
        <div key={"comments-container"}>
           {renderComments()}
        </div>
     )

  }