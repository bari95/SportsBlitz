import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import CommentsContainer from './commentUI/CommentContainer'

type Props = {
  children?: ReactNode
  title?: string
}
  
const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div style={styles.layout}>
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
      
    <CommentsContainer />
     
      
      </div>

    }
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
      
    </footer>
  </div>
)

const styles={
  layout:{
    fontFamily:"san-serif",
  }
}

export default Layout
