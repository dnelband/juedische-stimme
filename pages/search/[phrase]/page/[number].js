import { useEffect } from 'react'
import excuteQuery from 'lib/db'
import { selectPostsBySearchPhrase } from 'lib/queries'
import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'store/posts/postsSlice';

export default function PostsPage(props) {
  
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(setPosts(JSON.parse(props.posts)))
  },[])

  console.log(posts, " POSTS")

  return (
    <div className={styles.container}>
        {posts && posts.length > 0 ? <Posts posts={posts} phrase={props.phrase}/> : <h2>nothing found for {'"' + props.phrase + '"'}!</h2>}
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