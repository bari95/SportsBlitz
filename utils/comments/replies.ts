
import { comment } from "./comments";
import {v4 as uuidv4} from "uuid";

export function reply (commentor:string,text:string,time:string){
      this.signature="reply";
      this.text=text;
      this.time=time;
      this.id=uuidv4;
      this.commentor=commentor;
      this.replies=[];

}