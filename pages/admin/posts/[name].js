import Head from 'next/head'
import Image from 'next/image'
 
import { useContext, useEffect } from 'react'

import styles from '../../../styles/Home.module.css'
import excuteQuery from '../../../lib/db'

import { Context } from "../../../context"
import PostForm from '../../../components/admin/PostForm'

export default function EditPostPage(props) {
  
  const { state, dispatch } = useContext(Context);
  const post = JSON.parse(props.post)[0];

  return (
    <div className={styles.container}>
      <PostForm
        post={post}
      />
    </div>
  )
}

EditPostPage.layout = "admin";

export const getServerSideProps = async (context) => {

    const postsResponse = await excuteQuery({
    query: `SELECT * 
            FROM wp_posts 
            WHERE post_name='${context.query.name}'
            AND post_status="publish"
            `
  });
  const post = JSON.stringify(postsResponse);
  return {
    props:{
      post:post
    }
  }
}