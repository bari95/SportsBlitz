
import { reply } from "./replies";
import { v4 as uuidv4} from "uuid";
import { sentTextObj } from "../../components/commentUI/commentInput/text/TextComment";

export function comment(commentor:string,text:string,time:string,url:null | string){
    this.text=text;
    this.time=time;
    this.id=uuidv4();
    this.commentor=commentor;
    this.replies=[];
    this.addReplies=addReplies
    this.deleteReply=deleteReply
    this.signature="comment";
    this.likes=0;

    this.url=url;
}

export interface commentDataStructure {
    text:string,
    time:string,
    id:string,
    type:string,
    commentor:string,
    replies:sentTextObj[],
    likes:number,
    url:null | string,
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


export function addReplies(name:string,text:string,time:string,url:string){
    let newRep=new reply(name,text,time,url)
    this.replies.push(newRep);   
}

export function showReplies(comment){
    let replies=comment.replies;
    for(let reply of replies){
        console.log(reply);
    }

  }

