
import { reply } from "./replies";
import { v4 as uuidv4} from "uuid";

export function comment(commentor:string,text:string,time:string){
    this.text=text;
    this.time=time;
    this.id=uuidv4();
    this.commentor=commentor;
    this.replies=[];
    this.addReplies=addReplies
    this.deleteReply=deleteReply
    this.signature="comment";
    this.likes=0;
}

export interface commentDataStructure {
    text:string,
    time:string,
    id:string,
    commentor:string,
    replies:commentDataStructure[],
    likes:number
}

function deleteReply(text:string){
     
    for(let i=0; i<this.replies.length; i++){
       if(this.replies[i] === text){
        this.replies.splice(i,1)
        return true;
       }
       console.log("error",`${text} was not found`);
       return false;
    }

    }


export function addReplies(name:string,text:string,time:string){
    let newRep=new reply(name,text,time)
    this.replies.push(newRep);   
}

export function showReplies(comment){
    let replies=comment.replies;
    for(let reply of replies){
        console.log(reply);
    }

  }

