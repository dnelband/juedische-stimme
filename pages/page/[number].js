import { useContext, useEffect } from 'react'
import { Context } from "context";
import excuteQuery from 'lib/db'
import { selectCategories, selectPosts } from 'lib/queries'
import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'
import SearchFilter from 'components/SearchFilter';

export default function PostsPage(props) {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    // example how to use state && dispatch in app
    dispatch({type:'SET_POSTS',payload:JSON.parse(props.posts)})
    dispatch({type:'SET_CATEGORIES',payload:JSON.parse(props.categories)})
  },[])
  return (
    <div className={styles.container}>
        {state.categories ? <SearchFilter categoryName={props.categoryName} categories={state.categories} /> : ""}
        {state.posts ? <Posts posts={state.posts}/> : ""}
    </div>
  )
}

PostsPage.layout = "main"

export const getServerSideProps = async (context) => {
    const postsResponse = await excuteQuery({
      query: selectPosts({numberOfPosts:10,pageNum:context.query.number})
    });
    const posts = JSON.stringify(postsResponse);
    const categoriesResponse = await excuteQuery({
      query: selectCategories(100)
    });
    const categories = JSON.stringify(categoriesResponse);
    return {
      props:{
        posts,
        categories,
        pageNum:context.query.number
      }
    }
}