
import { useContext, useEffect } from 'react'

import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'

import { Context } from "context";
import AdminPosts from 'components/admin/Posts'
import { selectPosts } from 'lib/queries'

export default function AdminPostsPage(props) {
  
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
        <h2>Posts</h2>
        <hr/>
        {postsDisplay}
    </div>
  )
}

AdminPostsPage.layout = "admin"

export const getServerSideProps = async (context) => {
    
    const postsResponse = await excuteQuery({
      query: selectPosts({
        numberOfPosts:50,
        pageNum:context.query.number,
        showUnpublished:true,
        postType:'post', 
        fieldsList:['post_title','post_name','post_date']})
    });
    const posts = JSON.stringify(postsResponse);
    
    return {
      props:{
        posts,
        pageNum:context.query.number
      }
    }
  }