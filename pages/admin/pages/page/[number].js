import Head from 'next/head'
import Image from 'next/image'
 
import { useContext, useEffect } from 'react'

import styles from '../../../../styles/Home.module.css'
import excuteQuery from '../../../../lib/db'

import { Context } from "../../../../context";
import AdminPosts from '../../../../components/admin/Posts'

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
      query: `SELECT ID, post_title, post_name, post_status, comment_status, post_date_gmt, post_modified_gmt, post_type, post_author, post_parent
              FROM wp_posts 
              WHERE post_status='publish'
              AND post_type='page'
              ORDER BY post_date DESC
              LIMIT 50
              OFFSET ${(context.query.number - 1)  * 50}
              `
    });
    const posts = JSON.stringify(postsResponse);
    return {
      props:{
        posts:posts
      }
    }
  }