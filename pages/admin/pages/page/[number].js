 import { useContext, useEffect } from 'react'

import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'

import { Context } from "context";
import AdminPosts from 'components/admin/Posts'
import { selectPosts } from 'lib/queries'

export default function AdminPagePage(props) {
  
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    dispatch({type:'SET_POSTS',payload:JSON.parse(props.posts)})
  },[])

  let postsDisplay;
  if (state.posts){
    postsDisplay = <AdminPosts posts={state.posts}/>
  }
  return (
    <div className={styles.container}>
        <h2>PAGES Page</h2>
        <p>PAGES posts that appear on one of the menus - main menu, footer, sidebar etc. this is a legacy from wordpress</p>
        <hr/>
        {postsDisplay}
    </div>
  )
}

AdminPagePage.layout = "admin"

export const getServerSideProps = async (context) => {
    
    const postsResponse = await excuteQuery({
      query:selectPosts({
        numberOfPosts:50,
        pageNum:context.query.number,
        showUnpublished:true,
        postType:'page'})
    });
    const posts = JSON.stringify(postsResponse);
    return {
      props:{
        posts:posts,
        pageNum:context.query.number
      }
    }
  }