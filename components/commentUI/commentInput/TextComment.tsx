
import React, {ChangeEvent,useState} from "react";

interface Propes {
    onTextChangeC:(txt:string)=> void,
    sendTextReply:(text:string) => void,
    type:string,
}
export default function TextComment (props:Propes){

    const [text,setText] =useState('');

    const handleTextChange = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
       
    }

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
       if(props.type==="comment") props.onTextChangeC(text);
       if(props.type==="reply") props.sendTextReply(text);
        
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