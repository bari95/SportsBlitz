
import React, {ChangeEvent,useState} from "react";

interface Propes {
    onTextChangeC:(txt:string)=> void;
}
export default function TextComment (props:Propes){

    const [text,setText] =useState('add Comment');

    const handleTextChange = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
       
    }

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        props.onTextChangeC(text);
        setText("add comment");
    }

    return (
        <form onSubmit={handleSubmit}>
        <textarea 
        id="commentsTextArea" 
        style={
           {width:"30%",
           borderRadius:10,
           paddingLeft:10,
       }}  
        value={text} 
        rows={2}
        cols={40}
        onChange={handleTextChange} />
        <input type="submit" value={"ok"} />
        </form>
    )
} 