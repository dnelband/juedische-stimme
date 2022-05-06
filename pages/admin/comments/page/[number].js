import Head from 'next/head'
import Image from 'next/image'
 
import { useContext, useEffect } from 'react'

import styles from '../../../../styles/Home.module.css'
import excuteQuery from '../../../../lib/db'

import { Context } from "../../../../context";

export default function AdminCommentsPage(props) {
  
  const { state, dispatch } = useContext(Context);

    useEffect(() => {
        dispatch({type:"SET_COMMENTS",payload:JSON.parse(props.comments)})
    },[])

    let commentsDisplay;
    if (state.comments){
        commentsDisplay = state.comments.map((comment,index) => (
            <li key={index}>{comment.comment_content}</li>
        ))
    }

    return (
        <div className={styles.container}>
            <h2>Comments</h2>
            <hr/>
            <ul>
                {commentsDisplay}
            </ul>
        </div>
    )
}

AdminCommentsPage.layout = "admin"

export const getServerSideProps = async (context) => {
    
    const commentsResponse = await excuteQuery({
      query: `SELECT *
              FROM wp_comments 
              ORDER BY comment_ID DESC
              LIMIT 50
              OFFSET ${(context.query.number - 1)  * 50}
              `
    });
    const comments = JSON.stringify(commentsResponse);
    return {
      props:{
        comments:comments,
        pageNum:context.query.number
      }
    }
  }