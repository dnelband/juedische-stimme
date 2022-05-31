import { useContext, useEffect } from 'react'
import { Context } from '../context';

import excuteQuery from '../lib/db'
import { selectPosts } from '../lib/queries';

import Posts from '../components/Posts'
import styles from '../styles/Home.module.css'

export default function Home(props) {
  
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    dispatch({type:'SET_POSTS',payload:JSON.parse(props.posts)})
  },[])
  return (
    <div className={styles.container}>
        {state.posts ? <Posts posts={state.posts}/> : ""}
    </div>
  )
}

Home.layout = "main"

export const getServerSideProps = async () => {
  const postsResponse = await excuteQuery({
    query: selectPosts(10,0,false,"post")
  });
  console.log(postsResponse)
  const posts = JSON.stringify(postsResponse);
  return {
    props:{
      posts:posts
    }
  }
}