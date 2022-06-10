import { useContext, useEffect } from 'react'
import { Context } from "context";
import excuteQuery from 'lib/db'
import { selectCategories, selectPostsByTag } from 'lib/queries'
import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'
import SearchFilter from 'components/SearchFilter';

export default function PostsPage(props) {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    dispatch({type:'SET_POSTS',payload:JSON.parse(props.posts)})
    console.log(props.categories)
    dispatch({type:'SET_CATEGORIES',payload:JSON.parse(props.categories)})
  },[])
  console.log(state)
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
      query: selectPostsByTag(context.query.name.split(' ').join('-').toLowerCase(),10,context.query.number,true)
    });
    const posts = JSON.stringify(postsResponse);
    const categoriesResponse = await excuteQuery({
      query: selectCategories(100)
    });
    const categories = JSON.stringify(categoriesResponse);
    console.log(categories)
    return {
      props:{
        posts,
        categories,
        categoryName:context.query.name,
        pageNum:context.query.number
      }
    }
}