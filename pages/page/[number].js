import Head from 'next/head'
import Image from 'next/image'
 
import { useContext, useEffect } from 'react'

import styles from '../../styles/Home.module.css'
import excuteQuery from '../../lib/db'

import { Context } from "../../context";
import Posts from '../../components/Posts'

export default function PostsPage(props) {
  
  const { state, dispatch } = useContext(Context);

  console.log(props.pageNum,"PAGE NUM")


  useEffect(() => {
    // example how to use state && dispatch in app
    dispatch({type:'SET_POSTS',payload:JSON.parse(props.posts)})
  },[])

  let postsDisplay;
  if (state.posts){
    postsDisplay = <Posts posts={state.posts}/>
  }

  return (
    <div className={styles.container}>
        {postsDisplay}
        {/* PAGINATION NEEDED */
        // get total number of items - in this case post by COUNTING the table rows
        // create a reuseable component to display pagination
        // pass props.pageNum, totalItemsCount, itemsPerPage to pagination component
        /* /PAGINATION NEEDED */}
    </div>
  )
}

PostsPage.layout = "main"

export const getServerSideProps = async (context) => {
    
    const postsResponse = await excuteQuery({
      query: `SELECT * 
              FROM wp_posts 
              WHERE post_status='publish'
              ORDER BY post_date DESC
              LIMIT 10
              OFFSET ${(context.query.number - 1)  * 10}
              `
    });
    const posts = JSON.stringify(postsResponse);
    return {
      props:{
        posts:posts,
        pageNum:context.query.number
      }
    }
  }