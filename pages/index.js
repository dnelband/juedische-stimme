import { useEffect } from 'react'

import excuteQuery from 'lib/db'
import { selectGalleryById, selectPosts } from 'lib/queries';

import { useDispatch, useSelector } from 'react-redux'
import { setToken, setEvents, setFeed } from 'store/fbdata/fbDataSlice'
import { setHeaderGallery } from 'store/galleries/galleriesSlice';
import { setPosts } from 'store/posts/postsSlice';

import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'
import FacebookFeed from 'components/FacebookFeed';
import FacebookEvents from 'components/FacebookEvents';

export default function Home(props) {

  const dispatch = useDispatch();

  const { posts } = useSelector(state => state.posts)
  const { headerGallery } = useSelector(state => state.galleries)

  console.log(useSelector(state => state))

  useEffect(() => {
    dispatch(setHeaderGallery(JSON.parse(props.headerGallery)[0]))
    dispatch(setPosts(JSON.parse(props.posts)))
    dispatch(setToken(JSON.parse(props.fbToken).length > 0 ? JSON.parse(props.fbToken)[0].token : null))
    dispatch(setEvents(JSON.parse(props.fbEvents)[0]))
    dispatch(setFeed(JSON.parse(props.fbFeed)[0]))
  },[])
  return (
    <div className={styles.container}>
        <h1>HEADER BANNER THING</h1>
        {
          headerGallery && headerGallery.imageSrcs 
          ?
          headerGallery.imageSrcs.split(',').map((imageSrc,index)=>(
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
        {posts ? <Posts posts={posts}/> : ""}
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

  const fbTokenResponse = await excuteQuery({
    query: `SELECT * FROM fb_token LIMIT 1`
  });
  const fbToken = JSON.stringify(fbTokenResponse);

  const fbFeedResponse = await excuteQuery({
    query: `SELECT * FROM fb_feed WHERE type='posts' ORDER BY ID DESC LIMIT 1`
  })
  const fbFeed = JSON.stringify(fbFeedResponse)

  const fbEventsReponse = await excuteQuery({
    query: `SELECT * FROM fb_feed WHERE type='events' ORDER BY ID DESC LIMIT 1`
  })
  const fbEvents = JSON.stringify(fbEventsReponse)

  return {
    props:{
      headerGallery,
      posts,
      fbFeed,
      fbEvents,
      fbToken
    }
  }
}