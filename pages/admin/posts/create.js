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

  const nextPostId = JSON.parse(props.maxId)[0]['MAX( ID )'] + 1
  
  return (
    <div className={styles.container}>
      <PostForm 
        nextPostId={nextPostId}
        categories={state.categories}
      />
    </div>
  )
}

CreatePostPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const maxIdResponse = await excuteQuery({
    query: ` SELECT MAX( ID ) FROM wp_posts;`
  });
  const maxId = JSON.stringify(maxIdResponse);
  const categoriesResponse = await excuteQuery({
    query: selectCategories(50,context.query.number)
  });
  const categories = JSON.stringify(categoriesResponse);
  return {
    props:{
      maxId,
      categories
    }
  }
}