
import { reply } from "./replies";
import { v4 as uuidv4} from "uuid";

export function comment(commentor:string,text:string,time:string){
    this.text=text;
    this.time=time;
    this.id=uuidv4;
    this.commentor=commentor;
    this.replies=[];
    this.signature="comment";
}

export interface commentDataStructure {
    text:string,
    time:string,
    id:string,
    commentor:string
    replies:string[]
}

export function addReplies(comment,name:string,text:string,time:string){
    let newRep=new reply(name,text,time)
    comment.replies.push(newRep);   
}

export function showReplies(comment){
    let replies=comment.replies;
    for(let reply of replies){
        console.log(reply);
    }
  }

