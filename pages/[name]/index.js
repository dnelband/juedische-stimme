import Head from 'next/head'
import Image from 'next/image'
 
import { useContext, useEffect } from 'react'

import styles from '../../styles/Home.module.css'
import excuteQuery from '../../lib/db'

import { Context } from "../../context"
import Post from '../../components/Post'

export default function ContentPage(props) {
  
  const { state, dispatch } = useContext(Context);
  const page = JSON.parse(props.page)[0];

  return (
    <div className={styles.container}>
      <Post post={page}/>
    </div>
  )
}

ContentPage.layout = "main";

export const getServerSideProps = async (context) => {

    const pageResponse = await excuteQuery({
    query: `SELECT * 
            FROM wp_posts 
            WHERE post_name='${context.query.name}'
            AND post_status="publish"
            `
  });
  const page = JSON.stringify(pageResponse);
  return {
    props:{
        page:page
    }
  }
}