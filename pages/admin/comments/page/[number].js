import { useContext, useEffect } from 'react'
import { Context } from "context";
import excuteQuery from 'lib/db'
import { selectComments } from 'lib/queries'
import styles from 'styles/Home.module.css'

export default function AdminCommentsPage(props) {
  
  const { state, dispatch } = useContext(Context);

    useEffect(() => {
        dispatch({type:"SET_COMMENTS",payload:JSON.parse(props.comments)})
    },[])

    let commentsDisplay;
    if (state.comments){
      /* 
        TO DO
        none of the pages should have data - render logic. 
        mapping of comments should be handled by a dedicated Comments or AdminComments component 
      */
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
    query: selectComments(50,context.query.number)
  });
  const comments = JSON.stringify(commentsResponse);
  return {
    props:{
      comments:comments,
      pageNum:context.query.number
    }
  }
}