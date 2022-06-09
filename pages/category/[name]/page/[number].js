import { useContext, useEffect } from 'react'
import { Context } from "context";
import excuteQuery from 'lib/db'
import { selectPosts } from 'lib/queries'
import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'

export default function PostsPage(props) {
  
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    // example how to use state && dispatch in app
    dispatch({type:'SET_POSTS',payload:JSON.parse(props.posts)})
  },[])
  console.log(state.posts)
  return (
    <div className={styles.container}>
      <div style={{backgroundColor:"yellow"}}>
        <h2>FIlter</h2>
        <select>
          <option>CATEGORY</option>
        </select>
        <input type={"text"} placeholder="search"/>
      </div>
        {state.posts ? <Posts posts={state.posts}/> : ""}
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
      query: selectPosts({numberOfPosts:10,pageNum:context.query.number})
    });
    const posts = JSON.stringify(postsResponse);

    return {
      props:{
        posts:posts,
        pageNum:context.query.number
      }
    }
  }