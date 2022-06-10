import { useContext, useEffect } from 'react'
import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'
import { Context } from "context"
import PostForm from 'components/admin/PostForm'
import { selectCategories, selectPostByName } from 'lib/queries'

export default function EditPostPage(props) {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    dispatch({type:'SET_POST',payload:JSON.parse(props.post)[0]})
    dispatch({type:'SET_CATEGORIES',payload:JSON.parse(props.categories)})
  },[])
  return (
    <div className={styles.container}>
      <h2>EDIT POST</h2>
      {state.post ? <PostForm post={state.post} categories={state.categories} /> : ''}
    </div>
  )
}

EditPostPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const postsResponse = await excuteQuery({
    query: selectPostByName(context.query.name)
  });
  const post = JSON.stringify(postsResponse);
  const categoriesResponse = await excuteQuery({
    query: selectCategories(50,context.query.number)
  });
  const categories = JSON.stringify(categoriesResponse);
  return {
    props:{
      post:post,
      categories
    }
  }
}