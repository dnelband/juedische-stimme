import { useContext, useEffect } from 'react'
import { Context } from 'context';

import excuteQuery from 'lib/db'
import { selectPosts } from 'lib/queries';

import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'
import FacebookFeed from 'components/FacebookFeed';
import FacebookEvents from 'components/FacebookEvents';

export default function Home(props) {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    dispatch({type:'SET_POSTS',payload:JSON.parse(props.posts)})
    dispatch({type:'SET_FB_DATA',payload:{
      token:props.fbToken,
      feed:JSON.parse(props.fbFeed)[0],
      events:JSON.parse(props.fbEvents)[0]
    }})
  },[])
  return (
    <div className={styles.container}>
        <h1>HEADER BANNER THING</h1>
        <hr/>
        <h1> LATEST POSTS:</h1>
        {state.posts ? <Posts posts={state.posts}/> : ""}
        <hr/>
        <FacebookEvents/>
        <hr/>
        <h1>BUTTONS AND CALL TO ACTION</h1>
        <blockquote>BUTTONS AND CALL TO ACTION</blockquote>
        <hr/>
        <h1>SUGN UP TO NEWSLETTER</h1>
        <hr/>
        <FacebookFeed /> 
        <hr/>
        <h1>
          GALLERY OR WHATEBER
        </h1>
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
    query: `SELECT * FROM fb_feed WHERE type='posts' ORDER BY ID DESC LIMIT 1`
  })
  const fbFeed = JSON.stringify(fbFeedResponse)

  const fbEventsReponse = await excuteQuery({
    query: `SELECT * FROM fb_feed WHERE type='events' ORDER BY ID DESC LIMIT 1`
  })
  const fbEvents = JSON.stringify(fbEventsReponse)

  // bobsondugnutthc?fields=events.limit(10)

  return {
    props:{
      posts,
      fbFeed,
      fbEvents,
      fbToken:process.env.FACEBOOK_ACCESS_TOKEN
    }
  }
}