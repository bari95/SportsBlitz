
import { comment } from "./comments";

export function reply (name:string,text:string,time:string){
      this.signature="reply";
      let comm=new comment(name,text,time);
}