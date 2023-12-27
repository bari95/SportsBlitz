
import React, {useState,useRef,ChangeEvent} from  "react";
import { commentDataStructure } from "../../utils/comments/comments";

import SingleCommentUI from "./SingleCommentUI";
import { comment } from "../../utils/comments/comments";
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
                <SingleCommentUI url={comment.url} type={comment.type} showID={setID} comment={comment.comment}/>
            ))
            }
            <CommentBar onPhotoChange={()=>{}} onTextChange={addTextComment}/>
        </div>
      )
     }

   const setID=(id:string)=>{
      curID = id;
      deleteComment();
   }
   const deleteComment=() =>{
    
     for(let i=0; i<comments.length; i++){
        if(comments[i].comment.id === curID){
            comments.splice(i,1);
            let updated=[...comments];
            setComments(updated);
            return true;
        }
     }
     console.log('Error occured on deleting a comment')
     return false;
   }


   const addTextComment=(event)=>{
      let tex=event;
     const newCom = new comment("James",tex,"2hrs ago");
      const updated = [...comments,newCom];
      setComments(updated)
      console.log(comments);
   }

     return (
        <div key={"comments-container"}>
           {renderComments()}
        </div>
     )

  }