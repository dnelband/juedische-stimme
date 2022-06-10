import { useContext, useEffect } from 'react'

import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'

import { Context } from "context";
import { selectCategories } from 'lib/queries'

import AdminCategories from 'components/admin/Categories';

export default function AdminCategoriesPage(props) {
  
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    dispatch({type:'SET_CATEGORIES',payload:JSON.parse(props.categories)})
  },[])

  let categoriesDisplay;
  if (state.categories){
    categoriesDisplay = <AdminCategories categories={state.categories}/>
  }
  
  return (
    <div className={styles.container}>
        <h2>Categories</h2>
        <hr/>
        {categoriesDisplay}
    </div>
  )
}

AdminCategoriesPage.layout = "admin"

export const getServerSideProps = async (context) => {
    const categoriesResponse = await excuteQuery({
      query: selectCategories(50,context.query.number)
    });
    const categories = JSON.stringify(categoriesResponse);
    return {
        props:{
            categories,
            pageNum:context.query.number
        }
    }
}