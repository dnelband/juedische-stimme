import Head from 'next/head'
import Image from 'next/image'
 
import { useContext, useEffect } from 'react'

import styles from '../../styles/Home.module.css'
import excuteQuery from '../../lib/db'

import { Context } from "../../context";

export default function ContentPage(props) {
  
  const { state, dispatch } = useContext(Context);
  const page = JSON.parse(props.page)[0]

  return (
    <div className={styles.container}>
        <h1>{page.post_title}</h1>
        <div dangerouslySetInnerHTML={{__html:page.post_content}}></div>
    </div>
  )
}

export const getServerSideProps = async (context) => {

    const pageResponse = await excuteQuery({
    query: `SELECT * 
            FROM wp_posts 
            WHERE post_name='${context.query.id}'
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