import { useContext, useEffect } from 'react'
import { Context } from "context";
import excuteQuery from 'lib/db'
import { selectGalleries } from 'lib/queries'
import styles from 'styles/Home.module.css'
import Galleries from 'components/admin/Galleries';

export default function AdminCommentsPage(props) {
  
  const { state, dispatch } = useContext(Context);

    useEffect(() => {
        dispatch({type:"SET_GALLERIES",payload:JSON.parse(props.galleries)})
    },[])

    console.log(state.galleries)

    return (
        <div className={styles.container}>
            <h2>Galleries</h2>
            <hr/>
            <ul>{state.galleries ? <Galleries galleries={state.galleries} /> : ""}</ul>
        </div>
    )
}

AdminCommentsPage.layout = "admin"

export const getServerSideProps = async (context) => {
  const galleriesResponse = await excuteQuery({
    query: selectGalleries(50,context.query.number)
  });
  const galleries = JSON.stringify(galleriesResponse);
  return {
    props:{
        galleries,
        pageNum:context.query.number
    }
  }
}