import { useContext, useEffect } from 'react'
import { Context } from 'context';

import excuteQuery from 'lib/db'
import { selectPosts } from 'lib/queries';

import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'
import FacebookFeed from 'components/FacebookFeed';

export default function Home(props) {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    dispatch({type:'SET_POSTS',payload:JSON.parse(props.posts)})
  },[])
  return (
    <div className={styles.container}>
        {state.posts ? <Posts posts={state.posts}/> : ""}
        <hr/>
        <FacebookFeed
          fbFeed={JSON.parse(props.fbFeed)[0]}
        />
    </div>
  )
}

Home.layout = "main"

export const getServerSideProps = async () => {
  
  const postsResponse = await excuteQuery({
    query: selectPosts(6,0,false,"post")
  });
  const posts = JSON.stringify(postsResponse);

  const fbFeedResponse = await excuteQuery({
    query: `SELECT * FROM fb_feed ORDER BY ID DESC LIMIT 1`
  })
  const fbFeed = JSON.stringify(fbFeedResponse)

  return {
    props:{
      posts,
      fbFeed
    }
  }
}