import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import SingleCommentUI from './commentUI/SingleCommentUI';
import { comment } from '../utils/comments/comments';
import CommentBar from './commentUI/CommentBar';

type Props = {
  children?: ReactNode
  title?: string
}
  
const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">Home</Link> | <Link href="/about">About</Link> |{' '}
        <Link href="/users">Users List</Link> |{' '}
        <a href="/api/users">Users API</a>
      </nav>
    </header>
    {children} {
      <div>
      
     <SingleCommentUI comment={new comment("Bari Kaneno","Jumamosi tulivu kabisa","2hrs ago")}/>
     <SingleCommentUI comment={new comment("Juma Mbishi","AAAH, wapi wewe","10hrs ago")}/>
     <SingleCommentUI comment={new comment("Mwajuma Yanga","yanga hatoboi, subirini muone... benchika lazima ...","3s ago")}/>
     <CommentBar onTextChange={()=>{}} onPhotoChange={()=>{}}/>
     
      
      </div>

    }
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
      
    </footer>
  </div>
)

export default Layout
