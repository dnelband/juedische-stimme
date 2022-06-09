import { useContext, useEffect } from 'react'
import { Context } from 'context';

import excuteQuery from 'lib/db'
import { selectGalleryById, selectPosts } from 'lib/queries';

import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'
import FacebookFeed from 'components/FacebookFeed';
import FacebookEvents from 'components/FacebookEvents';

export default function Home(props) {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    dispatch({type:'SET_HEADER_GALLERY', payload:JSON.parse(props.headerGallery)[0]})
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
        {
          state.headerGallery && state.headerGallery.imageSrcs 
          ?
          state.headerGallery.imageSrcs.split(',').map((imageSrc,index)=>(
            <img key={index} width="200" src={`/wp-content/uploads/${imageSrc}`}/>
          ))
          :
          ""
        }
        <hr/>
        <article>
          <h1>THE HEADER TEXT TITLE</h1>
          <p>header text description </p>
        </article>
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

  const headerGalleryResponse =  await excuteQuery({
    query: selectGalleryById(1)
  });
  const headerGallery = JSON.stringify(headerGalleryResponse);

  const postsResponse = await excuteQuery({
    query: selectPosts({
      numberOfPosts:6,
      pageNume:0,
      showUnpublished:false,
      postType:"post"
    })
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
      headerGallery,
      posts,
      fbFeed,
      fbEvents,
      fbToken:process.env.FACEBOOK_ACCESS_TOKEN
    }
  }
}