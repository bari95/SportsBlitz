
import React, {useState,useRef,ChangeEvent} from  "react";
import { commentDataStructure } from "../../utils/comments/comments";
import { sentTextObj } from "./commentInput/text/TextComment";

import SingleCommentUI from "./SingleCommentUI";
import { comment } from "../../utils/comments/comments";

import CommentBar from "./commentInput/commentbar/CommentBar";

import { lastsentObj } from "./SingleCommentUI";


  const firstComment = {fileType:"image",comment:new comment('Bari',"Jembe jipya linakuja Yanga","2hrs ago","/images/dar.jpg")};
  const secondComment = {fileType:"text",comment:new comment('Jerry',"Maumivu yako pale pale","2hrs ago","/images/dar.jpg")};
  const thirdComment = {fileType:"image",comment:new comment('Juma',"Bado Hamjasema","2hrs ago","/images/advert.jpg")};
  let curID:string;


  
  export default function CommentsContainer(){
     
     const [comments,setComments] = useState([firstComment,secondComment,thirdComment])
     const [commentList,showComments]=useState(true);
     

      const conditionalRender=()=>{
         if(commentList){
            return renderComments();
         }
         if(!commentList){
            return null
         }
      }

   const renderComments=() =>{
    console.log(Object.values(comments))
       
      return (
        <div key="list-of-comments">
           {
              comments.map(comment=>(
                <SingleCommentUI
                   callback={sendCallBack}
                   sendReplyAdded={handleReplyAdded} 
                   fileType={comment.fileType} 
                   showID={setID} 
                   comment={comment.comment}/>
            ))
            }
           
        </div>
      )
     }

   const setID=({id,cmd
   })=>{
      curID = id;
      if(cmd==="delete")deleteComment();
   }


   const sendCallBack=()=>{
       showComments(false);
   }

   const backToComments=()=>{
      showComments(true);
      console.log("backToComments was success");
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

  const handleReplyAdded=(d:lastsentObj)=>{
   console.log(`id at top is ${d.id}`);
      for(let i=0; i<comments.length; i++){
         if(comments[i].comment.id === d.id){
            
            
            comments[i].comment.replies.push(d.reply);

             console.log("reply addded succesfull");
             let updated=[...comments];
             setComments(updated);
             return true;
         }
      }
     console.log('the id was not founnd');  
      

   }

// working fine
   const handleCommentAdded=(d:sentTextObj,fn:()=>void)=>{
     const newCom ={fileType:d.fileType,comment:d.data} ;
      const updated = [...comments,newCom];
      setComments(updated)
     // console.log(text)
    //  console.log(comments);
      
      
   }

     return (
        <div key={"comments-container"} style={styles.container}>
           {conditionalRender()}
           <CommentBar 
                   callback={sendCallBack}
                   backCall={backToComments}
                   commentType={'comment'} 
                   sendReplyAdded={null} 
                   sendCommentAdded={handleCommentAdded} 
                   
               />
        </div>
     )

  }


  const styles={
   container:{
      paddingRight:5,
   }
  }