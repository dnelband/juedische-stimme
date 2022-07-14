import { useEffect } from 'react'

import excuteQuery from 'lib/db'
import { selectGalleryById, selectNavItems, selectPosts } from 'lib/queries';

import { useDispatch, useSelector } from 'react-redux'
import { setToken, setEvents, setFeed } from 'store/fbdata/fbDataSlice'
import { setHeaderGallery } from 'store/galleries/galleriesSlice';
import { setPosts } from 'store/posts/postsSlice';
import { setMenuItems } from 'store/nav/navSlice';

import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'
import FacebookFeed from 'components/FacebookFeed';
import FacebookEvents from 'components/FacebookEvents';
import Header from 'components/Header';

export default function Home(props) {

  console.log(props.navItems)

  const dispatch = useDispatch();

  const { posts } = useSelector(state => state.posts)

  // console.log(useSelector(state => state))

  useEffect(() => {
    dispatch(setMenuItems(JSON.parse(props.navItems)))
    dispatch(setHeaderGallery(JSON.parse(props.headerGallery)[0]))
    dispatch(setPosts(JSON.parse(props.posts)))
    dispatch(setToken(JSON.parse(props.fbToken).length > 0 ? JSON.parse(props.fbToken)[0].token : null))
    dispatch(setEvents(JSON.parse(props.fbEvents)[0]))
    dispatch(setFeed(JSON.parse(props.fbFeed)[0]))
  },[])
  
  return (
    <div className={styles.container}>
        <Header />
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
        <div>SIGN UP TO NEWSLETTER COMPONENET!</div>
        <hr/>
        <FacebookFeed /> 
        <hr/>
        <h1>
          ABOUT US GALLERY
        </h1>
        <div>SHOW A GALERY HERE!</div>
    </div>
  )
}

Home.layout = "main"

export const getServerSideProps = async () => {

  const navItemsResponse = await excuteQuery({
      query: selectNavItems()
  });
  const navItems = JSON.stringify(navItemsResponse)

  const headerGalleryResponse =  await excuteQuery({
    query: selectGalleryById(1)
  });
  const headerGallery = JSON.stringify(headerGalleryResponse);

  const postsResponse = await excuteQuery({
    query: selectPosts({
      numberOfPosts:6,
      pageNum:0,
      showUnpublished:false,
      postType:"post",
      fieldsList:["ID","post_author","post_date","post_date_gmt","post_content","post_title","post_name"]
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
      navItems,
      headerGallery,
      posts,
      fbFeed,
      fbEvents,
      fbToken
    }
  }
}