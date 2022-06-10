import { useContext, useEffect } from 'react'
import { Context } from "context";
import excuteQuery from 'lib/db'
import { selectPostsBySearchPhrase } from 'lib/queries'
import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'

export default function PostsPage(props) {
  
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    // example how to use state && dispatch in app
    dispatch({type:'SET_POSTS',payload:JSON.parse(props.posts)})
  },[])

  console.log(state.posts, " POSTS")

  return (
    <div className={styles.container}>
        {state.posts && state.posts.length > 0 ? <Posts posts={state.posts} phrase={props.phrase}/> : <h2>nothing found for '{props.phrase}'!</h2>}
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
      query: selectPostsBySearchPhrase(context.query.phrase,10,context.query.number)
    });
    const posts = JSON.stringify(postsResponse);
    return {
      props:{
        posts:posts,
        phrase:context.query.phrase,
        pageNum:context.query.number
      }
    }
  }