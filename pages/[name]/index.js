import { useEffect } from 'react'
import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'
import { useDispatch, useSelector } from 'react-redux'

import Post from 'components/Post'
import { selectCommentsByPostId, selectNavItems, selectPostByName } from 'lib/queries'
import { setMenuItems } from 'store/nav/navSlice'

export default function ContentPage(props) {
  const dispatch = useDispatch();  
  useEffect(() => {
    dispatch(setMenuItems(JSON.parse(props.navItems)))
  },[])
  let page = JSON.parse(props.page)[0];
  if (props.comments) page.comments = JSON.parse(props.comments)
  return (
    <div className={styles.container}>
      <Post post={page}/>
    </div>
  )
}

ContentPage.layout = "main";

export const getServerSideProps = async (context) => {
  const navItemsResponse = await excuteQuery({
      query: selectNavItems()
  });
  const navItems = JSON.stringify(navItemsResponse)
  const pageResponse = await excuteQuery({
    query: selectPostByName(context.query.name)
  });
  const page = JSON.stringify(pageResponse);
  let comments = null;
  if (pageResponse.length > 0){
    const commentsReponse = await excuteQuery({
      query: selectCommentsByPostId(pageResponse[0].ID)
    }); 
    comments = JSON.stringify(commentsReponse);
  }
  return {
    props:{
        page,
        comments,
        navItems
    }
  }
}