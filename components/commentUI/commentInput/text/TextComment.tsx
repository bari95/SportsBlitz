
import React, {ChangeEvent,useState} from "react";
import { comment,commentDataStructure } from "../../../../utils/comments/comments";
import { reply } from "../../../../utils/comments/replies";

export interface sentTextObj {
    fileType:string,
    data:commentDataStructure
}

interface Propes {
    addReply:(d:sentTextObj)=> void,
    addComment:(d:sentTextObj,f:()=>void) => void,
    commentType:string,
}

export default function TextComment (props:Propes){

    const [text,setText] =useState('');

    const handleTextChange = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
       
    }

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
       e.preventDefault();
       let names=[
        "Baraka Mpenja",
        "Juma Awesi",
        "Choup Mouting",
        "Mwakasege Yohana",
        "Manase Marting"
    ]

    function randomName(){
        let choice=Math.floor(Math.random() * names.length);
        console.log(choice);
        return names[choice]
    }
       if(props.commentType==="comment"){
         let comm=new comment (randomName(),text,"1hrs ago",null)
         props.addComment({fileType:"text",data:comm},()=>{});}
      
       if(props.commentType==="reply"){
        let comm=new reply (randomName(),text,"3hrs ago",null)
         props.addReply({fileType:"text",data:comm});
     }
       setText("");
    }

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
        <textarea 
        id="commentsTextArea" 
        style={
           {width:"30%",
           borderRadius:10,
           borderWidth:2,
           paddingLeft:2,
           backgroundColor:"none",
       }}                
        value={text} 
        rows={1}
        cols={30}
        onChange={handleTextChange} placeholder="add a comment" ></textarea>
        <input style={{backgroundColor:"none",borderRadius:10}} type="submit" value={"ok"} />
        </form>
    )
} 

const styles={
    form:{
        display:"flex",
        gap:14,
        paddingRight:2,
    }
} as { [key :string] : React.CSSProperties }