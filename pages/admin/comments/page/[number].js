import { useEffect } from 'react'
import excuteQuery from 'lib/db'
import { selectComments } from 'lib/queries'
import styles from 'styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setComments } from 'store/comments/commentsSlice';

export default function AdminCommentsPage(props) {
  
  // const { state, dispatch } = useContext(Context);
  const dispatch = useDispatch()
  const { comments } = useSelector(state => state.comments)
  useEffect(() => {
      dispatch(setComments(JSON.parse(props.comments)))
  },[])

  let commentsDisplay;
  if (comments){
    /* 
      TO DO
      none of the pages should have data - render logic. 
      mapping of comments should be handled by a dedicated Comments or AdminComments component 
    */
      commentsDisplay = comments.map((comment,index) => (
          <li key={Date.now()}>{comment.comment_content}</li>
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