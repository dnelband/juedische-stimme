import { useContext, useEffect } from 'react'
import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'
import { Context } from "context"
import PostForm from 'components/admin/PostForm'
import { selectCategories } from 'lib/queries'

export default function CreatePostPage(props) {
  
  const { state, dispatch } = useContext(Context);
  
  useEffect(() => {
    dispatch({type:'SET_CATEGORIES',payload:JSON.parse(props.categories)})
  },[])

  let nextPostId = JSON.parse(props.nextPostId).length > 0 ? JSON.parse(props.nextPostId)[0].max_id : ''
  
  return (
    <div className={styles.container}>
      <h2>NEW POST</h2>
      <PostForm 
        nextPostId={nextPostId}
        categories={state.categories}
      />
    </div>
  )
}

CreatePostPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const nextPostIdResponse = await excuteQuery({
    query: ` SELECT max_id FROM js_maxids WHERE js_maxids.table='posts'`
  });
  const nextPostId = JSON.stringify(nextPostIdResponse);

  const categoriesResponse = await excuteQuery({
    query: selectCategories(50,context.query.number)
  });
  const categories = JSON.stringify(categoriesResponse);
  return {
    props:{
      nextPostId,
      categories
    }
  }
}