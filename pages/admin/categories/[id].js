import { useContext, useEffect } from 'react'
import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'
import { Context } from "context"
import CategoryForm from 'components/admin/CategoryForm'
import { selectCategoryById } from 'lib/queries'

export default function EditCategoryPage(props) {
  const { state, dispatch } = useContext(Context);
  useEffect(() => {
    dispatch({type:'SET_CATEGORY',payload:JSON.parse(props.category)[0]})
  },[])
  return (
    <div className={styles.container}>
      {state.category ? <CategoryForm category={state.category} /> : ''}
    </div>
  )
}

EditCategoryPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const categoryResponse = await excuteQuery({
    query: selectCategoryById(context.query.id)
  });
  const category = JSON.stringify(categoryResponse);
  return {
    props:{
      category:category
    }
  }
}