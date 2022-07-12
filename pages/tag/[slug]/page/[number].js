import { useEffect } from 'react'
import excuteQuery from 'lib/db'
import { selectPostsByTag } from 'lib/queries'
import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'store/posts/postsSlice';

export default function PostsPage(props) {
  
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(setPosts(JSON.parse(props.posts)))
  },[])

  return (
    <div className={styles.container}>
        {posts ? <Posts posts={posts}/> : ""}
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
      query: selectPostsByTag(context.query.slug,10,context.query.number)
    });
    const posts = JSON.stringify(postsResponse);
    return {
      props:{
        posts:posts,
        slug:context.query.slug,
        pageNum:context.query.number
      }
    }
  }